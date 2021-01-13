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
var tab2=[[0,8,16,24,32,40,48,56],
[1,9,17,25,33,41,49,57],
[2,10,18,26,34,42,50,58],
[3,11,19,27,35,43,51,59],
[4,12,20,28,36,44,52,60],
[5,13,21,29,37,45,53,61],
[6,14,22,30,38,46,54,62],
[7,15,23,31,39,47,55,63]];

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
		var x = e.clientX;
	    var y = e.clientY;
	    var tirada = false;

	    var elementClicked = document.elementFromPoint(x, y);
	    var index = $('.cuadrado').index(elementClicked);

	    var cuadrado = metodoRowColTablero(index);
	    var row = cuadrado[0];
	    var col = cuadrado[1];

	    if (tablero[index]!= null){		
			alert("Elemento del tablero ya en uso");
	    }
	    else{//Son if, ya que al tirar verifica las que se voltean a los 8 direciones
	    	if (metodoRevisarTirada(row, col, 'arriba',jugadorActual))//				🡩
	    		tirada = true;		
	    	if (metodoRevisarTirada(row, col, 'abajo',jugadorActual))//				🡣
			    tirada = true;
			if (metodoRevisarTirada(row, col, 'izquierda',jugadorActual))//			🡠
			    tirada = true;
			if (metodoRevisarTirada(row, col, 'derecha',jugadorActual))//				🡢
				tirada = true;			
			if (metodoRevisarTirada(row, col, 'diagonal_izq_arriba',jugadorActual))//		🡤
			    tirada = true;
			if (metodoRevisarTirada(row, col, 'diagonal_der_abajo',jugadorActual))//		🡦
			    tirada = true;
			if (metodoRevisarTirada(row, col, 'diagonal_der_arriba',jugadorActual))//		🡥
			    tirada = true;
			if (metodoRevisarTirada(row, col, 'diagonal_izq_abajo',jugadorActual))//		🡧
				tirada = true;
	    	if (tirada){
	    		tablero[index]=jugadorActual;
	    		metodoActualizarPiezaTablero();
	    		jugadorActual = metodoCambiarGamer(jugadorActual);
				$('#idturnoGamer').text('Turno de la ficha : '+jugadorActual);
				actualizarPuntuaciones();
				if (jugadorActual=="White") {
					turnoMaquina();
				}

				metodoRevisar_Winner();
	    	}
	    	else{
				console.log('Movimiento invalido')
				$('#idturnoGamer').text('Tirada no valida: '+jugadorActual);
	    	}
	    }
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


