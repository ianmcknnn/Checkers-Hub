const boardDiv = document.getElementById('board');
const startButtons = document.querySelector('#startbuttons');
const backButton = document.getElementById('back');
const twoPlayerButton = document.getElementById('2player');
const onePlayerButton = document.getElementById('1player');
const body = document.querySelector(".body")
const scoreBoard = document.querySelector('.scoreBoard');
let blackScore = document.querySelector("#blackScore")
let redScore = document.querySelector("#redScore")
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const mainHolder = document.getElementById("main-holder")
const logIn = document.getElementById('login')
const mainForm = document.getElementById('main-form')

// logIn.addEventListener('click', e => {
// 	mainHolder.dataset.hidden = 'false'
// })

function renderForm() {
	mainForm.dataset.hidden = 'false'
}

let gameObject = {
	whoseTurn: 'black',
	selectedPiece: null,
	boardArray: [[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null]],
	pieceLocations: {},
	gameInProgress: false,
	legalMoves: [],
	updatedSquares: [],
	moves: [],
	captures: [],
	score: { red: 12, black: 12 },
	onePlayer: 'false'
};

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "Diego" && password === "flatiron" || username ==="Ian" && password === "flatiron") {
        alert("You have successfully logged in.");
        location.reload();
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})

twoPlayerButton.addEventListener('click', e => {
	if (!gameObject.gameInProgress) {
		startGame();
	}
})

onePlayerButton.addEventListener('click', e => {
	if (!gameObject.gameInProgress) {
		startOnePlayerGame();
	}
})

backButton.addEventListener('click', e => {
	destroyGame();
	backButton.dataset.hidden = 'true';
	startButtons.dataset.hidden = 'false';
	scoreBoard.dataset.hidden = 'true';
})

function startGame() {
	startButtons.dataset.hidden = 'true';
	backButton.dataset.hidden = 'false';
	scoreBoard.dataset.hidden = 'false';
	generateBoard();
	placePieces();
	gameObject.gameInProgress = true;
	startListener();
	body.classList.remove('body')
	body.classList.add('inGame')
}

function startOnePlayerGame() {
	startGame();

}

function generateBoard() {
	//creates and appends divs to the board, determining
	//correct color with math magic
	const boardTable = document.createElement('table');
	boardTable.id = 'gameboard';

	for (let i = 0; i < 8; i++) {
		const newRow = document.createElement('tr')
		newRow.dataset.row = i;

		for (let j = 0; j < 8; j++) {
			const newSquare = document.createElement('td')

			if ((i + j) % 2 == 0) {
				newSquare.setAttribute('class', `square black`)
			}
			else {
				newSquare.setAttribute('class', `square red`)
			}
			newSquare.dataset.row = i;
			newSquare.dataset.column = j;
			newRow.append(newSquare);
		}
		boardTable.append(newRow);
	}
	boardDiv.append(boardTable);

	//activate start button once the board exists

}

function destroyGame() {
	document.getElementById('gameboard').remove();
	gameObject = {
		whoseTurn: 'black',
		selectedPiece: null,
		boardArray: [[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null],
		[null, null, null, null, null, null, null, null]],
		pieceLocations: {},
		gameInProgress: false,
		legalMoves: [],
		updatedSquares: [],
		moves: [],
		captures: [],
		score: { red: 12, black: 12 }
	}
}

function placePieces() {
	let k = 0;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 8; j++) {
			//check if square is black using math magic
			if ((i + j) % 2 == 0) {
				//place pieces on black squares starting
				//from each end of board
				placePiece(i, j, 'red', k);
				placePiece(7 - i, 7 - j, 'black', k + 1);
				//k identifies pieces uniquely
				//k parity aligns with piece color
				k += 2;
			}
		}
	}
}

function placePiece(row, column, color, pieceNumber) {
	//create a new piece div and append to the board
	const piece = document.createElement('div');
	piece.setAttribute('class', `piece ${color}`);
	piece.dataset.id = pieceNumber;
	board(row, column).append(piece);

	//track new piece in gameObject
	gameObject.boardArray[row][column] = pieceNumber.toString();
	gameObject.pieceLocations[pieceNumber] = [row.toString(), column.toString()];
}

