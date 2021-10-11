let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0, puntosComp = 0;

// referencias a html
const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntos = document.querySelectorAll('small');

// esta funcion crea un nuevo deck
const crearDeck = () => {
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
    deck = _.shuffle(deck);
}

crearDeck()
console.log(deck);

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'El deck no tiene cartas';
    }
    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
    /* let puntos = 0;
    (isNaN(valor))?puntos = (valor === 'A' ? 11 : 10):puntos = valor * 1; */
}

//turno de la computadora

const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComp = puntosComp + valorCarta(carta);
        puntos[1].innerText = puntosComp;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if (puntosMinimos > 21) {
            break;
        }
    } while ((puntosComp < puntosMinimos) && puntosMinimos <= 21);

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

//evento al dar click en el boton pedir carta
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntos[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

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
    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    deck = [];
    crearDeck();
    puntos[0].innerText = 0;
    puntos[1].innerText = 0;
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';
    puntosJugador = 0;
    puntosComp = 0;

});
