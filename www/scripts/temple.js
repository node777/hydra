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
  error:(d, r)=>{
    networkConsole.log(d);
    return r||null;
  },
  connect: function(){
    networkConsole.log('connecting...');
    if(temple.account){
      location.hash="account";
    }
    else{
      location.hash = "connect";
      networkConsole.log('could not find currently connected account');
      var a = networkConsole.input("Would you like to create an account or import (c/i): ", this.hanpt);
    }
  },
  importAccount:async function(){
    if(temple.account){
      alert("account already connected, please log out to import account")
      location.hash = "account";
    }
    else{
      temple.account={
        data:{
          type:"web3"
        }
      }
      temple.provider = new ethers.providers.Web3Provider(web3.currentProvider);
      temple.signer = temple.provider.getSigner();
      temple.save();
      location.hash = "account";
    }
  },
  createAccount: function(){
    var email="test@gmail.com";
    var pass="testPass";
    temple.account={
      data:{
        type:"email"
      },
      email:email
    }
    var hash=sha256(email);
    
    var privKey=sha256(pass+hash);
    //todo check if wallets exist
    temple.account.wallets=[];
    temple.account.wallets[0] =new ethers.Wallet(privKey);
    console.log(temple.account.wallets);
    temple.save();
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
    temple.save();
  },
  sign:async(msg)=>{
    //if web3
    if(temple.signer){
      //signedMsg = web3.personal.sign(web3.fromUtf8(msg), web3.eth.coinbase, console.log);
      //signedMsg=web3.eth.sign(web3.eth.coinbase, web3.sha3(msg), console.log);
      try{
        let signature = await temple.signer.signMessage(msg);
        console.log(signature);
        return signature;
      }
      catch(err){
        console.log(err);
        return "unsigned"
      }
    }
    else{
      return "could not sign message"
    }
  },
  get:(ip)=>{
    var x = new XMLHttpRequest();
    try{
      x.open( "GET", ip, false ); // false for synchronous request
      x.send( null );
      return x.responseText;
    }
    catch{
      return "Endpoint could not be reached"
    }
  },
  post:async(ip, d)=>{
    var callParams=ip.split("/");
    var inv = callParams[callParams.length-1];
    var k=function(){
      if(temple.provider){
        try{
          return temple.provider.provider.selectedAddress
        }
        catch(e){
          console.log(e);
          return null
        }
      }else{
        try{
          return temple.account.wallets[0].signingKey.address
        }catch(e){
          alert(e);
          return null
        }
      }
    };
    if(k()!=null){
      var c = JSON.parse(temple.get(temple.chains[hux.cid].ip));
      let prevHash=c[c.length-1].h;
      var block={
        p: prevHash,
        t: Date.now(),
        k:k(),
        i:inv,
        m:d
      }
      block.s=await temple.sign(JSON.stringify(block));
      var x = new XMLHttpRequest();
      x.onreadystatechange = function() {
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
        x.open("POST", ip, true);
        x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        x.send(JSON.stringify(block));
      }
      catch{
        networkConsole.log("could not make req");
      }
    }else{
      alert("No wallet connected");
    }
  },
  createChain:()=>{

  },
  save:()=>{
    if(temple.account){
      localStorage.account=JSON.stringify(temple.account);
    }

    if(temple.chains){
      localStorage.chains=JSON.stringify(temple.chains);
    }
  },
  load:async()=>{
    if(localStorage.chains){
      temple.chains=(JSON.parse(localStorage.getItem('chains')))||[];
    }
    if(localStorage.account){
      temple.account={};
      temple.account=JSON.parse(localStorage.getItem('account'));
      if(temple.account.data.type=="web3"){
        temple.provider = await new ethers.providers.Web3Provider(web3.currentProvider);
        temple.signer = await temple.provider.getSigner();
      }
    }
  },
  clear: function(){
    localStorage.clear();
    temple.account=null;
    location.hash="";
  }
};
temple.load();
