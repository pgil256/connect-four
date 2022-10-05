const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; 
let board = []; 

function makeBoard() {
  for (let y=0; y<HEIGHT; y++){
     board.push(Array.from({length: WIDTH}));
  }  
  return board;
}
//Here we create a for loop which creates an array matrix with a height that is equal to our previously defined HEIGHT variable
//We then use the array method push to create an empty erray inside of each previously defined HEIGHT array. Each sub array has a length equal to the previously defined WIDTH variable.

function makeHtmlBoard() {
  const htmlBoard= document.getElementById('board');
  //Creates a newly defined variable htmlBoard which we retrieve from the DOM and set equal to the table element with an ID of of 'board.'

  const top = document.createElement("tr");
  //creates table row in DOM

  top.setAttribute("id", "column-top");
  //gives top variable an id of column-top

  top.addEventListener("click", handleClick);
  //ties an event listener to top element activated by a click

  for (let x = 0; x < WIDTH; x++) {
    //for loop iterates through array 'WIDTH' times;

    const headCell = document.createElement("td");
    // defines cell in table

    headCell.setAttribute("id", x);
    //sets id attribute for each index;

    top.append(headCell);
    //appends cell to top of to table row "tr"
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {
    //for loop that iterates through row 'HEIGHT' times

    const row = document.createElement("tr");
    //creates row element for gameboard

    for (let x = 0; x < WIDTH; x++) {
      // for loop that iterates through array 'width' times;

      const cell = document.createElement("td");
      //creates table cell withing row variable

      cell.setAttribute("id", `${y}-${x}`);
      //sets the id of that particular cell based on the table's y-x coordinates

      row.append(cell);
      //appends the cell elements to the row elements
    }
    htmlBoard.append(row);
    //appends each row to the everall html board

  }
}


function findSpotForCol(x) {
  for (let y=HEIGHT-1; y>=0; y--){
    if (!board[y][x]){
      return y;
    } 
  } 
  return null;
      //For loop retuns through each array starting from the bottom
      //If board[y][x] is not true (doesn't contain a value), we return it's y coordinate
      //If every cell of that column cointains a value, return null     
  }   


function placeInTable(y, x) {
  const divForGamePiece= document.createElement('div');
  divForGamePiece.classList = "piece";
  divForGamePiece.classList.add(`p${currPlayer}`);
  const currentSpot=document.getElementById(`${y}-${x}`);
  currentSpot.append(divForGamePiece);
  //creates variable divForGamePiece to be append to each cell.
  //Applies the classlist "piece" and currPlayer1/2 to each div
  //Creates a variable that is set equal to the particular cell of table called upon
  //Appends new div to that newly made cell variable
}
  
function endGame(msg) {
  if (checkForWin() || msg==='Tie!'){
    alert(msg)
  }
}
//Boolean allows message to be passed as alert if CheckForWin or tie-checking method returns from handleClick

function handleClick(evt) {
  const x = +evt.target.id;
  //retrieves column that was clicked in top row

  const y = findSpotForCol(x);
  if (y===null) {
    return;
  }
  //If findSpotForColumn returns null (meaning each cell is filled), the function returns and click is essentially ignored

  board[y][x]=currPlayer;
  placeInTable(y, x);
  //Sets the current cell equal to the currPlayer variable
  //Runs placeInTable and assigns div to correct location on board

  
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }
  //Runs alert message if checkForWin runs and returns true


  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }
  //Arrow function uses every protype on every row of board, and every cell of row.
  // If 'cell' passing through each cell returns true (meaning not null), then board is full, and "Tie" alert message is passed through endGame function.
  // TODO: switch currPlayer 1 <-> 2

currPlayer = currPlayer === 1 ? 2 : 1;
 //Redefines current player with boolean expression.
 //If currPlayer is equal to 1, is set to 2. Otherwise, it is set to one 1.
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all assigned to particular currPlayer
    //  - cells: list of four (y, x) cells
    //  - returns true if all are adjacent coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  } //iterates through all cells of game board, sees if they are associated with player 1 or 2

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //Iterates through all cells using for loop through each array then each cell
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //Iterates through each horizontal line. 
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //Iterates through each vertical line. 
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //Iterates through all potential positive slope diagonal lines. As Y increases X increases.
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //Iterates through all postential negativeslope diagonal lines. As Y increases X decreases.

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      } // if any of the four possible conditions are deemed true, it returns a win
    }
  }
}

makeBoard();
makeHtmlBoard();
