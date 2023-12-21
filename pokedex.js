const main$$ = document.querySelector('main') 

const carga$$ = document.querySelector('.lds-roller')

const getPokemones = async () =>{
  const pokemonesFuentes = []

  for (let i = 1; i < 152; i++) {

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + i)
    const resolve = await response.json();
    
    pokemonesFuentes.push(resolve)

  }
  return pokemonesFuentes
}

/*Recibo los 150 pokemones de la pokeapi*/ 

const pokemonesSinMapear = (pokemones) => {

  const pokemonesMapeados = pokemones.map((pokemon) => ({
    nombre: pokemon.name,
    id: pokemon.id,
    tipos: pokemon.types.map((type) => type.type.name).join(", "),
    stats: pokemon.stats.map((stat) => stat.stat.name + ": " + stat.base_stat).join("\n"),
    fotoGrande: pokemon.sprites.other['official-artwork']['front_default'],
    fotoPequeña: pokemon.sprites.front_default
   }))
   return pokemonesMapeados
}

/*Mapeo los 150 pokemones para tener las propiedades que me interesan de cada uno de ellos*/

const pintarPokemones = (pokemonesMapeados) => {

main$$.innerHTML = ""
        
    for (const pokemon of pokemonesMapeados) {
        
        let divPokemon$$ = document.createElement('div')
        let divTexto$$ = document.createElement('div')
        let divFlipCard$$ = document.createElement('div')
        let divFlipCardInner$$ = document.createElement('div')
        let divFlipCardBack$$ = document.createElement('div')

        let imagenGrande$$ = document.createElement('img')
        let imagenPequeña$$ = document.createElement('img')
        let h2$$ = document.createElement('h2')
        let parrafoId$$ = document.createElement('p')
        let parrafoTipos$$ = document.createElement('p')
        let parrafoStats$$ = document.createElement('p')

        divPokemon$$.setAttribute('class', 'divPokemon')
        divTexto$$.setAttribute('class', 'divTexto')
        divFlipCard$$.setAttribute('class', 'flipCard')
        divFlipCardInner$$.setAttribute('class', 'flipCardInner')
        divFlipCardBack$$.setAttribute('class', 'flipCardBack')
        imagenGrande$$.setAttribute('src', pokemon.fotoGrande)
        imagenGrande$$.setAttribute('alt', pokemon.nombre)
        imagenGrande$$.setAttribute('class', "imagenGrande")
        imagenPequeña$$.setAttribute('src', pokemon.fotoPequeña)
        imagenPequeña$$.setAttribute('alt', pokemon.nombre)
        imagenPequeña$$.setAttribute('class', "imagenPequeña")
        parrafoStats$$.setAttribute('class', 'statDescription')
        
        h2$$.textContent = pokemon.nombre
        parrafoId$$.textContent = '#' + pokemon.id
        parrafoTipos$$.textContent = 'tipos: ' + pokemon.tipos
        parrafoStats$$.textContent = pokemon.stats

        main$$.appendChild(divFlipCard$$)
        divFlipCard$$.appendChild(divFlipCardInner$$)
        divFlipCardInner$$.append(divPokemon$$, divFlipCardBack$$)
        divFlipCardBack$$.append(imagenPequeña$$, parrafoStats$$)
        divPokemon$$.appendChild(divTexto$$)
        divPokemon$$.appendChild(imagenGrande$$)
        divTexto$$.append(h2$$, parrafoId$$)
        divTexto$$.append(parrafoTipos$$)

      }
    }

/*Pinto en el HTML las propiedades de los pokemones mapeados*/

const cogerInput = (pokemones) => {
      const input$$ = document.querySelector('input')
      input$$.addEventListener("input", () =>
        filtrarPokemones(pokemones, input$$.value)
      );
    };

/*Creo el evento input*/

const filtrarPokemones = (arrayParaFiltrar, filtro) => {
      let pokemonesFiltrados = arrayParaFiltrar.filter((pokemon) =>
        pokemon.nombre.toLowerCase().includes(filtro.toLowerCase())
      );
      pintarPokemones(pokemonesFiltrados);
    };

/*Filtro la informacion del evento input para pintar solo los pokemones que coincidan con la busqueda*/

const init = async () => {

    const pokemones = await getPokemones();

    carga$$.classList.add('hidden');

    const pokemonesMapeados = pokemonesSinMapear(pokemones);

    pintarPokemones(pokemonesMapeados);

    cogerInput(pokemonesMapeados);
}

init()

/*Con mi hoja de ruta almaceno cada funcion en una variable y las ejecuto en un orden logico*/

