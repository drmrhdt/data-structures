class Calculator {
  constructor() {
    this.stack = new Stack(),
    this.operators = {
      '^': { precedance: 4, associativity: 'right'},
      '*': { precedance: 3, associativity: 'left'},
      '/': { precedance: 3, associativity: 'left'},
      '+': { precedance: 2, associativity: 'left'},
      '-': { precedance: 2, associativity: 'left'}
    }   
  }

  getTokens(expression) {
    return expression.split(' ');
  }

  infixToPostfix(expression) {

    const tokens = this.getTokens(expression),
          stack = new Stack(), // operators
          queue = new Queue(); // result tokens

    for (let token in tokens) { // while there are tokens to be read do:

      if (isFinite(tokens[token])) queue.enqueue(parseFloat(tokens[token])); //  if the token is a number, then push it to the output queue.
      
      else if (this.operators[tokens[token]]) { // if the token is an operator, then:

        while ((this.operators[stack.peek()] && this.operators[stack.peek()].precedance > this.operators[tokens[token]].precedance  // // while ((there is an operator at the top of the operator stack with greater precedence)
                || this.operators[stack.peek()] && this.operators[stack.peek()].precedance === this.operators[tokens[token]].precedance && this.operators[stack.peek()].associativity === 'left' // or (the operator at the top of the operator stack has equal precedence and is left associative))
                )) queue.enqueue(stack.pop()); // pop operators from the operator stack onto the output queue.
        stack.push(tokens[token]); // push it onto the operator stack.
      }

      else if (tokens[token] === '(') stack.push(tokens[token]); // if the token is "(" push it onto the operator stack.
      
      else if (tokens[token] === ')') { // if the token is ")"
        while (stack.peek() !== '(') { // while the operator at the top of the operator stack is not "(":
          if (!stack.isEmpty()) queue.enqueue(stack.pop()); // pop the operator from the operator stack onto the output queue
          else throw new Error('Mismatched parentheses!'); /* if the stack runs out without finding a left paren, then there are mismatched parentheses. */ 
        }
        if (stack.peek() === '(') stack.pop(); // if there is a "(" at the top of the operator stack pop the operator from the operator stack and discard it
      } else throw new Error(`Unknown action: ${tokens[token]}`);

    }

    
    if (!stack.isEmpty()) { // after while loop, if operator stack not null
        while (!stack.isEmpty()) queue.enqueue(stack.pop()); // pop everything to output queue
    }
        
    const postfix = [];
    while (!queue.isEmpty()) postfix.push(queue.dequeue());
    // console.log(postfix);
    return postfix;
  }

  calculateExpression(expression) {

    const tokens = this.infixToPostfix(expression);

    for (let token in tokens) {
      if (isFinite(tokens[token])) {
        this.stack.push(tokens[token]);
      } 
      else if (this.operators[tokens[token]]) {
        let firstNumber = this.stack.pop(),
            secondNumber = this.stack.pop(),
            subExprResult = this.calculateSubexpression(secondNumber, firstNumber, tokens[token]);
        
        // console.log(`${secondNumber} ${tokens[token]} ${firstNumber}  = ${subExprResult}`);

        this.stack.push(subExprResult);
      }
    }
    return this.stack.pop();
  }

  calculateSubexpression(secondNumber, firstNumber, operator) {
    switch(operator) {
      case '+': return secondNumber + firstNumber; break;
      case '-': return secondNumber - firstNumber; break;
      case '/': return secondNumber / firstNumber; break;
      case '*': return secondNumber * firstNumber; break;
      case '^': return secondNumber ** firstNumber; break;
      default: break;
    }
  }
}

/************ TEST CALCULATOR ************/
// const calculator = new Calculator();
// calculator.calculateExpression('8 * 4 + 2 * ( 5 - 1 )');
// calculator.calculateExpression('( 6 + 10 - 4 ) / ( 1 + 1 * 2 ) + 1');
// calculator.calculateExpression('6 ^ 2 / ( 5 * 3 ) + 10');
// calculator.calculateExpression('3 + 4 * 2 / ( 5 - 1 ) ^ 2 ^ 3');
// calculator.calculateExpression('( ( ( 2 - 3 ) + ( 3 + 2 ) ) - ( 6 - 1 ) )');