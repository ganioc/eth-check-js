'use strict';

module.exports = Web3 => ({
    web3http: new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/1bb948e667184704914d4f0a4439c6e8')),
    web3: new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/1bb948e667184704914d4f0a4439c6e8'))
})
