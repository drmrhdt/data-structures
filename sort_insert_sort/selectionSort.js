const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];

function selectionSort(arrayToSort) {
  let sortedArray = arrayToSort;

  // check every element in unsorted array
  for (let currentIndex = 1; currentIndex < sortedArray.length; currentIndex++) {
      
      // let's suppose the first element of array is max
      let maxValue = sortedArray[0];

      // compare max value with each element inside subarray (unsorted part of original array)
      for (let currentIndexToCompare = 0; currentIndexToCompare < sortedArray.length - currentIndex; currentIndexToCompare++) {
        
        // look for max element
        if (sortedArray[currentIndexToCompare] > maxValue) {
            maxValue = sortedArray[currentIndexToCompare];
          }
      }

      console.log(`curEl: ${currentIndex} maxValue: ${maxValue}`);

      // swap subarray[lastValue] with founded max in unsorted subarray
      let lastValue = sortedArray[sortedArray.length - currentIndex];
      sortedArray[sortedArray.indexOf(maxValue)] = lastValue;
      sortedArray[sortedArray.length - currentIndex] = maxValue;

      console.log(`max of subarray ${sortedArray[sortedArray.length - currentIndex]} sortedArray: ${sortedArray}`);
  }

  return sortedArray;
}

selectionSort(numbers);
console.log(numbers);