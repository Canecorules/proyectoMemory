class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.recordIntentos = []
    }
}

// opciones de las tarjetas

const imagenesArray = [{
        profesion: "abogada",
        imagen: "imagenes/abogada.png"
    },
    {
        profesion: "abogada",
        imagen: "imagenes/abogada.png"
    },
    {
        profesion: "bailarina",
        imagen: "imagenes/bailarina.png"
    },
    {
        profesion: "bailarina",
        imagen: "imagenes/bailarina.png"
    },
    {
        profesion: "bombero",
        imagen: "imagenes/bombero.png"
    },
    {
        profesion: "bombero",
        imagen: "imagenes/bombero.png"
    },
    {
        profesion: "chef",
        imagen: "imagenes/chef.png"
    },
    {
        profesion: "chef",
        imagen: "imagenes/chef.png"
    },
    {
        profesion: "medico",
        imagen: "imagenes/medico.png"
    },
    {
        profesion: "medico",
        imagen: "imagenes/medico.png"
    },
    {
        profesion: "patinadora",
        imagen: "imagenes/patinadora.png"
    },
    {
        profesion: "patinadora",
        imagen: "imagenes/patinadora.png"
    },
    {
        profesion: "policia",
        imagen: "imagenes/policia.png"
    },
    {
        profesion: "policia",
        imagen: "imagenes/policia.png"
    },
    {
        profesion: "presidente",
        imagen: "imagenes/presidente.png"
    },
    {
        profesion: "presidente",
        imagen: "imagenes/presidente.png"
    }
]


//funciones

imagenesArray.sort(() => 0.5 - Math.random())

let grilla = document.querySelector('.grilla')
let resultadoJuego = document.querySelector('#resultado')
let intentos = document.querySelector('#conteoIntentos')
let record = document.querySelector("#recordPersonal")
let listaUsuario = []
let tarjetaElegida = []
let idTarjetaElegida = []
let tarjetasGanadoras = []
let tarjetasEquivocadas = []

//crear tablero

function verificarUsuario() {
    let boton = document.querySelector("#botonVerificar")
    boton.addEventListener("click", () => {
        let nombre = document.getElementById("inputNombre").value.toUpperCase();
        let apellido = document.getElementById("inputApellido").value.toUpperCase(); 
        JSON.parse(localStorage.getItem("usuarioStorage"))       
        let verificacion = listaUsuario.includes(nombre)
        console.log(verificacion)
        if (!verificacion) {
            listaUsuario.push(new Usuario(nombre, apellido));
            localStorage.setItem("usuarioStorage", JSON.stringify(listaUsuario))                    
            crearTablero()
        } else {
            crearTablero()
        }
    })
}   

function crearTablero() {
    for (let i = 0; i < imagenesArray.length; i++) {
        const tarjeta = document.createElement('img')
        tarjeta.setAttribute('src', 'imagenes/color.png')
        tarjeta.setAttribute('id', i)
        tarjeta.addEventListener('click', voltearTarjeta)
        grilla.appendChild(tarjeta)

    }
}

//verificar concuerda
function verificarQueConcuerda() {
    const tarjetas = document.querySelectorAll('img')
    const opcionUnoId = idTarjetaElegida[0]
    const opcionDosId = idTarjetaElegida[1]

    if (opcionUnoId == opcionDosId) {
        tarjetas[opcionUnoId].setAttribute('src', 'imagenes/color.png')
        tarjetas[opcionDosId].setAttribute('src', 'imagenes/color.png')
    } else if (tarjetaElegida[0] === tarjetaElegida[1]) {
        tarjetas[opcionUnoId].setAttribute('src', 'imagenes/blanco.png')
        tarjetas[opcionDosId].setAttribute('src', 'imagenes/blanco.png')
        tarjetas[opcionUnoId].removeEventListener('click', voltearTarjeta)
        tarjetas[opcionDosId].removeEventListener('click', voltearTarjeta)
        tarjetasGanadoras.push(tarjetaElegida)
    } else {
        tarjetas[opcionUnoId].setAttribute('src', 'imagenes/color.png')
        tarjetas[opcionDosId].setAttribute('src', 'imagenes/color.png')
        tarjetasEquivocadas.push(tarjetaElegida)
    }
    tarjetaElegida = []
    idTarjetaElegida = []
    resultadoJuego.textContent = tarjetasGanadoras.length
    intentos.textContent = tarjetasGanadoras.length + tarjetasEquivocadas.length
    let conteoIntentos = tarjetasGanadoras.length + tarjetasEquivocadas.length
    if (tarjetasGanadoras.length === imagenesArray.length / 2) {
        resultadoJuego.textContent = 'Felicitaciones! Has encontrado todas la parejas!'
        listaUsuario[0].recordIntentos.push(conteoIntentos)
        localStorage.setItem("usuarioStorage", JSON.stringify(listaUsuario))        
        // let recordFinal = listaUsuario[0].recordIntentos.sort((a, b) => a - b)
        // record.textContent = recordFinal[0]
        let recordFinal = JSON.parse(localStorage.getItem("usuarioStorage"))
        recordFinal.forEach(element => {
            // let personalRecord = listaUsuario[0].recordIntentos.sort((a, b) => a - b)
            record.innerHTML = `${element.recordIntentos}`
        });

    }
}

//Voltea tu tarjeta
function voltearTarjeta() {
    let idTarjeta = this.getAttribute('id')
    tarjetaElegida.push(imagenesArray[idTarjeta].profesion)
    idTarjetaElegida.push(idTarjeta)
    this.setAttribute('src', imagenesArray[idTarjeta].imagen)
    if (tarjetaElegida.length === 2) {
        setTimeout(verificarQueConcuerda, 500)
    }
}

verificarUsuario()