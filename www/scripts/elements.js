var elements={
    pages:{
        splash: function(){
            var r;
            if(temple.account){
                r=`
                <div>
                    <h1>Welcome back, `+(temple.account.data.name||temple.account.data.type+" user"||"user")+`</h1>
                    <div class="w50 button" onclick="location.hash='chains';">Chains</div>
                    <div class="w50 button" onclick="location.hash='account';">Account</div>
                </div>
                `;
            }
            else{
                r=`
                <div>
                    <h1>Welcome to the very first browser-based distributed blockchain network</h1>
                    <div class="w50 button" onclick="temple.connect();">Connect</div>
                </div>
                `;
            }
            return r
        },
        'account': function(){
            if(temple.account){
                var wb="";
                if(temple.account.data.type=="web3"){
                    var p =temple.provider;
                    console.log(p);
                    wb=`
                    Provider:<br>${temple.account.data.type||"none"}<br><br>
                    Selected Address:<br>${p.provider.selectedAddress||"None: Please login to provider"}<br>`/*
                    Provider Network: ${nn||"none"}<br>
                    Network ENS: ${(p.tetwork.ensAddress)||"none"}<br>
                    Selected Address: ${(p.getBalance(p.provider.selectedAddress))||"none"}<br>`*/
                    
                }
                else if(temple.account.data.type=="email"){
                    wb=`
                    Provider: Email<br><br>
                    Email: ${temple.account.email}<br><br>
                    Wallets: <br><br>
                    `+`<div>Default Wallet<br>Address: ${JSON.stringify(temple.account.wallets[0].signingKey.address)}</div>`
                    //todo for loop wallets
                }
                return`
                    Account info:
                    <br><br>
                    `+wb+
                    `<div class="button" onclick="location.hash='chains'">Chains</div>`+
                    `<div class="button" onclick="temple.clear();">Scrub</div>`;

            }else{
                
                return `
                    No Account Found, please connect
                    <div class="w50 button" onclick="temple.connect();">Connect</div>`
            }
        },
        "connect": function(){
            if(temple.account){
                return `<div>
                    <h1>Welcome back, `+JSON.parse(localStorage.user).name+`</h1>
                    <div class="w50 button" onclick="location.hash='chains';">Chains</div>
                    <div class="w50 button" onclick="location.hash='account';">Account</div>
                </div>`
            }else{
                return `
                    No account could be found on this device, would you like to import or create a new one?
                    <div class="w50 button" onclick="temple.importAccount();">Import From Provider (coinbase/metamask/web3)</div>
                    <div class="w50 button" onclick="temple.createAccount();">Create New</div>
                `;
            }
        },
        "chains": function(){
            if(temple.account){
                var cb="";
                if(localStorage.chains){
                    console.log(localStorage.chains);
                    var chains=JSON.parse(localStorage.chains);
                    for(c in chains){
                        cb+=`<div class='chain button' onclick="location.hash='chain?${c}'">CHAIN<br>IP:`+chains[c].ip+"</div>"
                    }
                }
                return `
                    chains:<br><br>
                    <div id="chainBox" class="w1 flex">
                        ${cb}
                    </div>
                    <div class="w1 flex box">
                        <div class="chain button" onclick="location.hash='addChain'">
                            +<br><br>Add chain
                        </div>
                        <div class="chain button" onclick="location.hash='createChain'">
                            +<br><br>Create chain
                        </div>
                    </div>
                `
            }else{
                return `
                    chains:<br><br>
                    <div class="w1 flex">
                        No account found, please connect
                    </div>
                    <div class="w1 flex box">
                        <div class="chain button" onclick="location.hash='connect'">
                            Connect
                        </div>
                    </div>
                `

            }
        },
        "chain": function(c){
            console.log(c);
            hux.cid =c[1];
            return `
                chain ip: ${hux.chainData().ip}<br><br>
                <div id="chainData">
                    Last Data
                </div>
                <div class="chain button" onmouseup="hux.query()">
                    QueryChain
                </div>
                <div class="w1 flex box">
                    <div>
                    Query Endpoint<br>
                    <input id="get" value="init"></input>

                        <div class="chain button w1" onmouseup="hux.queryChain()">
                            Query<br>(get)
                        </div>
                    </div>
                    <div>
                        Function to invoke<br>
                        <input id="invoke" value="init"></input><br>
                        Data to pass function<br>
                        <input id="iData" value="testData"></input>
                        <div class="chain button" onclick="hux.invoke()">
                            ChainCode Invoke<br>(post)
                        </div>
                    </div>
                </div>
                <div class="chain button" onmouseup="location.hash='chains'">
                    Back to chains
                </div>
            `
        },
        "addChain": function(){
            return `
                <div>
                    Node IP:<br><input id="nodeIP"></input>
                    <div class="chain button" onclick="temple.addChain()">
                        Add chain
                    </div>
                </div>
            `
        },
        "createChain": function(){
            return `
                <div>
                    Node IP:<br><input></input>
                    <div class="chain button" onclick="temple.createChain()">
                        Create
                    </div>
                </div>
            `
        },
        404: function(){
            return `Could not find url hash endpoint`;
        }
    }
}