var lux={
    t:document.getElementById("content"),
    changePage: function(x){
        var h=(location.hash||"#splash");
        var hwa=h.split("#")[1];
        var a=hwa.split("?");
        var p=a[0];
        console.log(a);
        document.body.id = p;
        networkConsole.log("paged changed to "+p);
        lux.t.innerHTML = elements.pages[p](a?a:null)||elements.pages["404"]();
    },
    setup: async function(){
        window.addEventListener("hashchange", this.changePage, false);
        lux.changePage();
        
    }
}
lux.setup();