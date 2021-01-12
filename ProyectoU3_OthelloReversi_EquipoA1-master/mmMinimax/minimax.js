var tablero 		= [];
var jugadorActual 	= "Black"; //Gamer que inicia
var totalRows	= 8; //8
var totalCols 	= 8; //
var PB = [];
var Pw = [];
var arrayVoltearPiezas = [];
var MAXDEPTH = 2;
var tab=[[0,1,2,3,4,5,6,7],
[8,9,10,11,12,13,14,15],
[16,17,18,19,20,21,22,23],
[24,25,26,27,28,29,30,31],
[32,33,34,35,36,37,38,39],
[40,41,42,43,44,45,46,47],
[48,49,50,51,52,53,54,55],
[56,57,58,59,60,61,62,63]];

window.onload = function(){
	var tableroElem = document.getElementById('tablero');
	
		tableroElem.addEventListener("click", metodoTableroClicked, false);
	metodoinitTablero();
}

function metodoinitTablero(){	
	for (var i = 1; i <= totalRows; i++){
		$('tbody').append('<tr></tr>');
		for (var j = 1; j <= totalCols; j++){
			tablero[index(i, j)] = null;
			$('tbody tr:nth-child('+i+')').append('<td><div class="cuadrado"></div></td>');
		}
	}		

	tablero[index(4,4)]='White';
	tablero[index(4,5)]='Black';
	tablero[index(5,4)]='Black';
	tablero[index(5,5)]='White';

	$('#idturnoGamer').text('Turno de la ficha : '+jugadorActual);
	metodoActualizarPiezaTablero();	
	definirPuntuaciones();
}

function metodoTableroClicked(e){
	if (jugadorActual=="Black") {
		var movimiento = minimax(jugadorActual);
		var index=movimiento[0];
		
		var row=movimiento[1][0][0];
		var col=movimiento[1][0][1];
		tablero[index]=jugadorActual;
		tablero[tab[col][row]] = jugadorActual;
		metodoActualizarPiezaTablero();
		jugadorActual = metodoCambiarGamer(jugadorActual);

		$('#idturnoGamer').text('Turno de la ficha : '+jugadorActual);
		$('#instruccion').text('Da click sobre el tablero para que la maquina elija su jugada');
		actualizarPuntuaciones();
	}
}


function metodoRevisarTirada(row, col, orientacion, jugador){
	var tirada = true;
	var cambiarGamer = metodoCambiarGamer(jugador);
	arrayVoltearPiezas = [];
	while (tirada){
		if (orientacion == 'arriba')
			row--;
		else if (orientacion == 'abajo')
			row++;
		else if (orientacion == 'izquierda')
			col--;
		else if (orientacion == 'derecha')
			col++;
		else if (orientacion == 'diagonal_izq_arriba'){			 
			col--;
			row--;
		}
		else if (orientacion == 'diagonal_der_abajo'){			
			col++;
			row++;
		}			
		else if (orientacion == 'diagonal_der_arriba'){						
			col++;
			row--;
		} 
		else if (orientacion == 'diagonal_izq_abajo'){			
			col--; 
			row++;
		}

		var i = index(row, col);
		if (i == null) 
			return false;
		else if (tablero[i] == cambiarGamer){
			arrayVoltearPiezas.push(i);
		}
		else
			tirada = false;
	}
	if (arrayVoltearPiezas.length > 0 && jugadorActual=="Black"){
		if (tablero[i] == jugadorActual){ 
			metodoarrayVoltearPiezas(arrayVoltearPiezas);
			return true;
		}
	}
	return false;
}

function metodoarrayVoltearPiezas(arrayVoltearPiezas){
	for (var i = 0; i < arrayVoltearPiezas.length; i++){
		tablero[arrayVoltearPiezas[i]] = jugadorActual;
	}
	return 0;
}

function metodoActualizarPiezaTablero(){
	for (var i = 1; i <= totalRows; i++){
		for (var j=1; j <= totalCols; j++){
			if (tablero[index(i,j)] == "Black"){
				$('tbody tr:nth-child('+i+') :nth-child('+j+') :nth-child(1)').html('<div class="black"></div>');
			}
			if (tablero[index(i,j)] == "White"){
				$('tbody tr:nth-child('+i+') :nth-child('+j+') :nth-child(1)').html('<div class="white"></div>');
			}
		}
	}
	//return 0;
}

