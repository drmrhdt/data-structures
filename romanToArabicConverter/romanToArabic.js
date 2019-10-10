/************** algorithm for WHOLE NUMBER 
 * If it's tail's node we add the last triplet to amount
 * if it's not tail's node, we add current node
 ***************/

function romanToArabic(romanNumber) {

  const number = romanNumber.split(''),
    list = createAndFillDoubleList(number),
    dict = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
    },
    numbers = [10, 100, 1000]

  let amount = 0,
    tripletAmount = 0,
    triplets = new Map(),
    output = { number: romanNumber },
    evaluations = [],
    node = list.head;

  if (list.length === 1) {
    output.amount = dict[node.value];
    output.triplets = triplets.set('No triplets', 0);
    return output;

  } 
  else if (list.length === 2) {
    if (numbers.includes(dict[node.value] + dict[node.next.value])) {
      output.error = 'ERROR';
      return output;
    } 
    else if (dict[node.value] < dict[node.next.value]) {
      output.amount = dict[node.next.value] - dict[node.value];
      output.triplets = triplets.set('No triplets', 0);
      return output;
    }
    else {
      output.amount = dict[node.next.value] + dict[node.value];
      output.triplets = triplets.set('No triplets', 0);
      return output;
    }
  } 
  else if (list.length > 2) {
    while (node.next) {

      // don't stop on head and tail, currentNode on start is 1
      if (node.prev && node.next) {

        /***** CHECK GRAMMAR *****/
        // wrong: if value + value = 10/100/1000 ('VV/LL/DD')
        // wrong: or (value1 === value1) < value2 (f.e. 'XXL')
        // wrong: or unknown letter 
        // wrong: 'IIII'
        if (numbers.includes((dict[node.prev.value] + dict[node.value])) ||
          numbers.includes((dict[node.value] + dict[node.next.value])) ||
          node.value === node.prev.value &&
          dict[node.value] < dict[node.next.value] ||
          !dict[node.prev.value] ||
          !dict[node.value] ||
          !dict[node.next.value] ||
          romanNumber.includes('IIII')) {
            output.error = 'ERROR';
            return output;
          }

        /***** GETTING TRIPLETS and whole number (amount) *****/
        // value2 < value3 ('IX')
        else if (dict[node.next.value] > dict[node.value])
          tripletAmount = dict[node.next.value] - dict[node.value];
        // value2 > value3 ('XI') or value2 === value3 ('XX')
        else if (dict[node.next.value] < dict[node.value] || dict[node.next.value] === dict[node.value])
          tripletAmount = dict[node.next.value] + dict[node.value];

        // value1 < value2
        if (dict[node.value] > dict[node.prev.value]) {
          tripletAmount -= dict[node.prev.value];

          // 1. If it's tail's node we add the last triplet to amount
          if (node.next === list.tail) {
            evaluations.push(`tail: ${amount} + ${tripletAmount} = ${amount + tripletAmount}`);
            amount += tripletAmount;
          } else {
            // 2. if it's not head's/tail's node, we substract current node
            evaluations.push(`${amount} - ${dict[node.prev.value]} = ${amount - dict[node.prev.value]}`);
            amount -= dict[node.prev.value];
          }
        }
        // 4. value1 < value2 ('IX') or value1 == value2 ('XX')
        else if (dict[node.value] < dict[node.prev.value] || dict[node.value] === dict[node.prev.value]) {
          tripletAmount += dict[node.prev.value];

          // 1. If it's tail's node we add the last triplet to amount
          if (node.next === list.tail) {
            evaluations.push(`tail: ${amount} + ${tripletAmount} = ${amount + tripletAmount}`);
            amount += tripletAmount;
          } else {
            if (node.next.next) {
              // 2 if it's not head's/tail's node, we add current node
              evaluations.push(`${amount} + ${dict[node.prev.value]} = ${amount + dict[node.prev.value]}`);
              amount += dict[node.prev.value];
            }
          }
        }

        triplets.set(node.prev.value + node.value + node.next.value, tripletAmount);

        // if (list.length === 3) {
          // amount = tripletAmount;
        // }

      }

      node = node.next;
    }
  }

  /***** LAST CHECK *****/
  // wrong: roman number can't be more than 3999
  if (amount >= 4000) {
    output.error = 'ERROR';
    return output;
  }
  else {
    output.amount = amount,
    output.triplets = triplets,
    output.evaluations = evaluations
    return output;
  }
}

let tests = ['CDLXXVII', 'IIIV', 'VIII', 'II', 'XI', 'I', 'MIX', 'VV', 'XX', 'XXL', 'III', 'MMMCMXCX', 'IIII', 'CLL', 'IIIV', 'AXX', 'MMMM', 'MMMCMXCIX', 'MMMCMXCV', 'XXXIX'];
// tests = ['MMMCMXCIX'];
tests.map(test => romanToArabic(test));