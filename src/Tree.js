import Gini from './splitFinders/Gini.js';
export default class Tree {
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
    console.log(this.trainData);
		let results = new Gini(this.trainData).split();
		console.log("best impurity " + results.impurity + " at index " + results.featureIndex + " and featureValue " + results.featureValue);
	}
	trainRegressor() {}
}
