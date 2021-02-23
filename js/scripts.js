// This is an IIFE of the pokemonRepository that includes an add and getAll function
let pokemonRepository = (function () {
    let pokemonList = [
        {name: 'Bulbasaur', height: 7, types: ['grass', 'poison']},
        {name: 'Squirtle', height: 5, types:['water']},
        {name: 'Pikachu', height: 4, types:['electric']},
        {name: 'Caterpie', height: 3, types:['bug']}
    ];
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();

console.log(pokemonRepository.getAll())
console.log(pokemonRepository.add({name: 'Eve', height: 2, types:['speed']}))
pokemonRepository.add({name: 'Charmander', height: 10, types:['fire']})



// This is a forEach loop that connects to the IIFE and gives information on the size of the pokemon.
pokemonRepository.getAll().forEach(function(pokemon){
    let size= "";
    if(pokemon.height>5){
        size="Wow! That's a big pokemon!"
    } else if(pokemon.height<4){
        size="That's a small pokemon"
    } else  {
        size="This is a medium pokemon"
    }

// This is a forEach loop that gives information on the color of the pokemon.
    let color="";
    pokemon.types.forEach(function(pokemonType){
        if(pokemonType=='bug'){
            color='<span style="color:brown;"> '
        } else if(pokemonType=='electric'){
            color='<span style="color:yellow;"> '
        }  else if(pokemonType=='water'){
            color='<span style="color:blue;"> '
        }  else if(pokemonType=='grass'){
            color='<span style="color:green;"> '
        } else if(pokemonType=='speed'){
            color='<span style="color:orange;"> '
        } else if(pokemonType=='fire'){
            color='<span style="color:red;"> '
        } 
    })

// This is information within the loop that displays the name and height on the page    
    document.write(
        '<div class="box">'+

        pokemon.name+
        " (height: "+
        pokemon.height+
        ")"+
        "<br>"+
        size+
        "<br>"+
        color+
        pokemon.types+
        "</div>"
        )
})
