const boardDiv = document.getElementById('board');
const startButton = document.getElementById('start');

function startGame() {
	placePieces();

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
		startGame();
	})
}

function placePieces(){
	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 8; j++){
			if((i+j) % 2 == 0){
				placePiece(i, j, 'red');
				placePiece(7-i, 7-j, 'black');
			}
		}
	}
}

function placePiece(row, column, color){
	const piece = document.createElement('div');
	piece.setAttribute('class', `piece ${color}`);
	board(row, column).append(piece);
}

function board(i, j){
	return document.querySelector(`tr.row-${i} td.column-${j}`);
}

generateBoard();
