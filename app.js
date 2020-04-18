var electron = require('electron');  // Module to control application life.
//var BrowserWindow = require('browser-window');  // Module to create native browser window.
const {app, ipcRenderer, BrowserWindow, ipcMain, dialog} =  require('electron');
const Tx = require('ethereumjs-tx').Transaction
var pkkey = '';
var Web3 = require('web3');
const web3 = new Web3('https://mainnet.infura.io/v3/914bc8ee83c746a9801f4a57f0432aff');
var hdkey = require('ethereumjs-wallet/hdkey');
const ethUtils = require('ethereumjs-util');
var oldresult = 999999999;
var myetheraddress;
var globalGwei = "10";
var publickey = '';


const contractAddress = "0x6EA53dfc58C5cbf68a799EdD208cb3A905db5939"
var mainWindow = null;
const url = require("url");
const path = require("path");

var data = '[{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"},{"internalType":"string","name":"tokenName","type":"string"},{"internalType":"string","name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_owner","type":"address"},{"indexed":true,"internalType":"address","name":"_spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bytes","name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"mineamount","type":"uint256"}],"name":"becameaminer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burn","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"checkAddrMinerAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"checkAddrMinerStatus","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"checkRewardStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"uint256","name":"_index","type":"uint256"}],"name":"checkmemopurchases","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundsWallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"genesisReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_bnumber","type":"uint256"}],"name":"getDailyReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getactiveminersnumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getblockhash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getmaximumAverage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"getmemotextcountforaddr","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_blocknumber","type":"uint256"}],"name":"getspesificblockhash","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getyourcoinsbackafterthreemonths","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"lastBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumTarget","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nAddrHash","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nRewarMod","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nWtime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"numberofminer","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"premined","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"rewardTimes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"string","name":"_memo","type":"string"}],"name":"sendtokenwithmemo","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_bnumber","type":"uint256"}],"name":"signfordailyreward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalReceived","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]';
var abi = JSON.parse(data);
//console.log(abi);

app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});
//app.allowRendererProcessReuse = true;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  console.log("ready");
  app.getVersion();
  mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    'min-width': 300,
    'min-height': 600,
    'accept-first-mouse': true,
    'title-bar-style': 'hidden',
    webPreferences: {
            nodeIntegration: true
        }
  });
  mainWindow.loadURL(
    url.format({
        pathname: path.join(__dirname,"/index.html"),
        protocol: "file:",
        slashes:true
    })
  );
mainWindow.on('closed', function() {
  mainWindow = null;
});



ipcMain.on('rreloader', (event, memodetails) => {
   console.log(memodetails);
   getbalance();


});

ipcMain.on('sendmemoplease', (event, memodetails) => {
  console.log(memodetails);
  if(memodetails["amount"] == '' || memodetails["memoo"] == '' || memodetails["rece"] == '') {

    mainWindow.send("enablememoagain", "true");
    const options = {
    type: 'question',
    buttons: ['Okey.'],
    defaultId: 2,
    title: 'Warning',
    message: 'Receiver amount or receiver require.',
    detail: 'Please fill everywhere',
    };

    dialog.showMessageBox(null, options, (response, checkboxChecked) => {
    console.log(response);
    console.log(checkboxChecked);
    });


  } else {
    console.log("ok");
    var xxnewamo = web3.utils.toWei(memodetails["amount"], 'ether');
    console.log("xxnewamo", xxnewamo);
    const grpice  = web3.eth.getGasPrice().then(function(networkgasprice){
      console.log("networkgasprice",networkgasprice);
    var MyContract = new web3.eth.Contract(abi, contractAddress, {
        from: myetheraddress,
        gasPrice: web3.utils.toWei(networkgasprice, 'gwei')
    });




    MyContract.methods.sendtokenwithmemo(xxnewamo, memodetails["rece"], memodetails["memoo"] ).estimateGas({from: myetheraddress})
      .then(function(gasAmount){
              console.log("gasolina", gasAmount);
                console.log("gasolin222a", web3.utils.toHex(web3.utils.toWei(networkgasprice, 'gwei')));

              web3.eth.getTransactionCount(myetheraddress).then(function(nonce){
                console.log("my nonce value is here:", nonce);
                dataTx = MyContract.methods.sendtokenwithmemo(xxnewamo, memodetails["rece"], memodetails["memoo"]).encodeABI();  //The encoded ABI of the method


                 console.log("dataTx",dataTx);
                 var rawTx = {
                 'from': myetheraddress,
                 'chainId': 1,
                 'gas': web3.utils.toHex(gasAmount),
                 'data':dataTx,
                 'to': contractAddress,
                 'gasPrice': web3.utils.toHex(networkgasprice),
                 'nonce':  web3.utils.toHex(nonce) }

                 var tx = new Tx(rawTx);
                 console.log("tx",tx);
                 tx.sign(pkkey);
                 var serializedTx = tx.serialize();
                 console.log("serializedTx",serializedTx);

                 web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then(function(TxHash){
                    console.log("TxHash",TxHash);
                    console.log("real tx hash",TxHash["transactionHash"]);
                    mainWindow.send("showtx", TxHash["transactionHash"]);
                });
              });
      })
      .catch(function(err){
            console.log("gasolina err", err);
      });


    }).catch(function(err){
      console.log(err)
    });




  }
  //omgbb

});


