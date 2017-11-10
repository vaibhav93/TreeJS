import underscore from 'underscore';

class Tree {
    constructor(model){
	//Growing tree from saved Model
	this.model = model;
    }
    construction(trainData, settings){
	this.trainData = trainData;
	this.settings = settings;
    }
    
    predict(){
	
    }
    
    trainClassifier(){

    }
    trainRegressor(){
    }
}

class SplitFinder {
    constructor(){
    }
    split(){
    }
}

class Gini extends SplitFinder {
    constructor(trainingInstancesAtNode){
	super();
    }

    static calculateInformationGain(){
	console.log('test');
    }
    split(dataset){
	//Get the set of class values from last value of each instance
	const classes = new Set(dataset.map(function(instance){
	    return instance[instance.length-1];
	}));
	var split_details = {
	    gini : Number.MAX_SAFE_INTEGER,
	    featureIndex : featureIndex,
	    groups : groups
	};
	//Iterate over all features. Ignore last index which is instance label
	for(var featureIndex = 0; featureIndex<dataset[0].length;featureIndex++){
	    for(let trainingInstance of dataset){
		let groups = splitContinuosIntoGroups(featureIndex, trainingInstance[featureIndex], dataset);
		let gini = gini_index(groups, classes);
		if(gini<lowest_gini){
		    split_details = {
			impurity : gini,
			featureIndex : featureIndex,
			groups : groups			
		    };
		}
	    }
	}

	return split_details;
    }
    // This function splits the datasets into left and right groups, based
    // on the current feaure and its value
    //dataset is array of arrays. Each row represets one instance of the dataset)
    splitContinuosIntoGroups(index, value, dataset){
	var left = [];
	var right = [];
	for(let traningInstance of dataset){
	    if(traningInstance[index] < value)
		left.push(traningInstance);
	    else
		right.push(trainingInstance);
	}
	return {
	    left : left,
	    right : right
	}
    }
    // Fix later. can be 2^(q-1) - 1 splits for q categories.
    // Can also optimize for binary classification task.
    splitCategoricalIntroGroups(index, value, dataset){
	var left = [];
	var right = [];
	for(let trainingInstance of dataset){
	    if(trainingInstance[index] == value)
		left.push(trainingInstance);
	    else
		right.push(trainingInstance);
	}
	return {
	    left : left,
	    right : right
	}
    }
    // Groups here represent the subsets in which all instances at this node
    // are split based on the current split point. We are iterating through
    //all possible split points for all features to find the best split.
    // best split is given by lowest gini index
    gini_index(groups,classes){
	totalInstances = groups.reduce((sum, value) => sum = sum + value.length,0);
	var gini = 0;
	for(let group of groups){
	    if(group.length==0)
		continue;
	    let probability=0;
	    let score=0;
	    for(let labelClass of classes){
		probability = group.filter((trainingInstance) => trainingInstance[trainingInstance.length-1]==labelClass).length/group.length;
		score += probability*probability;
	    }
	    gini += (1-score)*(group.length/totalInstances);
	}
	return gini;
    }

}

// import ms from 'ms';
// import lunchtime from './lunchtime.js';
// import millisecondsUntil from './millisecondsUntil.js';
// export
// export default function howLongUntilLunch(hours, minutes) {
// 	// lunch is at 12.30
// 	if (hours === undefined) hours = 12;
// 	if (minutes === undefined) minutes = 30;
//
// 	var millisecondsUntilLunchTime = millisecondsUntil(lunchtime(hours, minutes));
// 	return ms(millisecondsUntilLunchTime, { long: true });
// }

export { Tree, Gini, SplitFinder };
