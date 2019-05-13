Deploy smart contract in node.js:

> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
> bytecode = fs.readFileSync('Posting_sol.bin').toString()
> abi = JSON.parse(fs.readFileSync('Posting_sol.abi').toString())
> postingContract = web3.eth.contract(abi);
> deployedContract = postingContract.new([1,2,3],{data: bytecode, from: web3.eth.accounts[0], gas: 4700000});
> contractInstance = postingContract.at(deployedContract.address);

Try push first data to the blockchain:
> contractInstance.storePost(1,"Happy",{from: web3.eth.accounts[0]});