ipcMain.on('receivekey', (event, privateKey) => {
 console.log("im here!!!", privateKey);
 checkxx = privateKey.split(" ").length-1
 console.log("checkxx",checkxx);
 var mnemonic = privateKey;
 if(checkxx > 10){
   const HDWallet = require('ethereum-hdwallet')
   const hdwallet = HDWallet.fromMnemonic(mnemonic);
   console.log(`0x${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`)
   var adasd = hdwallet.derive(`m/44'/60'/0'/0/0`).getPrivateKey().toString('hex')
   var privateKey = Buffer.from(adasd, 'hex' );
   console.log("public keyyy",  hdwallet.derive(`m/44'/60'/0'/0/0`).getPublicKey().toString('hex'));
   publickey =  hdwallet.derive(`m/44'/60'/0'/0/0`).getPublicKey().toString('hex')


   myetheraddress = `0x${hdwallet.derive(`m/44'/60'/0'/0/0`).getAddress().toString('hex')}`; //ethUtils.privateToAddress(privateKey).toString('hex')
   console.log("public keyyy",  hdwallet.derive(`m/44'/60'/0'/0/0`).getPublicKey().toString('hex'));
   publickey =  hdwallet.derive(`m/44'/60'/0'/0/0`).getPublicKey().toString('hex')
   console.log(privateKey);
   console.log(myetheraddress);
   pkkey = privateKey;
   console.log("end");
   getbalance();
 } else {
   var privateKey = Buffer.from(privateKey, 'hex' );
   try {
     myetheraddress = ethUtils.privateToAddress(privateKey).toString('hex');
     myetheraddress = ethUtils.privateToAddress(privateKey).toString('hex');
     console.log(privateKey);
     console.log(myetheraddress);
     pkkey = privateKey;
     console.log("endd");

     getbalance();
} catch (e) {

  if (e instanceof TypeError) {
    // ignore TypeError
  }
  else if(e instanceof RangeError) {
    // handle RangeError
    console.log("I need a valid eth private key.")
    mainWindow.send("enableagain", "true");
    const options = {
    type: 'question',
    buttons: ['Okey.'],
    defaultId: 2,
    title: 'Warning',
    message: 'Ethereum private key problem',
    detail: 'I need a valid eth private key.',
  };

  dialog.showMessageBox(null, options, (response, checkboxChecked) => {

    console.log(enableagain);
    console.log(response);
    console.log(checkboxChecked);
  });

  } else {
    console.log(e);
  }
}
 }
});





function getbalance() {


        const grpice  = web3.eth.getGasPrice().then(function(networkgasprice){


          console.log("networkgasprice",networkgasprice)

          var MyContract = new web3.eth.Contract(abi, contractAddress, {
              from: myetheraddress,
              gasPrice: web3.utils.toWei(networkgasprice, 'gwei')
          });

          web3.eth.getBalance(myetheraddress).then(function(balance){
            var bal = web3.utils.fromWei(balance);
            if(bal < 0.01) {
                mainWindow.send("enableagain", "true");
                const options = {
                type: 'question',
                buttons: ['I understand problem, i will load ethereum to this address.'],
                defaultId: 2,
                title: 'Warning',
                message: 'Ethereum balance problem',
                detail: 'Hola, you need minimum 0.01 ethereum balance. Because of ethereum eRush write functions.',
              };

              dialog.showMessageBox(null, options, (response, checkboxChecked) => {
                console.log(response);
                console.log(checkboxChecked);
              });
            } else {
                  console.log("eawc");
                  var detailz = {}
                  detailz['ethbalance'] = parseFloat(bal).toFixed(4);
                  detailz['address'] = myetheraddress
                  detailz['publickey'] = publickey
                  MyContract.methods.balanceOf(myetheraddress).call().then(function(result){
                  var myTokenBalance = result;
                  var tokenbalance = web3.utils.fromWei(myTokenBalance);
                  console.log(tokenbalance);
                  detailz['eerbalance'] = parseFloat(tokenbalance).toFixed(2);

                  MyContract.methods.getmemotextcountforaddr(myetheraddress).call().then(function(result){
                      console.log("resolt", result);
                      if(result == 0){
                        console.log("dont have an any message");
                      } else {

                        var myray = [...Array(result).keys()];

                        for (i = 0; i < result; i++) {
                           console.log("xxx",i);
                           MyContract.methods.checkmemopurchases(myetheraddress, i).call().then(function(result){
                             console.log("resolt", result);
                             mainWindow.send("appendnewmemo", result);
                           });

                        }
                      }





                   });




                  mainWindow.send("getdatils", detailz);
               });


            }
          });





        }).catch(function(err){
          console.log(err)
        });







}


});