function board(i, j) {
	//converts coordinates into an existing 
	//square on the board for easy modification
	return document.querySelector(`[data-row='${i}'] [data-column='${j}']`);
}

function startListener() {
	//start listening for click events on the board
	document.addEventListener('click', (e) => {
		//first branch: a piece is clicked of the color whose turn 
		//it is. track this piece in gameObject and call getLegalMoves
		if (e.target.classList.contains('piece') &&
			e.target.classList.contains(gameObject.whoseTurn)) {
			gameObject.selectedPiece = e.target.dataset['id'];
			clearPossibilities();
			displayLegalMoves(gameObject.pieceLocations[gameObject.selectedPiece]);
		}
		else if (gameObject.selectedPiece) {
			if (gameObject.legalMoves.find(array => equalArrays(array, getCoordinates(e.target)))) {
				movePiece(getCoordinates(e.target));
				clearPossibilities();
				gameObject.legalMoves = [];
			}
			else {
				clearPossibilities();
				clearSelected();
			}
		}
	})
}

function equalArrays(array1, array2) {
	return JSON.stringify(array1) == JSON.stringify(array2);
}

function getCoordinates(squareDiv) {
	//return coordinate array of a given board square	
	return [squareDiv.dataset.row, squareDiv.dataset.column];
}

function displayLegalMoves(coordArray) {
	//display yellow circles on legal move spaces
	if (gameObject.legalMoves) {
		gameObject.legalMoves = [];
	}
	getLegalMoves(coordArray, true);
	for (let square of gameObject.legalMoves) {
		const boardSquare = board(...square);
		displayPossibility(boardSquare);
	}
}

function displayPossibility(boardSquare) {
	boardSquare.dataset.legal = 'true';
}

function clearPossibilities() {
	for (let move of gameObject.legalMoves) {
		clearPossibility(move);
	}
}

function clearSelected(){
	gameObject.selectedPiece = null;
}

function clearPossibility(coordArray) {
	board(...coordArray).dataset.legal = 'false';
}

function getLegalMoves(coordArray, beforeJump) {
	//determine which moves are legal from the selected coordinates
	if (beforeJump) {
		gameObject.legalMoves = [];
		let { boardArray, legalMoves } = gameObject;
		const squares = squaresInFront(coordArray);
		for (let square of squares) {
			if (boardArray[square[0]][square[1]]) {
				if (parseInt(boardArray[square[0]][square[1]]) % 2 != parseInt(boardArray[coordArray[0]][coordArray[1]]) % 2) {
					jumpHandler(coordArray, square);
				}
			}
			else {
				legalMoves.push(square);
			}
		}
	}
	//	else{
	//		let{boardArray} = gameObject;
	//		const squares = squaresInFront(coordArray);
	//		for(let square of squares){
	//			if(boardArray[square[0]][square[1]]){
	//				if(parseInt(boardArray[square[0]][square[1]]) % 2 != parseInt(boardArray[coordArray[0]][coordArray[1]]) % 2) {
	//					jumpHandler(coordArray, square);
	//				}
	//			}
	//		}
	//	}
}

function onBoard(coordArray) {
	return (coordArray[0] >= 0 && coordArray[1] <= 7 && coordArray[1] >= 0 && coordArray[1] <= 7);
}

function jumpHandler(coordArray, square) {
	const next = nextInDiagonal(coordArray, square);
	if (onBoard(next) && isEmpty(next)) {
		gameObject.legalMoves.push(next);
		gameObject.captures.push([next, square]);
		getLegalMoves(next, false);
	}
}