function metodoCambiarGamer(jugador){
	if (jugador== 'White')
		return 'Black';
	else 
		return 'White';
}

function convertir(tablero){
	var aux=[];
	var aux1=[];
	var aux2=[];
	var aux3=[];
	var aux4=[];
	var aux5=[];
	var aux6=[];
	var aux7=[];
	var M=[];
	for(var i=0; i<8;i++){
		aux.push(tablero[i]);
	}
	M.push(aux);
	for(var i=8; i<16;i++){
		aux1.push(tablero[i]);
	}
	M.push(aux1);
	for(var i=16; i<24;i++){
		aux2.push(tablero[i]);
	}
	M.push(aux2);
	for(var i=24; i<32;i++){
		aux3.push(tablero[i]);
	}
	M.push(aux3);
	for(var i=32; i<40;i++){
		aux4.push(tablero[i]);
	}
	M.push(aux4);
	for(var i=40; i<48;i++){
		aux5.push(tablero[i]);
	}
	M.push(aux5);
	for(var i=48; i<56;i++){
		aux6.push(tablero[i]);
	}
	M.push(aux6);
	for(var i=56; i<64;i++){
		aux7.push(tablero[i]);
	}
	M.push(aux7);
	return M;

}

function ubicarPiezas(r, c, player, M){
	aux2=[];

	if(M[r][c] != null) {
		return [];
	}        
	totalFlipped =   []               
	flipped = [];
	if(c < 6 && M[r][c+1] == metodoCambiarGamer(player)){
		for(var n=1; n<9; n++){
			if(c+n > 7 || M[r][c+n] == null){
				flipped = [];
				break;
			}
			if(M[r][c+n] == player) {break;}
			aux2=[r,c+n];
			flipped.push(aux2); 
		}
		
	}
	totalFlipped=totalFlipped.concat(flipped);

	flipped = [];
	if(r < 6 && M[r+1][c] == metodoCambiarGamer(player)){
		for(var n=1; n<9; n++){
			if(r+n > 7 || M[r+n][c] == null){
				flipped = [];
				break;
			}
			if(M[r+n][c] == player) {break;}
			aux2=[r+n,c];
			flipped.push(aux2);
		}
	
	}
	totalFlipped=totalFlipped.concat(flipped);

	flipped = [];
	if(r > 1 && M[r-1][c] == metodoCambiarGamer(player)){
		for(var n=1; n<9; n++){
			if(r-n < 0 || M[r-n][c] == null){
				flipped = [];
				break;
			}
			if(M[r-n][c] == player) {break;}
			aux2=[r-n,c];
			flipped.push(aux2);
		}
	
	}
	totalFlipped=totalFlipped.concat(flipped);


	flipped = [];
	if(c > 1 && M[r][c-1] == metodoCambiarGamer(player)){
		for(var n=1; n<9; n++){
			if(c-n < 0 || M[r][c-n] == null){
				flipped = [];
				break;
			}
			if(M[r][c-n] == player) {break;}
			aux2=[r,c-n];
			flipped.push(aux2);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);


	flipped = [];
	if(r < 6 && c < 6 && M[r+1][c+1] == metodoCambiarGamer(player)){
		for(var n=1; n<9; n++){
			if((r+n) > 7 || (c+n) > 7 || M[r+n][c+n] == null){
				flipped = [];
				break;
			}
			if(M[r+n][c+n] == player) {break;}
			aux2=[r+n,c+n];
			flipped.push(aux2);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);


	flipped = [];
	if(r > 0 && c > 0 && M[r-1][c-1] == metodoCambiarGamer(player)){
		for(var n=1; n<9; n++){
			if((r-n) < 0 || (c-n) < 0 || M[r-n][c-n] == null){
				flipped = [];
				break;
			}
			if(M[r-n][c-n] == player) {break;}
			aux2=[r-n,c-n];
			flipped.push(aux2);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);

	flipped = [];
	if(r > 1 && c < 6 && M[r-1][c+1] == metodoCambiarGamer(player)){
		for(var n=1; n<9; n++){
			if((r-n) < 0 || (c+n) > 7 || M[r-n][c+n] == null){
				flipped = [];
				break;
			}
			if(M[r-n][c+n] == player) {break;}
			aux2=[r-n,c+n];
			flipped.push(aux2);
		}	
	}
	totalFlipped=totalFlipped.concat(flipped);
		


	flipped = [];
	if(r < 6 && c > 1 && M[r+1][c-1] == metodoCambiarGamer(player)){
		for(var n=1; n<9; n++){
			if((r+n) > 7 || (c-n) < 0 || M[r+n][c-n] == null){
				flipped = [];
				break;
			}
			if(M[r+n][c-n] == player) {break;}
			aux2=[r+n,c-n];
			flipped.push(aux2);
		}
	}
	totalFlipped=totalFlipped.concat(flipped);
	

	return totalFlipped;
}


function turnoMaquina(){
	var movimiento = minimax(jugadorActual);
	var index=movimiento[0];
	
	var row=movimiento[1][0][0];
	var col=movimiento[1][0][1];
	tablero[index]=jugadorActual;
	tablero[tab[col][row]] = jugadorActual;
	metodoActualizarPiezaTablero();
	jugadorActual = metodoCambiarGamer(jugadorActual);
	$('#idturnoGamer').text('Turno de la ficha : '+jugadorActual);
	actualizarPuntuaciones();
}

function getMoves(jugador, tablero){
	var movimientos=[];
	var aux=[];
	var piezas=[];
	var M = convertir(tablero);
	for(var index = 0; index < 64; index++){
		var cuadrado = metodoRowColTablero(index);
	    var row = cuadrado[1]-1;
	    var col = cuadrado[0]-1;
	    if (tablero[index]== null){	
	    	piezas=ubicarPiezas(row,col,jugador,M);
	    	if(piezas.length!=0){
	    		aux=[index,piezas];
	    		movimientos.push(aux);
	    	}
	    }

	}
	return movimientos;
}




function minimax(jugador){
	var movs=getMoves(jugador, tablero);
	var scores=[];
	for(var i=0; i<movs.length; i++){
		scores.push(0);
	}
	for(var j=0; j<movs.length; j++){
		copiarTablero = fakeMove(movs[j], "White", jQuery.extend(true, {}, tablero));
		scores[j]=maxMove(copiarTablero, 1, PW, PB);

	}
	maxIndex=scores.indexOf(Math.max(...scores));
	return movs[maxIndex];
}


function maxMove(board, depth, PW, PB){
	var moves=getMoves("White",board)
	var scores=[];
	var puntuaciones=[];
	for(var i=0; i<=moves.length; i++){
		scores.push(0);
	}
	if(moves.length==0){
		if(depth<=MAXDEPTH){

			return minMove(board, depth+1, PW, PB);
		}
		else{
			return puntuacionesTab(board, PW, PB);
		}
	}

	for(var j=0; j<moves.length; j++){
		copiarTablero = fakeMove(moves[j], "White", jQuery.extend(true, {}, board));
		console.log("max bc:",copiarTablero);
		puntuaciones=actualizarEsquinas(copiarTablero,PW,PB);
		PW=puntuaciones[0];
		PB=puntuaciones[1];
		puntuaciones=actualizarMedios(copiarTablero,PW,PB);
		PW=puntuaciones[0];
		PB=puntuaciones[1];
		if (depth>=MAXDEPTH) {

			scores[j] = puntuacionesTab(copiarTablero, PW, PB);
			
		}
		else{
			scores[j] = minMove(copiarTablero,depth+1,PW,PB);
			
		}
	}
	console.log(scores);
	return Math.max(...scores);
}	

function minMove(board, depth, PW, PB){
	var moves=getMoves("Black",board);
	var scores=[];
	var puntuaciones=[];
	for(var i=0; i<=moves.length; i++){
		scores.push(0);
	}
	if(moves.length==0){
		if(depth<=MAXDEPTH){
			return maxMove(board, depth+1, PW, PB)
		}
		else{
			return puntuacionesTab(board, PW, PB)
		}
	}

	for(var j=0; j<moves.length; j++){
		copiarTablero = fakeMove(moves[j], "Black", jQuery.extend(true, {}, board));
		
		puntuaciones=actualizarEsquinas(copiarTablero,PW,PB);
		PW=puntuaciones[0];
		PB=puntuaciones[1];
		puntuaciones=actualizarMedios(copiarTablero,PW,PB);
		PW=puntuaciones[0];
		PB=puntuaciones[1];
		if (depth>=MAXDEPTH) {
			scores[j] = puntuacionesTab(copiarTablero, PW, PB);
			
		}
		else{
			scores[j] = maxMove(copiarTablero,depth+1,PW,PB);
			
		}
	}
	
	return Math.min(...scores);
}	
function puntuacionesTab(M, PW, PB){
	totalC = 0
	totalH = 0
	for(var j=0; j<64; j++){
		if(M[j] == "White"){
			totalC += PW[j];
		}
		if(M[j] == "Black"){
			totalH += PB[j];
		}
	}
	return  totalC - totalH;
}
function fakeMove(movimiento, player, M){
	var p=movimiento[0];
	var volteadas=movimiento[1];
	var row=0;
	var col=0;
	if(M[p] == null){ 
		M[p] = player;
		opuestas = true;
		for(var i=0; i<volteadas.length; i++){
			row=volteadas[i][0];
			col=volteadas[i][1];
			if (M[tab[col][row]]==player) {
				opuestas=false;
				return M;
			}
			else{
				M[tab[col][row]] = player;
			}
		console.log("op",opuestas);
		}
		
	}
	else{
		return M;
	}
	return M;
}

function definirPuntuaciones(){
	PW = [1000,   50,  100,  100,  100,  100,   50, 1000,
	50,  -20,  -10,  -10,  -10,  -10,  -20,   50, 
	100,  -10,    1,    1,    1,    1,  -10,  100,
	100,  -10,    1,    1,    1,    1,  -10,  100,
	100,  -10,    1,    1,    1,    1,  -10,  100,
	100,  -10,    1,    1,    1,    1,  -10,  100,
	50,  -20,  -10,  -10,  -10,  -10,  -20,   50,
	1000,   50,  100,  100,  100,  100,   50, 1000];
	PB = jQuery.extend(true, {}, PW);
	return [PW, PB];
}

function actualizarEsquinas(M, PW, PB){
	if(M[0] == "Black"){
		PW[1] = -50;
		PW[8] = -200;
		PW[9] = -50;
		PB[1] = 100;
		PB[8] = 100;
		PB[9] = 100;
	}

	if(M[7] == "Black"){
		PW[6] = -50;
		PW[15] = -200;
		PW[14] = -50;
		PB[6] = 100;
		PB[15] = 100;
		PB[14] = 100;
	}

	if(M[56] == "Black"){
		PW[48] = -50;
		PW[49] = -200;
		PW[57] = -50;
		PB[48] = 100;
		PB[49] = 100;
		PB[57] = 100;
	}
	if(M[63] == "Black"){
		PW[62] = -50;
		PW[55] = -200;
		PW[54] = -50;
		PB[62] = 100;
		PB[55] = 100;
		PB[54] = 100;
	}
	if(M[0] == "White"){
		PW[1] = 100;
		PW[8] = 100;
		PW[9] = 100;
		PB[1] = -50;
		PB[8] = -200;
		PB[9] = -50;
	}
	if(M[7] == "White"){
		PW[6] = 100;
		PW[15] = 100;
		PW[14] = 100;
		PB[6] = -50;
		PB[15] = -200;
		PB[14] = -50;
	}
	if(M[56] == "White"){
		PW[48] = 100;
		PW[49] = 100;
		PW[57] = 100;
		PB[48] = -50;
		PB[49] = -200;
		PB[57] = -50;
	}

	if(M[63] == "White"){
		PW[62] = 100;
		PW[55] = 100;
		PW[54] = 100;
		PB[62] = -50;
		PB[55] = -200;
		PB[54] = -50;
	}

	return[PW, PB];
}
function actualizarMedios(M, PW, PB){
	if(M[2]== "White"){
		PW[10] =  20;
		PB[10] = -10;
	}
	if(M[3]== "White"){
		PW[11] =  20;
		PB[11] = -10;
	}
	if(M[4]== "White"){
		PW[12] =  20;
		PB[12] = -10;
	}
	if(M[5]== "White"){
		PW[13] =  20;
		PB[13] = -10;
	}
	if(M[58] == "White"){
		PW[50] =  20;
		PB[50] = -10;
	}
	if(M[59]== "White"){
		PW[51] =  20;
		PB[51] = -10;
	}
	if(M[60]== "White"){
		PW[52] =  20;
		PB[52] = -10;
	}
	if(M[61]== "White"){
		PW[53] =  20;
		PB[53] = -10;
	}
	if(M[16] == "White"){
		PW[17] =  20;
		PB[17] = -10;
	}
	if(M[24]== "White"){
		PW[25] =  20;
		PB[25] = -10;
	}
	if(M[32]== "White"){
		PW[33] =  20;
		PB[33] = -10;
	}
	if(M[40]== "White"){
		PW[41] =  20;
		PB[41] = -10;
	}

	if(M[23] == "White"){
		PW[22] =  20;
		PB[22] = -10;
	}
	if(M[31]== "White"){
		PW[30] =  20;
		PB[30] = -10;
	}
	if(M[39]== "White"){
		PW[38] =  20;
		PB[38] = -10;
	}
	if(M[47]== "White"){
		PW[46] =  20;
		PB[46] = -10;
	}


	if(M[2]== "Black"){
		PW[10] = -10;
		PB[10] =  20;
	}
	if(M[3]== "Black"){
		PW[11] = -10;
		PB[11] =  20;
	}
	if(M[4]== "Black"){
		PW[12] = -10;
		PB[12] =  20;
	}
	if(M[5]== "Black"){
		PW[13] = -10;
		PB[13] =  20;
	}
	if(M[58] == "Black"){
		PW[50] = -10;
		PB[50] =  20;
	}
	if(M[59]== "Black"){
		PW[51] = -10;
		PB[51] =  20;
	}
	if(M[60]== "Black"){
		PW[52] = -10;
		PB[52] =  20;
	}
	if(M[61]== "Black"){
		PW[53] = -10;
		PB[53] =  20;
	}
	if(M[16] == "Black"){
		PW[17] = -10;
		PB[17] =  20;
	}
	if(M[24]== "Black"){
		PW[25] = -10;
		PB[25] =  20;
	}
	if(M[32]== "Black"){
		PW[33] = -10;
		PB[33] =  20;
	}
	if(M[40]== "Black"){
		PW[41] = -10;
		PB[41] =  20;
	}

	if(M[23] == "Black"){
		PW[22] = -10;
		PB[22] =  20;
	}
	if(M[31]== "Black"){
		PW[30] = -10;
		PB[30] =  20;
	}
	if(M[39]== "Black"){
		PW[38] = -10;
		PB[38] =  20;
	}
	if(M[47]== "Black"){
		PW[46] = -10;
		PB[46] =  20;
	}
	return[PW, PB];
}

function actualizarPuntuaciones() {
	actualizarEsquinas(tablero, PW, PB)
	actualizarMedios(tablero, PW, PB)
}


function index(row, col){ //indice del elemento en el tablero array, basado en las columnas y filas	
	if (row < 1 || col < 1)
		return null;	
	var arrayIndex = (row - 1) * totalRows + col - 1;	
	return arrayIndex;
}

function metodoRowColTablero(index){//extraer col y row del index
	var row = Math.ceil((index + 1) / totalRows);
	var col = (index + 1) % totalCols;
	if (col == 0)
		col = 8;
	return [row, col];
}

function metodoRevisar_Winner(){	
	var contadorWhite 	= 0;
	var contadorBlack 	= 0;
	var contadorVacios	= -1;
	//alert(tablero);
	for (var z = 0; z <= tablero.length; z++){
		if (tablero[z] == 'White'){contadorWhite++;}
		else if (tablero[z] == 'Black'){contadorBlack++;}
		else{contadorVacios++;}
	}
	if (contadorVacios == 0){
		if (contadorWhite > contadorBlack)
			winner = 'White';
		else if (contadorWhite < contadorBlack)
			winner = 'Black';
		else if (contadorWhite == contadorBlack)
			winner = 'EMPATE!';
		else
			winner = '@error';
		
		$('#idturnoGamer').text("WINNER: "+winner);
		$('#idwhite').text("White: "+contadorWhite);
		$('#idblack').text("Black: "+contadorBlack);
		alert("WINNER");		
	}		
}