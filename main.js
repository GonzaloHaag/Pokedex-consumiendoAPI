const listaPokemon = document.querySelector("#listaPokemon");
let URL = "https://pokeapi.co/api/v2/pokemon/"; //Si luego de la barra pongo un numero, me traera un pokemon

const buttons = document.querySelectorAll(".btn-header");


for(let i=1;i<= 151;i++) { //Los pokemones son 150, por eso debe ser menor a 151,(porque arranca de 1)

    fetch(URL + i) //ira concatenando luego de la barra, el numero de pokemon
     .then((response) => response.json())
     .then(data=>mostrarPokemon(data));


}

function mostrarPokemon(data) { /*Por cada pokemon crearemos un div*/

      let tipos = data.types.map(type=> //El map genera un array a partir de lo que le digamos
       `<p class="${type.type.name} tipo">${type.type.name}</p>` ); //Esto me traera los elementos que contiene ese pokemon(agua,fuego)   let tipos = data.types.map(type=>type.type.name)
       tipos = tipos.join('');
    //   console.log(tipos);
    //  console.log(data);

    let pokeId = data.id.toString(); //Para convertir un numero a string utilizo toString, asi puedo saber la longitud y agregarle 00 adelante
    
    if(pokeId.length == 1) { //Si tiene solo un digito quiero agregarle 00 adelante
        pokeId = "00" + pokeId;
    }
    else if(pokeId.length == 2) { //Si tieen dos numeros, quiero agregar solo un 0, PARA QUE QUEDE 014 POR EJEMPLO
        pokeId = "0" + pokeId;
    }
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemon-id-back">${data.id}</p>
    <div class="pokemon-imagen">
        <img src=${data.sprites.other["official-artwork"].front_default} alt="${data.name}"> 
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">#${pokeId}</p>
            <h2 class="pokemon-nombre">${data.name}</h2>
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${data.height}m</p>
            <p class="stat">${data.weight}kg</p>
        </div>
    </div>

    `; //Como official artwork tiene guion medio, utilizaremos  []
    listaPokemon.append(div);
}


buttons.forEach((boton)=>{
    boton.addEventListener("click",(event)=>{

        const botonId = event.currentTarget.id; //Id de ese boton , que lo declaramos en HTML
        listaPokemon.innerHTML = ''; //Para que se vacie, sino se agregaran abajo
            
        
      for(let i=1;i<= 151;i++) { //Los pokemones son 150, por eso debe ser menor a 151,(porque arranca de 1)

       fetch(URL + i) //ira concatenando luego de la barra, el numero de pokemon
       .then((response) => response.json())
       .then(data=>{

        if(botonId === "ver-todos") { //Si el id es todos, que me muestre todos los pokemones
            mostrarPokemon(data);
        }
        else{ //Sino, hago el filtrado
        const tipos = data.types.map((type)=>type.type.name);

        if(tipos.some(tipo => tipo.includes(boton.id))){ //Buscamos si en esos tipos alguno coincide con el ID del boton que apretamos

            mostrarPokemon(data); //Llamamos a la funcion que muestre solo los que coinciden

        }
    }

       });
    


}


    })
})