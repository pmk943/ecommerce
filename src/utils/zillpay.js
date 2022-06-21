// Its will check zilpay wallet is there or not
if(window.zilPay){
    window.zilPay.wallet.connect().then(function(){
        

        console.log(window.zilPay.wallet.defaultAccount);
        const addr = window.zilPay.wallet.defaultAccount.bech32;
        myadd = addr;
        //Query blockchain for balance
        window.zilPay.blockchain.getBalance(addr).then(function(resp){
            myInitObject = resp.result["balance"];
            // createcollection()
            
                
        });
    
    });
  
  }else{
 alert("Cannot find Zilpay")
}

//createcollection  (JSON data)
const createcollection = ()=>{
    var cName = "0x72af046df15baea42974395ae601b4e42b18b9a5"; //prompt("Please enter Collection Name");
    cDetails = window.zilPay.contracts.at(cName);
    collectionname = cName;
    var ContractState = '';
    //console.log(cDetails)
    //Cobject = cDetails
    
    var spName = "0x8cac23a93c933a81d03a5d86c5433af46db8af7d";
    spDetails = window.zilPay.contracts.at(spName);
    
    

    if(cDetails){
    cDetails.getState().then(function(stateData){
        Cobject = stateData;
        ContractAddress = cName;
        //console.log(Cobject.minters)
        alert("Contract State Loaded Successfully!");
        cDetails.getInit().then(function(x){
            
            if(spDetails){
    spDetails.getState().then(function(stateData){
        spObject = stateData;
        
        Objectsmsp= spObject.id_to_market_item
        console.log(spObject)
        loadGallery(false);
        

    });
}else{
    alert("Please load contract first");
    return;
}
            //mpGallery()
        });

    });
}else{
    cDetails = undefined;
}

}

// GALLERY CREATION
const loadGallery=(flag)=>{
if(!cDetails){
    alert("Please load contract first");
    return;
}
//sleep(2000)


for (const i in Objectsmsp){
    
    count.push(Objectsmsp[i].arguments[1])
}

var gallery = document.querySelector("#gallery-container");
gallery.innerHTML = "";

tokenOwners = Cobject.token_owners;
tokenUris = Cobject.token_uris;

galleryCode = "<h2 style='width:100%' class='HVCenter'>" + cDetails.init[1].value + "</h2>";

var currentAccountAddress = window.zilPay.wallet.defaultAccount.base16;



for(const i in tokenOwners){

    if(flag){
        if(tokenOwners[i].toUpperCase() !== currentAccountAddress.toUpperCase()){           
            continue;
        }
    }
    

    var transferBtn = "";
    console.log(count)
    if(count.includes(i)){          
            


    galleryCode += `
    <div id="nft-${i}" className="nft-card">
        <div className="nft-card-id HVCenter">NFT ID: ${i}&nbsp;<button onClick="${BuyNFT[i]}">Transfer</button></div>
        <div className="nft-card-img-holder HVCenter">
            <img className="nft-card-image" src="${tokenUris[i]}"/></div>
        <div id="nft-card-owner">Owner:&nbsp;${tokenOwners[i]}</div>
    </div>
    `;
    }
}

gallery.innerHTML = galleryCode;
//mpGallery()
}