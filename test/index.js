'use strict'
const Web3 = require('web3')
// const CreateClient = require('./ethClient')
// const BuildTransactionChecker = require('./transactionChecker')

// const { web3http, web3 } = CreateClient(Web3)
// const client = BuildTransactionChecker(web3)

let web3 = new Web3('wss://ropsten.infura.io/ws/v3/1bb948e667184704914d4f0a4439c6e8')
const InputDataDecoder = require('ethereum-input-data-decoder');
//
const decoder = new InputDataDecoder('./test.abi.json');


let BLOCK_NUM_1 = 9596121
let BLOCK_NUM_FAIL =  9595897

async function main(){
    console.log('Hello test!')

    // client.checkBlock(BLOCK_NUM_1)
    let block = await web3.eth.getBlock(BLOCK_NUM_FAIL);

    console.log(block)

    if(block.transactions && block.transactions.length ){
        console.log(block.transactions)
        let transactions = block.transactions;
        console.log("\nTx")

        for(let transaction of transactions){
            console.log('======================================')
            let tx = await web3.eth.getTransaction(transaction)
            console.log(tx)
    
            let input = decoder.decodeData(tx.input)
            console.log("\ninput")
            console.log(input)
    
            console.log("\nReceipt")
            let receipt = await web3.eth.getTransactionReceipt(transaction)
            console.log(receipt)
            console.log(receipt.logs[0])
        }
        
    }
    
    console.log('End')
    process.exit(0)
}

main()