function nextInDiagonal(coordArray0, square0) {
	const coordArray = [parseInt(coordArray0[0]), parseInt(coordArray0[1])];
	const square = [parseInt(square0[0]), parseInt(square0[1])];

	if (coordArray[0] < square[0]) {
		if (coordArray[1] < square[1]) {
			return ([(square[0] + 1).toString(), (square[1] + 1).toString()])
		}
		else if (coordArray[1] > square[1]) {
			return ([(square[0] + 1).toString(), (square[1] - 1).toString()])
		}
	}
	else if (coordArray[0] > square[0]) {
		if (coordArray[1] < square[1]) {
			return ([(square[0] - 1).toString(), (square[1] + 1).toString()])
		}
		else if (coordArray[1] > square[1]) {
			return ([(square[0] - 1).toString(), (square[1] - 1).toString()])
		}
	}
}

function isEmpty(coordArray) {
	return !gameObject.boardArray[coordArray[0]][coordArray[1]];
}

function movePiece(coordArray) {
	const { boardArray, selectedPiece, pieceLocations, updatedSquares } = gameObject;
	updatedSquares.from = pieceLocations[selectedPiece];
	updatedSquares.to = coordArray;
	renderUpdate();
}
//select piece(div class piece black)

function removePiece(coordArray) {
	board(...coordArray).childNodes[0].remove();
	gameObject.boardArray[coordArray[0]][coordArray[1]] = null;
}

function renderUpdate() {
	//place piece according to gameObject data
	//remove previous instance of selected piece
	//update gameObject to reflect changes
	let { updatedSquares, whoseTurn, selectedPiece } = gameObject;
	let { to, from } = updatedSquares;
	placePiece(to[0], to[1], whoseTurn, selectedPiece);
	removePiece([from[0], from[1]]);
	if (whoseTurn === 'black') {
		gameObject.whoseTurn = 'red';
	}
	else {
		gameObject.whoseTurn = 'black';
	}
	let toBeRemoved = gameObject.captures.find(pair => equalArrays(pair[0], to));
	if (toBeRemoved) {
		removePiece(toBeRemoved[1]);
		if (whoseTurn === 'black') {
			gameObject.score['red'] -= 1;
			redScore.innerText = gameObject.score['red'];
		}
		else {
			gameObject.score['black'] -= 1;
			blackScore.innerText = gameObject.score['black'];
		}

	}
	gameObject.captures = [];
	gameObject.moves.push([from, to])
	gameObject.selectedPiece = null;
	gameObject.updatedSquares = [];

}

function squaresInFront(coordArray) {
	//returns array of coordinate arrays of the squares
	//diagonally adjacent to coordArray in front
	let { whoseTurn, pieceLocations } = gameObject

	if (whoseTurn === 'black') {
		if (coordArray[0] == 0) {
			return [];
		}
		else if (coordArray[1] == 0) {
			return [[(parseInt(coordArray[0]) - 1).toString(), (parseInt(coordArray[1]) + 1).toString()]];
		}
		else if (coordArray[1] == 7) {
			return [[(parseInt(coordArray[0]) - 1).toString(), (parseInt(coordArray[1]) - 1).toString()]];
		}
		else {
			return [[(parseInt(coordArray[0]) - 1).toString(), (parseInt(coordArray[1]) + 1).toString()],
			[(parseInt(coordArray[0]) - 1).toString(), (parseInt(coordArray[1]) - 1).toString()]];
		}
	}
	else {
		if (coordArray[0] == 7) {
			return [];
		}
		else if (coordArray[1] == 0) {
			return [[(parseInt(coordArray[0]) + 1).toString(), (parseInt(coordArray[1]) + 1).toString()]];
		}
		else if (coordArray[1] == 7) {
			return [[(parseInt(coordArray[0]) + 1).toString(), (parseInt(coordArray[1]) - 1).toString()]];
		}
		else {
			return [[(parseInt(coordArray[0]) + 1).toString(), (parseInt(coordArray[1]) + 1).toString()],
			[(parseInt(coordArray[0]) + 1).toString(), (parseInt(coordArray[1]) - 1).toString()]];
		}
	}

}

function openSlideout(){
	document.getElementById('userslideout').style.width = '250px';
}

function closeSlideout(){
	document.getElementById('userslideout').style.width = '0px';
}


const squares = Array.from(document.querySelectorAll('td'))
const blackSquares = Array.from(document.querySelectorAll('.square.black'))

