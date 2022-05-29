const version = '1.0'
var fs = require('fs');
var CryptoJS = require("crypto-js");
var path = require('path');
var colors = require('colors');
const { exit } = require('process');
var myArgs = process.argv.slice(2);
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

switch (myArgs[0]) {
case '-crypt':
  console.log('['+'sigillum'.red +'] '+`script version ${version}`)
  console.log('['+'sigillum'.red +'] '+'loading file...')
    fs.readFile(myArgs[1], 'utf-8', function (err, data) {
      console.log('['+'sigillum'.red +'] '+`file: ${myArgs[1]} password: ${myArgs[2]}`)
        if(err) throw err;
        var data_crypt = CryptoJS.AES.encrypt(data, myArgs[2]).toString()
        fs.writeFile(`${myArgs[1]}.egid`, data_crypt,{enconding:'utf-8',flag: 'a'}, function (err) {
            if (err) throw err;
            
            console.log('['+'sigillum'.red +'] '+ `${myArgs[1]}` + ` was encrypted to ` + `${myArgs[1]}.egid`.green);
        });
    });



    break;
case '-decrypt':
  console.log('['+'sigillum'.red +'] '+`script version ${version}`)
  console.log('['+'sigillum'.red +'] '+'loading file...')
    fs.readFile(myArgs[1], 'utf-8', function (err, data) {
        if(err) throw err;
        var data_cr  = CryptoJS.AES.decrypt(data, myArgs[2]);
        var data_decrypt = data_cr.toString(CryptoJS.enc.Utf8);
        fs.writeFile(myArgs[1].replace('.egid', ''), data_decrypt, (err) => {
            if (err) throw err;
            console.log('['+'sigillum'.red +'] '+`${myArgs[1]} has decrypted to`+ `${myArgs[1].replace('.egid', '')}`.green);
  
          exit()
        });

    });


    break;
default:

console.log("")
console.log("        ▄████████    ▄██████▄   ▄█  ████████▄     ▄████████ ")
console.log("       ███    ███   ███    ███ ███  ███   ▀███   ███    ███ ")
console.log("       ███    █▀    ███    █▀  ███▌ ███    ███   ███    █▀  ")
console.log("      ▄███▄▄▄      ▄███        ███▌ ███    ███  ▄███▄▄▄     ")
console.log("     ▀▀███▀▀▀     ▀▀███ ████▄  ███▌ ███    ███ ▀▀███▀▀▀     ")
console.log("       ███    █▄    ███    ███ ███  ███    ███   ███    █▄  ")
console.log("       ███    ███   ███    ███ ███  ███   ▄███   ███    ███ ")
console.log("       ██████████   ████████▀  █▀   ████████▀    ██████████ ")
                                                       
console.log("")
console.log("                      NODE AES file encryptor")
console.log(" _______________________________________________________________".red)
console.log("")
console.log(' >'.red + ` node ${path.basename(__filename)} -crypt [file.ext] [password]`)
console.log(' >'.red + ` node ${path.basename(__filename)} -decrypt [file.ext.egid] [password]`)

exit()
}
