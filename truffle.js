var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic = 'cliff consider fetch almost material december exclude strike picture purity wrist ahead';

module.exports = {
  networks: {
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, 
          'https://rinkeby.infura.io/v3/46fcbe54014e46ae8874c5a7fa74d61b');
      },
      network_id: '*'
    }
  }
};
