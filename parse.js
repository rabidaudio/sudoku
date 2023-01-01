var fs = require('fs');
var puzzles = {};
var rootDir = 'sudoku.app/Contents/MacOS/examples';

fs.readdirSync(rootDir).forEach(function(name,i,a){
  if(name === '.DS_Store'){
    return;
  }
  puzzles[name] = [];
  for(var i=0;i<9;i++){
    puzzles[name][i] = [null,null,null,null,null,null,null,null,null];
  }
  console.log(name);
  fs.readFileSync(rootDir+'/'+name).toString().split("\n").forEach(function(e,i,a){
    matches = e.match(/v\(([0-9]),([0-9]),([0-9])\)\./);
    if(matches){
      var value = parseInt(matches.pop(), 10);
      var col = parseInt(matches.pop(), 10) - 1;
      var row = parseInt(matches.pop(), 10) - 1;
      console.log(row, col, value);
      puzzles[name][row] = puzzles[name][row] || [];
      puzzles[name][row][col] = value;
    }
  });

});

fs.writeFileSync('puzzles.json', JSON.stringify(puzzles, null, '\t'));