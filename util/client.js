'use strict'
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder('./test.abi.json');

const SMART_CONTRACT_ADDR = '0xdf5910419854a5c25e0f8e53ec5184d769eeacf7'


/**
 * 
 * @param {*} tx
 * return 
 * { tokens: 18000,
  ruffAddress: 'ruff1FvUarsTaMPv47rLnWbAQezAiYS9qFpNHM' } 
 */
function parseTx(tx){
    let input = decoder.decodeData(tx.input)

    // console.log("\ninput")
    // console.log(input)

    if(tx.to.toLowerCase() === SMART_CONTRACT_ADDR
        && input.method && input.method === 'stake'
        && input.types && input.types[0] === 'uint256'
        && input.types[1] === 'string'
        && input.names && input.names[0] === 'tokens'
        && input.names[1] === 'ruffAddress'){

            // console.log(typeof input.inputs[0])
            return {
                'tokens': input.inputs[0].toNumber(),
                'ruffAddress': input.inputs[1]
            }
        }

    return null
}
function isValidReceipt(recp){
    return recp.status === true
}

module.exports = (web3) =>{
    return {
        async getRecords ( blockNum){
            try{
                let block = await web3.eth.getBlock(blockNum)
                // console.log(block)
                let timestamp = block.timestamp
                // console.log('date: ', timestamp)
                let out = []
                if( block.transactions){
                    // transaction is the Hash number
                    for(let transaction of block.transactions){
                        let tx = await web3.eth.getTransaction(transaction)
                        // console.log("\ntx:")

                        let resultTx = parseTx(tx)

                        if(resultTx){
                            let receipt = await web3.eth.getTransactionReceipt(transaction)
                            // console.log("\ntx", tx)
                            // console.log("\nreceipt", receipt)
                            if(isValidReceipt(receipt)){
                                resultTx.timestamp = timestamp
                                resultTx.txHash = tx.hash
                                resultTx.fromAddr = tx.from
                                
                                out.push(resultTx)
                            }
                        }
                    }
                }

                return {
                    err:0,
                    data:out
                }
            }catch(e){
                return {
                    err:1,
                    message: e,
                    data:[]
                }
            }
        }
    }
}