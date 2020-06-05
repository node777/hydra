//require luxpages, networkConsole
var temple = {
  chains: [],
  hanpt: function(a){
    if(a==("c"||"C"||"create")){
      temple.createAccount();
    }
    else if(a==("i"||"I"||"import")){
      networkConsole.log("kFine");
    }
    else{
      var a = networkConsole.input("Would you like to create a new user, or import from an existing service? (input c or i): ", temple.hanpt);
    }
  },
  connect: function(){
    networkConsole.log('connecting...');
    if(localStorage.user){
      location.hash="account";
    }
    else{
      location.hash = "newUser";
      networkConsole.log('could not find currently connected account');
      var a = networkConsole.input("Would you like to create an account or import (c/i): ", this.hanpt);
    }
  },
  createUser:function(){
    var u = {
      name: "testName"
    };
    localStorage.user = JSON.stringify(u);
    this.createWallet();
  },
  importUser:async function(){
    await w3.import();
    var n = await w3.getUser();
    var u = {
      name: n
    };
    localStorage.user = JSON.stringify(u);
    this.importWallets();
  },
  clear: function(){
    localStorage.clear();
    location.hash="";
  },
  createWallet: function(){
      var walletKey="testKey";
      var newKeys=[
        {
        key: walletKey
        }
      ];
      networkConsole.log("creating wallet...");
      localStorage.wallets=JSON.stringify(newKeys);
      networkConsole.log(`created wallet with key ${walletKey}`);
      location.hash = "account";
  },
  importWallets:()=>{
    localStorage.wallets=JSON.stringify(w3.getWallets());
    location.hash = "account";
    
  },
  addChain:async()=>{
    var ip = document.getElementById("nodeIP").value;
    document.getElementById("content").innerHTML=`PINGING NODE LOCATED AT ${ip}`;
    var r = (temple.get(ip)||"NO RES");
    document.getElementById("content").innerHTML=`
      RECIEVED RESPOSNSE ${r}
      Adding Chain: ${r}
      <div class="w50 button" onclick="location.hash='chains';">Chains</div>
    `;
    var c={
      name:r,
      ip:ip
    };
    console.log(c);
    temple.chains.push(c);
    temple.save("chains");
  },

  get:(ip)=>{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", ip, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
  },
  post:(ip, d)=>{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        temple.responseText= this.responseText;
        document.getElementById("chainData").innerHTML=this.responseText;
      }
      else{
        console.log(this);
        //document.getElementById("chainData").innerHTML=this.responseText;
      }
    };
    try{
      xmlHttp.open("POST", ip, true);
      xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlHttp.send("GAHAHHAHAHAH");
    }
    catch{
      console.log("could not make req");
    }
  },
  createChain:()=>{

  },
  save:(t)=>{
    localStorage.chains=JSON.stringify(temple.chains);
  },
  load:()=>{
    temple.chains=JSON.parse(localStorage.chains);
  }
};
temple.load();
