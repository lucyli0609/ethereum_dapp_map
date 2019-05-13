var express = require('express');
app = express();
var server = require('http').createServer(app);
var Web3 = require('Web3');

coordinatesMap = new Map();


app.use(express.static('.'));

web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));

let abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"postReceived","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"cooridnateList","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"coordinate","type":"uint256"}],"name":"getPost","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"cooridnate","type":"uint256"},{"name":"posts","type":"string"}],"name":"storePost","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"coordinates","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
let postingContract = web3.eth.contract(abi);
let contractInstance = postingContract.at('0xc212816e8fffffcc5e5008b56e1fde708af1a11e');


app.get('/fetch-all', (req, res) => {
	allvisits = new Map(); 
	console.log(coordinatesMap); 
	console.log(allvisits);
	coordinatesMap.forEach((value, key) => {
		//console.log(value);
		var text = contractInstance.getPost.call(value).toString();
		//console.log(text); 
		allvisits.set(key, text);
	});
	obj = makeObj(allvisits);
	res.setHeader('Access-Control-Allow-Headers', 'Origin', 'Content-Type',
		'Accept');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json');
	console.log(JSON.stringify(obj));
	res.send(JSON.stringify(obj));
});

function makeObj(map) {
	let obj = {}; 
	map.forEach((value, key) => {
		obj[key] = value; 
	});
	return obj; 
}

app.get('/fetch-transaction', (req, res) => {
	var lat = req.query.lat;
	var long = req.query.long;
	coords = [];
	coords.push(long);
	coords.push(lat); 
	coords = coords.toString(); //need to convert array to string for comparison
	count = coordinatesMap.size; 
	if (coordinatesMap.get(coords) == undefined) {
		coordinatesMap.set(coords, count + 1); 
	}
	id = coordinatesMap.get(coords); 
	console.log(id);

	var post = contractInstance.getPost.call(id).toString();

	res.send(post);
	

});

app.get('/post-transaction', (req, res) => {
	var lat = req.query.lat;
	var long = req.query.long;
	var text = req.query.txt;
	console.log(req.query); 

	coords = [];
	coords.push(long);
	coords.push(lat);
	coords = coords.toString(); //need to convert array to string for comparison
	count = coordinatesMap.size; 
	if (coordinatesMap.get(coords) == undefined) {
		coordinatesMap.set(coords, count + 1);
	}
	id = coordinatesMap.get(coords);

	console.log(id);
	contractInstance.storePost(id, text, {from: web3.eth.accounts[0]});
	var post = contractInstance.getPost.call(id).toString();
	
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Content-Type', 'application/json');
	res.send(post);

});

server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');
