
// function group(row, col){
//   return 3*(Math.floor(row/3)) + Math.floor(col/3);
// }

Array.prototype.flatten = function(){ return [].concat.apply([], this); };

// These are not super efficient....

function getValuesForRow(r, puzzle){
  return puzzle[r].filter(function(x){ return x.length == 1; }).flatten();
}
function getValuesForColumn(c, puzzle){
  return puzzle.map(function(r){ return r[c]; }).filter(function(x){ return x.length == 1; }).flatten();
}

function getValuesForGroup(r, c, puzzle){
  var gr = Math.floor(r/3);
  var gc = Math.floor(c/3);
  return puzzle.filter(function(rows, i){ return Math.floor(i/3)===gr; }).map(function(row){
    return row.filter(function(e,i){ return Math.floor(i/3)===gc; });
  }).flatten().filter(function(x){ return x.length == 1; }).flatten();
}

function isSolved(puzzle){
  return puzzle.flatten().filter(function(x){ return x.length != 1; }).length === 0;
}

function simplify(puzzle){
  return puzzle.map(function(x){
    return x.map(function(y){
      return y.length == 1 ? y[0] : null;
    });
  });
}

var ALL_POSSIBILITIES = [1,2,3,4,5,6,7,8,9];

function solve(puzzle){
  // setup
  for(var i=0; i<9;i++){
    for(var j=0;j<9;j++){
      if(puzzle[i][j]){
        puzzle[i][j] = [ puzzle[i][j] ];
      }else{
        puzzle[i][j] = ALL_POSSIBILITIES;
      }
    }
  }

  var iterations = 0;
  var reductions;
  do {
    reductions = 0;
    puzzle = puzzle.map(function(columns, i){ // for each row
      return columns.map(function(possibilities, j){ // for each column
        if(possibilities.length === 1){
          return possibilities;
        }
        var exclude = [
          getValuesForRow(i, puzzle),
          getValuesForColumn(j, puzzle),
          getValuesForGroup(i,j,puzzle)
        ].flatten();
        var newValue = ALL_POSSIBILITIES.filter(function(e){
          return exclude.indexOf(e) < 0;
        });
        if(newValue.length < possibilities.length){
          reductions++;
        }
        return newValue;
      });
    });
    iterations++;
  }while(!isSolved(puzzle) && reductions > 0);

  return [iterations, isSolved(puzzle)];
}

module.exports = solve;