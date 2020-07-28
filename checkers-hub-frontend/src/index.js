const boardDiv = document.getElementById('board');
const startButton = document.getElementById('start');
const gameObject= {
	whoseTurn: 'black',
	selectedPiece: -1
	
};

function startGame() {
	placePieces();
	startButton.setAttribute('class', 'off')
}

function generateBoard() {
	const boardTable = document.createElement('table');

	for(let i=0; i < 8; i++){
		const newRow = document.createElement('tr')
		newRow.setAttribute('class', `row-${i}`);

		for(let j=0; j < 8; j++){
			const newSquare = document.createElement('td')

			if((i+j)%2 == 0){
				newSquare.setAttribute('class', `square row-${i} column-${j} black`)
			}
			else{
				newSquare.setAttribute('class', `square row-${i} column-${j} red`)
			}
			newRow.append(newSquare);
		}
		boardTable.append(newRow);	
	}
	boardDiv.append(boardTable);
	startButton.addEventListener('click', e => {
		if(startButton.className === 'on') {
			startGame();
		}
	})
}

function placePieces(){
	let k = 0;
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 8; j++){
			if((i+j) % 2 == 0){
				placePiece(i, j, 'red', k);
				placePiece(7-i, 7-j, 'black', k + 1);
				k += 2;
			}
		}
	}
}

function placePiece(row, column, color, pieceNumber){
	const piece = document.createElement('div');
	piece.setAttribute('class', `piece ${color}`);
	piece.dataset.id = pieceNumber;
	board(row, column).append(piece);
}

function board(i, j){
	return document.querySelector(`tr.row-${i} td.column-${j}`);
}

function selectPiece(){
	boardDiv.addEventListener('click', (e) => { 
		if(e.target.classList.contains('piece')){
			displayPossibleLocations();
		}
	})
}

function displayPossibleLocations(){
	//display yellow circles on legal move spaces
}

function makeMovable(event){
}

function movePiece(){
}
//select piece(div class piece black)



generateBoard();
selectPiece();
const squares = Array.from(document.querySelectorAll('td'))
const blackSquares = Array.from(document.querySelectorAll('.square.black'))

