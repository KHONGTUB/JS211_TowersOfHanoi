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
const movePiece = () => {


}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {

  let tower = stacks[startStack].pop()
  

  for(let i =0; i < stacks[endStack].length; i++){
    if(stacks[endStack][i] < tower){
      console.log("illegal move")
      return false
    }
    
  }

  return true

}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {

  let num = 4

  let count = 0


  for(let i = 0; i < stacks.b.length; i++){
    if(stacks.b[i] === num){
      count ++
    }

    num --
    
  }


  if(count === 4){
    return true
  }
  
  return false

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {


  let index = (stacks[startStack].length - 1)



  let tower = stacks[startStack][index]
  console.log(tower)
  //takes item at end of stack and assigns to variable before removing it

  //calls is legal to make sure the move is allowed
  if(isLegal(startStack, endStack)){



    console.log("Went into is legal statement")



    //push the stored value on the end stack
    stacks[endStack].push(tower)
  }


}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
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
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
