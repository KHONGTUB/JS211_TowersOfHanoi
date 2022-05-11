'use strict';

const assert = require('assert');
const compareSolution = require('javascripting/lib/compare-solution');
const readline = require('readline');
const { start } = require('repl');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Next, what do you think this function should do?
const movePiece = (startStack, endStack) => {
  //pops number from array and then pushes onto different array
  let tower = stacks[startStack].pop()
  stacks[endStack].push(tower)

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {

  //set variable tower to item at last index
  let tower = stacks[startStack][stacks[startStack].length - 1]

  
  //for loop to loop through the endstack
  for(let i =0; i < stacks[endStack].length; i++){

    //if statement to prevent move if piece wanting to be moved is greater than any piece in endstack
    if(stacks[endStack][i] < tower){
      //returns false meaning move is illegal
      return false
    }
    
  }
  //return true meaning move is legal
  return true

}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {



  //set num to total number of items in all 3 arrays and the counter to zero
  let num = stacks.a.length + stacks.b.length + stacks.c.length
  let count = 0


  //for loop to loop through both stacks b and c
  for(let i = 0; i < stacks.b.length || i < stacks.c.length; i++){

    //if statement saying that if item in current index is equal to number increase counter
    if(stacks.b[i] === num || stacks.c[i] === num){
      count ++
    }

    num --
    
  }

  //if statement saying that if count is equal to total numbers in the arrays then a win has been detected
  if(count === (stacks.a.length + stacks.b.length + stacks.c.length)){
    return true
  }
  
  return false

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {



  //takes item at end of stack and assigns to variable before removing it

  //calls is legal to make sure the move is allowed
  if(isLegal(startStack, endStack)){

    //push the stored value on the end stack and then checks for win
    movePiece(startStack, endStack)
    checkForWin()

  }


}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      if(checkForWin()){
        console.log("You Won!")
        printStacks()
      }else{
        getPrompt();
      }

    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [4], b: [3, 2, 1], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win in both B and C stack', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
    });
  });
  describe('#towersOfHanoi()', () => {
    it('should be able to move a block backwards', () => {
      stacks = {
        a: [],
        b: [4, 3, 2, 1],
        c: []
      }
      towersOfHanoi('b', 'a');
      assert.deepEqual(stacks, { a: [1], b: [4, 3, 2], c: [] });
    });
  });
  describe('#checkForWin()', () => {
    it('should not detect a win with correct sequence in different stacks', () => {
      stacks = { a: [], b: [4, 3], c: [2, 1] };
      assert.equal(checkForWin(), false);
      stacks = { a: [4, 3], b: [2, 1], c: [] };
      assert.equal(checkForWin(), false);
      stacks = { a: [4], b: [3], c: [2, 1] };
      assert.equal(checkForWin(), false);
      stacks = { a: [], b: [4], c: [3, 2, 1] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
