import Gini from "./splitFinders/Gini.js";
import TreeNode from "./TreeNode.js";
export default class Tree {
    constructor(trainData, settings) {
        this.trainData = trainData;
        this.settings = settings;
    }


    trainClassifier() {
        let results = new Gini(this.trainData).split();
        var depth = 0;
        var rootNode = new TreeNode(results.featureIndex, results.featureValue, results.impurity, depth);           
        rootNode.print();
    }

    trainRegressor() {
    }
}
