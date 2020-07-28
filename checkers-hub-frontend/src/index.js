const boardDiv = document.getElementById('board');

function generateBoard() {
	const boardTable = document.createElement('table');

	for(let i=0; i < 8; i++){
		const newRow = document.createElement('tr')
		newRow.setAttribute('class', `row-${i}`);

		for(let j=0; j < 8; j++){
			const newSquare = document.createElement('td')

			if((i+j)%2 == 0){
				newSquare.setAttribute('class', `square column-${j} black`)
			}
			else{
				newSquare.setAttribute('class', `square column-${j} red`)
			}
			newRow.append(newSquare);
		}
		boardTable.append(newRow);	
	}
	boardDiv.append(boardTable);
}

function placePieces(){

	for(let i = 0; i < 3; i++){
		for(let j = 0; j < 8; j++){
			if((i+j) % 2 == 0){

			}
		}
	}
}

function board(i, j){
	return document.querySelector(`tr.row-${i}`);
}
console.log(board(1,3));

generateBoard();
