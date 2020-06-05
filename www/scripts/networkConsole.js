
var networkConsole = {
    pos:0,
    t: document.getElementById("networkConsole"),
    i:function(e){
        //console.log("user input: "+e.key);
        switch(e.key){
            case "Backspace": 
                if(networkConsole.t.selectionStart>networkConsole.pos){
                    return true;
                }
                else{
                    return false;
                }
                
            case "Tab":
                networkConsole.t.value+=`\t`;
                return false;
                
            case "Enter":
                let t=networkConsole.t.value.substr(networkConsole.pos, networkConsole.t.value.length);
                this.log();
                if(this.inputCallback){
                    var c = this.inputCallback;
                    this.inputCallback=undefined;
                    c(t);
                }
                else{
                    //if(t!==""){
                        this.execute(t);
                    //}
                }
                return false;
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowLeft":
            case "ArrowRight":
                return true;
            default:
                if(networkConsole.t.selectionStart>networkConsole.pos-1){
                    return true;
                }
                else{
                    return false;
                }

        }
    },
    log: function(m){
        networkConsole.t.value+=`${(m||"")}\n>`;
        this.pos=networkConsole.t.value.length;
        networkConsole.t.scrollTop = networkConsole.t.scrollHeight;
    },
    input: function(m, callback){
        //console.log("input setting up");
        this.inputCallback = callback;
        networkConsole.t.value+=`${m}`;
        this.pos=networkConsole.t.value.length;
        networkConsole.t.scrollTop = networkConsole.t.scrollHeight;
        console.log(this.inputCallback);
    },
    execute: function(c){
        this.log(`executing command ${c}`);
        if(this.commands[c]){
            this.commands[c]();
        }
        else{
            this.log(`the command ${c} could not be found`);
        }
    },
    commands: {
        clear: function(){
            //networkConsole.t.innerHt
        },
        feedMe: function(){
            networkConsole.input("feed me text ", function(r){
                networkConsole.log(`you said ${r}`);
            });
        }
    }
}

networkConsole.log("Network Console:");