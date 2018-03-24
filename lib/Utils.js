const crypto = require('crypto');
const wallet = require('ethereumjs-wallet');

var algorithm = 'aes256';

module.exports.privateToPublic = (privateKey) => {
    var account = crypto.createECDH('secp256k1');
    account.setPrivateKey(privateKey);
    return account.getPublicKey().slice(1);
}

module.exports.computeSecret = (privateKeyFromA, publicKeyFromB) => {
    var A = crypto.createECDH('secp256k1');
    A.setPrivateKey(privateKeyFromA);
    return A.computeSecret(publicKeyFromB);
}

exports.encrypt = (message, secret) => {
    var cipher = crypto.createCipher(algorithm, secret);
    var crypted = cipher.update(message,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
  
exports.decrypt = (encryptedMessage, secret) => {
    var decipher = crypto.createDecipher(algorithm,secret)
    var dec = decipher.update(encryptedMessage,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

// exports.getPubkeyFromTransaction = (rawTx) => {
//       var localTx = {
//         nonce: parseInt(rawTx.nonce),
//         gasPrice: parseInt(rawTx.gasPrice),
//         gasLimit: parseInt(rawTx.gas),
//         to: rawTx.to,
//         value: parseInt(rawTx.value),
//         r: rawTx.r,
//         s: rawTx.s,
//         v: rawTx.v,
//         data: rawTx.input,
//       };
  
//     var txInstance = new Transaction(localTx);
//     return txInstance.getSenderPublicKey().toString('hex');
//   }