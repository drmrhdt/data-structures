function measureTime(func, arg) {
	const start = Date.now();
	func(arg);
	const end = Date.now();
	return end - start;
}

function randomArray(length, upperBoundValue){
	const newArray = [];
	for (let i = 0; i < length; i++) {
		newArray.push(Math.ceil(Math.random()*upperBoundValue));
    }
	return newArray;
}

//TEST
let unsortedArray = randomArray(2500, 1000);

measureTime(selectionSort, unsortedArray);
measureTime(insertionSort, unsortedArray);