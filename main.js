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
  let tower = stacks[startStack].pop()
  stacks[endStack].push(tower)

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {

  let tower = stacks[startStack][stacks[startStack].length - 1]

  

  for(let i =0; i < stacks[endStack].length; i++){

    if(stacks[endStack][i] < tower){

      return false
    }
    
  }

  return true

}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {



  let num = stacks.a.length + stacks.b.length + stacks.c.length
  let count = 0


  for(let i = 0; i < stacks.b.length || i < stacks.c.length; i++){
    if(stacks.b[i] === num || stacks.c[i] === num){
      count ++
    }

    num --
    
  }

  if(count === (stacks.a.length + stacks.b.length + stacks.c.length)){
    console.log("You won")
    return true
  }
  
  return false

}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {



  //takes item at end of stack and assigns to variable before removing it

  //calls is legal to make sure the move is allowed
  if(isLegal(startStack, endStack)){

    //push the stored value on the end stack
    movePiece(startStack, endStack)

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
      stacks = { a: [4], b: [3, 2, 1], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win in both B and C stack', () => {
      stacks = { a: [], b: [], c: [4, 3, 2, 1] };
      assert.equal(checkForWin(), true);
      stacks = { a: [], b: [4, 3], c: [2, 1] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
