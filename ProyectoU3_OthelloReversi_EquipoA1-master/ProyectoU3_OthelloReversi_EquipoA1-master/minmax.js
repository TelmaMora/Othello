var board = [];
var currentPlayer = "Black";
var totalRows	= 8; //8
var totalCols 	= 8; //8
var M;
var PW;
var PB;

window.onload = function(){
	var boardElem = document.getElementById('board');
	boardElem.addEventListener("click", metodoTableroClicked, false);
	metodoinitTablero();	
};

function initTablero(){
	var i, j;
	for (i = 1; i <= totalRows; i++){
		$('tbody').append('<tr></tr>');
		for (j = 1; j <= totalCols; j++){
			board[index(i,j)] = null;
			$('tbody tr:nth-child('+i+')').append('<td><div class="square"></div></td>');
		}
	}	
	// board[index(2,2)]='White';
	// board[index(2,3)]='Black';
	// board[index(3,2)]='Black';
	// board[index(3,3)]='White';

	board[index(4,4)]='White';
	board[index(4,5)]='Black';
	board[index(5,4)]='Black';
	board[index(5,5)]='White';

	$('#currentplayer-text').text('Turno de la ficha : '+currentPlayer);
	metodoActualizarPiezaTablero();
	return 0;
}
function crearMatriz(){
	M=[[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0,-1, 1, 0, 0, 0],
	[0, 0, 0, 1,-1, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0]];
	return M;
}
function initPuntuaciones(){
	PW = [[1000,   50,  100,  100,  100,  100,   50, 1000],
	[  50,  -20,  -10,  -10,  -10,  -10,  -20,   50], 
	[ 100,  -10,    1,    1,    1,    1,  -10,  100], 
	[ 100,  -10,    1,    1,    1,    1,  -10,  100], 
	[ 100,  -10,    1,    1,    1,    1,  -10,  100], 
	[ 100,  -10,    1,    1,    1,    1,  -10,  100], 
	[  50,  -20,  -10,  -10,  -10,  -10,  -20,   50], 
	[1000,   50,  100,  100,  100,  100,   50, 1000]];
	PB = [[1000,   50,  100,  100,  100,  100,   50, 1000],
	[  50,  -20,  -10,  -10,  -10,  -10,  -20,   50], 
	[ 100,  -10,    1,    1,    1,    1,  -10,  100], 
	[ 100,  -10,    1,    1,    1,    1,  -10,  100], 
	[ 100,  -10,    1,    1,    1,    1,  -10,  100], 
	[ 100,  -10,    1,    1,    1,    1,  -10,  100], 
	[  50,  -20,  -10,  -10,  -10,  -10,  -20,   50], 
	[1000,   50,  100,  100,  100,  100,   50, 1000]];
	return PW, PB;
}
function actualizarEsquinas(M, PW, PB){
	if M[0][0] == 1{
		PW[0][1] = -50;
		PW[1][0] = -200;
		PW[1][1] = -50;
		PB[0][1] = 100;
		PB[1][0] = 100;
		PB[1][1] = 100;
	}
	if M[0][7] == 1{
		PW[0][6] = -50;
		PW[1][7] = -200;
		PW[1][6] = -50;
		PB[0][6] = 100;
		PB[1][7] = 100;
		PB[1][6] = 100;
	}
	if M[7][0] == 1{
		PW[6][0] = -50;
		PW[6][1] = -200;
		PW[7][1] = -50;
		PB[6][0] = 100;
		PB[6][1] = 100;
		PB[7][1] = 100;
	}
	if M[7][7] == 1{
		PW[7][6] = -50;
		PW[6][7] = -200;
		PW[6][6] = -50;
		PB[7][6] = 100;
		PB[6][7] = 100;
		PB[6][6] = 100;
	}

	if M[0][0] == -1{
		PW[0][1] = 100;
		PW[1][0] = 100;
		PW[1][1] = 100;
		PB[0][1] = -50;
		PB[1][0] = -200;
		PB[1][1] = -50;
	}

	if M[0][7] == -1{
		PW[0][6] = 100;
		PW[1][7] = 100;
		PW[1][6] = 100;
		PB[0][6] = -50;
		PB[1][7] = -200;
		PB[1][6] = -50;
	}

	if M[7][0] == -1{
		PW[6][0] = 100;
		PW[6][1] = 100;
		PW[7][1] = 100;
		PB[6][0] = -50;
		PB[6][1] = -200;
		PB[7][1] = -50;
	}

	if M[7][7] == -1{
		PW[7][6] = 100;
		PW[6][7] = 100;
		PW[6][6] = 100;
		PB[7][6] = -50;
		PB[6][7] = -200;
		PB[6][6] = -50;
	}

	return PW, PB;
}
function actualizarMedios(M, PW, PB){
	for (i = 2; i <= 7; i++){
		if M[0][n] == -1{
			PW[1][n] =  20
			PB[1][n] = -10
		}
		if M[7][n] == -1{
			PW[6][n] =  20 
			PB[6][n] = -10 
		}
		if M[n][0] == -1{
			PW[n][1] =  20 
			PB[n][1] = -10 
		}
		if M[n][7] == -1{
			PW[n][6] =  20 
			PB[n][6] = -10 
		}
		if M[0][n] == 1{
			PW[1][n] = -10 
			PB[1][n] =  20 
		}
		if M[7][n] == 1{
			PW[6][n] = -10 
			PB[6][n] =  20 
		}
		if M[n][0] == 1{
			PW[n][1] = -10 
			PB[n][1] =  20 
		}
		if M[n][7] == 1{
			PW[n][6] = -10 
			PB[n][6] =  20
		}
	}
}
function actualizarMatriz(){
	actualizarEsquinas(M, PW, PB);
	actualizarMedios(M, PW, PB);
}
function localizarPiezasVolteadas(r, c, player, M){
	if M[r][c]=! 0{
		return [];
	}
	totalFlipped = [];
	flipped = [];
	if(c<6 && M[r][c+1]==-player){
		for(n=1; n<9; n++){
			if(c+n > 7 || M[r][c+n] == 0){
				flipped = [];
				break;
			}
			if(M[r][c+n]==player){
				break;
			}
			flipped.push(r);
			flipped.push(c+n);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);

	flipped = [];
	if(r<6 && M[r+1][c]==-player){
		for(n=1; n<9; n++){
			if(r+n > 7 || M[r+n][c] == 0){
				flipped = [];
				break;
			}
			if(M[r+n][c]==player){
				break;
			}
			flipped.push(r+n);
			flipped.push(c);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);


	flipped = [];
	if(r>1 && M[r-1][c]==-player){
		for(n=1; n<9; n++){
			if(r-n < 0 || M[r-n][c] == 0){
				flipped = [];
				break;
			}
			if(M[r-n][c]==player){
				break;
			}
			flipped.push(r-n);
			flipped.push(c);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);


	flipped = [];
	if(c>1 && M[r][c-1]==-player){
		for(n=1; n<9; n++){
			if(c-n < 0 || M[r][c-n] == 0){
				flipped = [];
				break;
			}
			if(M[r][c-n]==player){
				break;
			}
			flipped.push(r);
			flipped.push(c-n);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);


	flipped = [];
	if(r<6 && c<6 && M[r+1][c+1]==-player){
		for(n=1; n<9; n++){
			if((r+n) > 7 || (c+n) >7 || M[r+n][c+n] == 0){
				flipped = [];
				break;
			}
			if(M[r+n][c+n]==player){
				break;
			}
			flipped.push(r+n);
			flipped.push(c+n);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);

	flipped = [];
	if(r>0 && c>0 && M[r-1][c-1]==-player){
		for(n=1; n<9; n++){
			if((r-n) < 0 || (c-n) < 0 || M[r-n][c-n] == 0){
				flipped = [];
				break;
			}
			if(M[r-n][c-n]==player){
				break;
			}
			flipped.push(r-n);
			flipped.push(c-n);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);


	flipped = [];
	if(r>1 && c<6 && M[r+1][c+1]==-player){
		for(n=1; n<9; n++){
			if((r-n) < 0 || (c+n) > 7 || M[r-n][c+n] == 0){
				flipped = [];
				break;
			}
			if(M[r-n][c+n]==player){
				break;
			}
			flipped.push(r-n);
			flipped.push(c+n);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);

	flipped = [];
	if(r < 6 && c > 1 && M[r+1][c-1]==-player){
		for(n=1; n<9; n++){
			if((r+n) > 7 || (c-n) < 0 || M[r+n][c-n] == 0){
				flipped = [];
				break;
			}
			if(M[r+n][c-n]==player){
				break;
			}
			flipped.push(r+n);
			flipped.push(c-n);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);

	return totalFlipped;
}

function puntuacion(M){
	totalB = 0;
	totalN = 0;

	for (r=; r<8; r++){
		for (c=; c<8; c++){
			if(M[r][c]==1){
				totalN+=1;
			}
			if (M[r][c]==-1) {
				totalB+=1;
			}
		}
	}
	return(totalB,totalN);
}
