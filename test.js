const Web3 = require('web3')

//web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/1bb948e667184704914d4f0a4439c6e8'));
const InputDataDecoder = require('ethereum-input-data-decoder');

//
const decoder = new InputDataDecoder('./test.abi.json');
//
let input = '0xe7e4e1f7000000000000000000000000000000000000000000000000000000000000465000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000026727566663146765561727354614d50763437724c6e57624151657a41695953397146704e484d0000000000000000000000000000000000000000000000000000';
//let output = web3.eth.abi.decodeParameters([
//                                'uint256', 'string',
//                            ], input);
//console.log(output);
let output = decoder.decodeData(input);
console.log(output.inputs[0].toNumber());
console.log(output);
