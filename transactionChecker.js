'use strict';
const abiDecoder = require('abi-decoder'); // NodeJS

module.exports = web3 => {
    const account = '0xdf5910419854a5c25e0f8e53ec5184d769eeacf7'.toLowerCase();

    return {
        async checkLastBlock() {
            let block = await web3.eth.getBlock('latest');
            console.log(`[*] Searching block ${ block.number }...`);
            if (block && block.transactions) {
                for (let tx of block.transactions) {
                    let transaction = await web3.eth.getTransaction(tx);
                    if (account === transaction.to.toLowerCase()) {
                        console.log(`[+] Transaction found on block ${ lastBlockNumber }`);
                        console.log({ address: transaction.from, value: web3.utils.fromWei(transaction.value, 'ether'), timestamp: new Date() });
                    }
                }
            }
        },

        checkBlocks: async (start, end) => {
            for (let i = start; i < end; i++) {
                let block = await web3.eth.getBlock(i)
                console.log(`[*] Searching block ${ i }`);
                if (block && block.transactions) {
                    for (let tx of block.transactions) {
                        let transaction = await web3.eth.getTransaction(tx);
                        if (account === transaction.to.toLowerCase()) {
                            //console.log(`[+] Transaction found on block ${ lastBlockNumber }`);
                            console.log("\ntransaction:")
                            console.log(transaction);

                            let input = web3.eth.abi.decodeParameters([
                                'uint', 'string',
                            ], transaction.input);

                            console.log("\ninput:")
                            console.log(input);

                            console.log("\ndecode input:")
                            console.log(abiDecoder.decodeMethod(transaction.input));

                            console.log("\ndecode from - value - timestamp")
                            console.log({ address: transaction.from, value: web3.utils.fromWei(transaction.value, 'ether'), timestamp: new Date() });
                        }
                    }
                }
            }
        }
    }
}
