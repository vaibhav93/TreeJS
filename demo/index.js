const DDT = require('../dist/Tree.cjs');

var Gini = DDT.Gini;
var Tree = DDT.Tree;

var csv = require("fast-csv");
var bank_data = [];
csv
	.fromPath("./data/data_banknotes.csv")
	.on("data", function(data) {
		bank_data.push(data);
	})
	.on("end", function() {
		//console.log(bank_data[0].length)
		//let results = gini.split(bank_data);
		let tree = new Tree(bank_data, {});
		tree.trainClassifier();
	});
