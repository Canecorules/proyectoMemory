class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre
        this.apellido = apellido
        this.recordIntentos = -1
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
let listaUsuario = []
let tarjetaElegida = []
let idTarjetaElegida = []
let tarjetasGanadoras = []
let tarjetasEquivocadas = []


function infoStorage() {
    let listaUsuario = JSON.parse(localStorage.getItem("usuarioStorage"))
    if (listaUsuario == null) {
        return []
    }
    return listaUsuario
}

function modificarStorage(lista) {
    localStorage.setItem("usuarioStorage", JSON.stringify(lista))
}

function verificarRecord(nuevoRecord, nombreUsuario) {
    let listastorage = infoStorage()
    if (buscarUsuario(nombreUsuario, listastorage) == true) {
        for (const usuario of listastorage) {
            if (usuario.nombre == nombreUsuario) {
                if (usuario.recordIntentos == -1) {
                    usuario.recordIntentos = nuevoRecord
                    modificarStorage(listastorage)
                } else if (usuario.recordIntentos > nuevoRecord) {
                    usuario.recordIntentos = nuevoRecord
                    modificarStorage(listastorage)
                }
            }
        }
    }
}

function buscarUsuario(nombreUsuario, lista) {
    for (const usuario of lista) {
        if (usuario.nombre == nombreUsuario) {
            return true
        }
    }
    return false
}

function mejorRecord(nombre) {
    let listastorage = infoStorage()
    let record
    for (const usuario of listastorage) {        
        if (usuario.nombre == nombre) {
            record = usuario.recordIntentos
        }
    }
    return record
}

//verificar si el usuario existe
function verificarUsuario() {
    let boton = document.querySelector("#botonVerificar")
    boton.addEventListener("click", () => {
        let nombre = document.getElementById("inputNombre").value.toUpperCase();
        let apellido = document.getElementById("inputApellido").value.toUpperCase();
        let storageList = infoStorage()
        let verificacion = buscarUsuario(nombre, storageList)
        !verificacion?storageList.push(new Usuario(nombre, apellido))&&modificarStorage(storageList)&&crearTablero():crearTablero()     
    })
}
//crear tablero
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
    let name = document.getElementById("inputNombre").value.toUpperCase();    
    if (tarjetasGanadoras.length === imagenesArray.length / 2) {
        verificarRecord(conteoIntentos, name)
        Swal.fire({
            title: 'Felicitaciones! Has encontrado todas la parejas',
            text:   'Tu record personal son:'+ mejorRecord(name) +" "+'intentos',
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/imagenes/images.png)', 
            backgroundSize: "cover",                                   
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://24.media.tumblr.com/901e8a124f307a1c1f45d4232d72970d/tumblr_mrfdktBp6G1sfn296o1_400.gif")
              left top
              no-repeat            `
          })

    }
}

//Voltea tu tarjeta
function voltearTarjeta() {
    let idTarjeta = this.getAttribute('id')
    tarjetaElegida.push(imagenesArray[idTarjeta].profesion)
    idTarjetaElegida.push(idTarjeta)
    this.setAttribute('src', imagenesArray[idTarjeta].imagen)
    tarjetaElegida.length === 2&&setTimeout(verificarQueConcuerda, 500)    
}

verificarUsuario()