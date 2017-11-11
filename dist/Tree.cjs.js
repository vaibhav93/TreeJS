'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var underscore = _interopDefault(require('underscore'));

class SplitFinder {
    constructor(){
    }
    split(){
    }
}

class Gini extends SplitFinder {
	constructor(instancesAtNode) {
		super(instancesAtNode);
		this.instancesAtNode = instancesAtNode;
	}

	split() {
		//Get the set of class values from last value of each instance
		// TODO : Optimize. get classes array from num_class in Tree settings.
		//This can allow to stop early when all classes have been found.
		const classes = new Set(this.instancesAtNode.map(function(instance) {
			return instance[instance.length - 1];
		}));
		var split_details = {
			impurity: Number.MAX_SAFE_INTEGER,
			featureIndex: null,
			groups: null
		};
		//Iterate over all features. Ignore last index which is instance label
		for (var featureIndex = 0; featureIndex < this.instancesAtNode[0].length - 1; featureIndex++) {
			for (let trainingInstance of this.instancesAtNode) {
				let groups = this.splitContinuosIntoGroups(featureIndex, trainingInstance[featureIndex], this.instancesAtNode);
				let gini = this.gini_index(groups, classes);
				console.log("split for index " + featureIndex + " is " + gini);
				if (gini < split_details.impurity) {
					split_details = {
						impurity: gini,
						featureIndex: featureIndex,
						featureValue: trainingInstance[featureIndex],
						groups: groups
					};
				}
			}
		}
		return split_details;
	}
	// This function splits the datasets into left and right groups, based
	// on the current feaure and its value
	//dataset is array of arrays. Each row represets one instance of the dataset)
	splitContinuosIntoGroups(index, value, dataset) {
		var left = [];
		var right = [];
		for (let trainingInstance of dataset) {
			if (trainingInstance[index] < value)
				left.push(trainingInstance);
			else
				right.push(trainingInstance);
		}
		return {
			left: left,
			right: right
		}
	}
	// Fix later. can be 2^(q-1) - 1 splits for q categories.
	// Can also optimize for binary classification task.
	splitCategoricalIntroGroups(index, value, dataset) {
		var left = [];
		var right = [];
		for (let trainingInstance of dataset) {
			if (trainingInstance[index] == value)
				left.push(trainingInstance);
			else
				right.push(trainingInstance);
		}
		return {
			left: left,
			right: right
		}
	}
	// Groups here represent the subsets in which all instances at this node
	// are split based on the current split point. We are iterating through
	//all possible split points for all features to find the best split.
	// best split is given by lowest gini index
	gini_index(groups, classes) {
		var totalInstances = Object.values(groups).reduce((sum, value) => sum = sum + value.length, 0);
		var gini = 0;
		for (let group of Object.values(groups)) {
			if (group.length == 0)
				continue;
			let probability = 0;
			let score = 0;
			for (let labelClass of classes) {
				probability = group.filter((trainingInstance) => trainingInstance[trainingInstance.length - 1] == labelClass).length / group.length;
				score += probability * probability;
			}
			gini += (1 - score) * (group.length / totalInstances);
		}
		return gini;
	}

}

class TreeNode {

	constructor(featureIndex, featureValue, depth) {
		this.featureIndex = featureIndex;
		this.featureValue = featureValue;
		this.depth = depth;
	}
  print(){
    console.log("Tree Node :: Depth: " + this.depth + ' :: Feature Index: '+ this.featureIndex + ' :: Feature Value: ' + this.featureValue);
  }

}

class Tree {
	constructor(trainData, settings) {
		this.trainData = trainData;
		this.settings = settings;
	}
	static test() {
		console.log("test");
	}
	predict() {

	}

	trainClassifier() {
		let results = new Gini(this.trainData).split();
		var depth = 0;
	  var rootNode = new TreeNode(results.featureIndex, results.featureValue, depth);
		rootNode.print();
		//console.log("best impurity " + results.impurity + " at index " + results.featureIndex + " and featureValue " + results.featureValue);
	}
	trainRegressor() {}
}

exports.Tree = Tree;
exports.Gini = Gini;
exports.SplitFinder = SplitFinder;
