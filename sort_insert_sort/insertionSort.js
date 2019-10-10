function insertionSort(arrayToSort) {
  let sortedArray = arrayToSort.slice();
  
  // check every element in unsorted array
  for (let currentIndex = 1; currentIndex < sortedArray.length; currentIndex++) {
      
      // choose cur element (start with array[1]) and compare it with subarray until that element
      for (let currentIndexToCompare = currentIndex; currentIndexToCompare > 0; currentIndexToCompare--) {

        // compare cur element with previous element
        if (sortedArray[currentIndexToCompare] < sortedArray[currentIndexToCompare - 1]) {

          // if cur > prev --> swap them
          let currentValue = sortedArray[currentIndexToCompare];
          sortedArray[currentIndexToCompare] = sortedArray[currentIndexToCompare - 1];
          sortedArray[currentIndexToCompare - 1] = currentValue;
          }
      }

      // console.log(`curEl: ${currentIndex} sorted array: ${sortedArray}`);
  }
  return sortedArray;
}