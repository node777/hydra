var hux={
    cid:0,
    chainData: function(){
        return temple.chains[this.cid]
    },
    get: function(){
        return hux.chainData().ip+"/query/"
    },
    post: function(){
        return hux.chainData().ip+"/invoke/"
    },
    query: function(){
        let r="";
        let blocks=JSON.parse(temple.get(hux.chainData().ip));
        console.log(blocks);
        for(block in blocks){
            var b = blocks[block];
            if(block!=0){
                console.log(b);
                r+=`
                    <div class='block box'>
                        Previous Hash:<br>${b.p}<br><br>
                        Signing Key:<br>${b.k}<br><br>
                        Timestamp:<br>${b.t}<br><br>
                        Function Invocation:<br>${b.f}<br><br>
                        Message Data:<br>${b.m}<br><br>
                        Block Signature:<br>${b.s}<br><br>
                        Block Hash:<br>${b.h}<br><br>
                    </div>`;
            }
            else{
                r+=`
                    <div class='block box'>`
                    for(d in b){
                        r+=`${d}: <br>${b[d]}<br><br>`;
                    }
                r+=`</div>
                `
            }
        }
        document.getElementById('chainData').innerHTML= r;
    },
    queryChain: function(){
        var d=temple.get(hux.get()+document.getElementById('get').value);
        document.getElementById('chainData').innerHTML= d;
    },
    invoke: function(){
        var u =hux.post()+document.getElementById('invoke').value;
        var d=document.getElementById('iData').value;
        temple.post(u, d);
    }
}