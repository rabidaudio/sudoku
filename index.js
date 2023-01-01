function micros(){
  var hrtime = process.hrtime();
  return hrtime[0]*1000000 + hrtime[1]/1000;
}

function measure_time(closure, repeats) {
  var high, low;
  var times = [];
  for(var i =0; i<(repeats||1000); i++){
    var start = micros();
    closure();
    var end = micros();
    var diff = end - start;
    times.push(diff);
    if(!high){
      high = diff;
    }else if(diff > high){
      high = diff;
    }
    if(!low){
      low = diff;
    }else if(diff < low){
      low = diff;
    }
  }
  var sum = times.reduce(function(x,y){ return x+y; }, 0);
  var average = sum / times.length;
  return [low, average, high];
}

var fs = require('fs');
var puzzles = JSON.parse(fs.readFileSync('puzzles.json').toString());

// Puzzle interface:
// function that takes a 2D array of int values or null in row-column form
// should return a tuple of
//    a count of the steps required to solve the puzzle
//    the solved puzzle (or null if unsolvable)
// Input is a fresh copy of puzzle so it can be mutated

var solver1 = require('./simple');

var keys = Object.keys(puzzles);
keys.forEach(function(key){
  var puzzleCopy = JSON.parse(JSON.stringify(puzzles[key]));
  console.log(key, measure_time(function(){
    solver1(puzzleCopy);
  }), solver1(puzzleCopy));
});