function ubicarPiezas(r, c, player, M){
	var aux2=[];
	if(M[r][c] != null) {
		return [];
	}        
	var totalFlipped =   []               
	var flipped = [];
	var j=metodoCambiarGamer(player);
	if(c < 6 && M[r][c+1] == j){
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
	if(r < 6 && M[r+1][c] == j){
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
	if(r > 1 && M[r-1][c] == j){
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
	if(c > 1 && M[r][c-1] == j){
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
	if(r < 6 && c < 6 && M[r+1][c+1] == j){
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
	if(r > 0 && c > 0 && M[r-1][c-1] == j){
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
	if(r > 1 && c < 6 && M[r-1][c+1] == j){
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
	if(r < 6 && c > 1 && M[r+1][c-1] == j){
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
	tabaux2=tablero;
	var maux=[];
	var smatriz=[];
	for (var x = 0; x < 8; x++) {
		for (var y = 0; y < 8; y++) {
			maux.push(tabaux2[tab[x][y]]);
		}
		smatriz.push(maux);
		maux=[];
	}
	jugadaMaquina(smatriz);
	
}
function jugadaMaquina(matriz){
	console.log(matriz," En jugada Maquina");
	
	var movimiento = minimaxPrueba(matriz);
	var index=tab[movimiento[0]][movimiento[1]];
	tablero[index]=jugadorActual;
	for (var i=0; i<movimiento[2].length; i++){
		var row=movimiento[2][i][1];
		var col=movimiento[2][i][0];
	tablero[tab[col][row]] = jugadorActual;
	}
	metodoActualizarPiezaTablero();
	jugadorActual = metodoCambiarGamer(jugadorActual);
	$('#idturnoGamer').text('Turno de la ficha : '+jugadorActual);
	actualizarPuntuaciones();

}

function minimaxPrueba(mtz){
	var movs=getMoves("White", mtz);
	var tabaux=[];
	var scores=[];
	for(var i=0; i<movs.length; i++){
		scores.push(0);
	}
	var alpha = Number.NEGATIVE_INFINITY;
	var beta = Number.POSITIVE_INFINITY;
	for(var j=0; j<movs.length; j++){
		copiarTablero = fakeMove(movs[j][0],movs[j][1],movs[j][2], "White", mtz);
		scores[j]=maxMove(copiarTablero, 1, alpha, beta, PW, PB);
	}

	maxIndex=scores.indexOf(Math.max(...scores));
	console.log(movs[maxIndex]);
	return movs[maxIndex];

}

function getMoves(jugador, M){
	var movimientos=[];
	var aux=[];
	var piezas=[];
	var row;
	var col;
	for(var i=0; i<8; i++){
		for(j=0;j<8;j++){
			row=i;
			col=j;
			if (M[row][col]== null){	
				piezas=ubicarPiezas(row,col,jugador,M);
		    	if(piezas.length!=0){
		    		aux=[row,col,piezas];
		    		movimientos.push(aux);
		    	}
		    }
		}
	}
	
	return movimientos;
}


function maxMove(board, depth, alpha, beta, PW, PB){
	console.log("Max")
	var moves=getMoves("White",board);
	var scores=[];
	var puntuaciones=[];
	var dcm1 = jQuery.extend(true, {}, board);
	var ret
	for(var i=0; i<moves.length; i++){
		scores.push(0);
	}
	if(moves.length==0){
		if(depth<=MAXDEPTH){
			return minMove(board, depth+1, alpha, beta, PW, PB);
		}
		else{
			return puntuacionesTab(board, PW, PB);
		}
	}

	for(var j=0; j<moves.length; j++){
		copiarTablero = fakeMove(moves[j][0],moves[j][1],moves[j][2], "White", dcm1);
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
			scores[j] = minMove(copiarTablero,depth+1,alpha,beta,PW,PB);
			
			if (scores[j]>alpha) {
				alpha=scores[j];
			}
			if (beta<=alpha) {
				return scores[i];
			}
		}
	}
	console.log("scores max",scores);
	ret=Math.max(...scores);
	console.log("ret max",ret);
	return ret;
}	

function minMove(board, depth, alpha, beta, PW, PB){
	console.log("min");
	var moves=getMoves("Black",board);
	var scores1=[];
	var puntuaciones=[];
	var dcm2 = jQuery.extend(true, {}, board);
	var ret=[];
	for(var i=0; i<moves.length; i++){
		scores1.push(0);
	}
	if(moves.length==0){
		if(depth<=MAXDEPTH){
			return maxMove(board, depth+1, alpha, beta, PW, PB)
		}
		else{
			return puntuacionesTab(board, PW, PB)
		}
	}

	for(var j=0; j<moves.length; j++){
		copiarTablero = fakeMove(moves[j][0],moves[j][1],moves[j][2], "Black", dcm2);
		puntuaciones=actualizarEsquinas(copiarTablero,PW,PB);
		PW=puntuaciones[0];
		PB=puntuaciones[1];
		puntuaciones=actualizarMedios(copiarTablero,PW,PB);
		PW=puntuaciones[0];
		PB=puntuaciones[1];
		if (depth>=MAXDEPTH) {
			scores1[j] = puntuacionesTab(copiarTablero, PW, PB);
		}
		else{
			scores1[j] = maxMove(copiarTablero,depth+1,alpha,beta,PW,PB);
			if (beta>scores1[j]) {
				beta = scores1[j];
			}
			if (beta<=alpha) {
				return scores1[j];
			}
		}
	}
	console.log("scores min",scores1);
	ret=Math.min(...scores1);
	console.log("ret min",ret);
	return ret;
}	
function puntuacionesTab(M, PW, PB){
	var totalC = 0
	var totalH = 0
	var auxc=0
	var total=0;
	for(var j=0; j<8; j++){
		for (var i = 0; i < 8; i++) {
			if(M[i][j] == "White"){
			totalC = totalC+PW[auxc];
			}
			if(M[j][i] == "Black"){
				totalH = totalH+PB[auxc];
			}
			auxc++;
		}
		
	}
	total=totalC - totalH
	return  total;
}
function fakeMove(r,c,volteadas, player, M){
	var dcm = jQuery.extend(true, {}, M);
	var opuestas;
	if(dcm[r][c] == null){ 
		dcm[r][c] = player;
		opuestas=true;
		for(var j = 0; j < volteadas.length; j++){
			dcm[volteadas[j][0]][volteadas[j][1]] = player;
		}
	}
	else{
		return dcm;
	}
	return dcm;


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