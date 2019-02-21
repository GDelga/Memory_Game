/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {

	var tablero = [];
	var cartasEncontradas = 0;
	var volteadas = 0;
	var mensaje = "¡Empieza el Juego!";
	var carta = null;
	var idCarta = -1;
	var ejecutando = false;

	this.initGame = function() {
		var nombreCartas = ["8-ball",
		"potato",
		"dinosaur",
		"kronos",
		"rocket",
		"unicorn",
		"guy",
		"zeppelin"]
		var cartaActual = 0;
		var cont = 0;
		for(var i = 0; i < 16; ++i) {
			tablero.push(new MemoryGameCard(nombreCartas[cartaActual]));
			cont++;
			if(cont == 2) {
				cont = 0;
				cartaActual++;
			}
		}
		console.log(tablero);
		tablero.sort(function() {
			return Math.random() - 0.5;
		})

		this.loop();
	}

	this.draw = function() {
		gs.drawMessage(mensaje);
		for(var i = 0; i < 16; ++i) {
			tablero[i].draw(gs, i);
		}
	}

	this.loop = function() {
		setInterval(this.draw, 16);
	}

	this.onClick = function(cardId) {
		if(!ejecutando) {
			tablero[cardId].flip();
			volteadas++;
			if(volteadas == 1) {
				carta = tablero[cardId];
				idCarta = cardId;
			}
			else if(volteadas == 2) {
				volteadas = 0;
				if(cardId != idCarta) {
					if(tablero[cardId].compareTo(carta) === true) {
						carta.found();
						tablero[cardId].found();
						cartasEncontradas++;
						if(cartasEncontradas == 8) mensaje = "¡Has ganado!";
						else mensaje = "¡Has acertado!";
					}
					else {
						ejecutando = true;
						setTimeout(function(){
							carta.flip();
							tablero[cardId].flip();
							mensaje = "¡Has fallado!"
							ejecutando = false;
						},1000);
					}
				}
				else {
					mensaje = "¡Sigue jugando!";
				}
			}
		}
	}
};


/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {//Esta clase representa una carta
	var estado = "boca_abajo";
	this.nombre = id;

	this.flip = function() {
		if(estado == "boca_abajo") {
			estado = "boca_arriba";
		}
		else if(estado == "boca_arriba") {
			estado = "boca_abajo";
		}
	}

	this.found = function() {
		estado = "encontrado";
	}

	this.compareTo = function(otherCard) {
		if(this.nombre == otherCard.nombre) {
			return true;
		}
		else return false;
	}

	this.draw = function(gs, pos) {
		if(estado == "boca_abajo") {
			gs.draw("back", pos);
		}
		else gs.draw(this.nombre, pos);
	}


};
