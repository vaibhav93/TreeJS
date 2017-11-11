export default class TreeNode {

	constructor(featureIndex, featureValue, impurity, depth) {
		this.featureIndex = featureIndex;
		this.featureValue = featureValue;
		this.impurity = impurity;
		this.depth = depth;
	}
	print(){
		console.log("Tree Node :: Depth: " + this.depth + " :: Feature Index: "+ this.featureIndex + " :: Feature Value: " + this.featureValue);
	}

}
