'use strict'

const Web3 = require('web3')
let web3 = new Web3('wss://ropsten.infura.io/ws/v3/1bb948e667184704914d4f0a4439c6e8')

const client = require('./util/client')(web3);

let BLOCK_NUM_1 = 9596121

async function main(){
    console.log('hi!')

    let result = await client.getRecords(BLOCK_NUM_1)
    console.log(result)

    process.exit(0)
}

main()