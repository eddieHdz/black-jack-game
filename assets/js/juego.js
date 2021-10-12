const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // referencias a html
    const btnPedir = document.querySelector("#btnPedir"),
        btnDetener = document.querySelector("#btnDetener"),
        btnNuevo = document.querySelector("#btnNuevo");

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntos = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntos.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }


    // esta funcion crea un nuevo deck
    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }
        return _.shuffle(deck);
    }

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'El deck no tiene cartas';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }

    //turno : 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntos[turno].innerText = puntosJugadores[turno];

        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    const evaluarGanador = () => {

        const [puntosMinimos, puntosComp] = puntosJugadores;

        setTimeout(() => {
            if (puntosComp === puntosMinimos) {
                alert('Fin del juego, empate');
            } else if (puntosMinimos > 21) {
                alert('Fin del juego, la computadora gana');
            } else if (puntosComp > 21) {
                alert('Felicidades has ganado');
            } else {
                alert('Fin del juego, la computadora gana');
            }
        }, 100);
    }

    //turno de la computadora

    const turnoComputadora = (puntosMinimos) => {
        let puntosComp = 0;
        do {
            const carta = pedirCarta();
            puntosComp = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while ((puntosComp < puntosMinimos) && puntosMinimos <= 21);

        evaluarGanador();
    }

    //evento al dar click en el boton pedir carta
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    // evento al dar click en el boton detener

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugadores[0]);
    });

    /* btnNuevo.addEventListener('click', () => { 
        inicializarJuego();
    }); */

    return {
      nuevoJuego: inicializarJuego  
    };

})();



