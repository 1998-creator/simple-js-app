// This is the pokemon array of pokemon and their attributes.
let pokemonList = [
    {name: 'Bulbasaur', height: 7, types: ['grass', 'poison']},
    {name: 'Squirtle', height: 5, types:['water']},
    {name: 'Pikachu', height: 4, types:['electric']},
    {name: 'Caterpie', height: 3, types:['bug']}
];

// This is a for loop that gives information on the size of the pokemon.
pokemonList.forEach(function(pokemon){
    let size= "";
    if(pokemon.height>5){
        size="Wow! That's a big pokemon!"
    } else if(pokemon.height<4){
        size="That's a small pokemon"
    } else  {
        size="This is a medium pokemon"
    }

// This is a for loop that gives information on the color of the pokemon.
    // let color="";
    // for(let k=0; k<pokemon.types.length; k++){
    //     if(pokemon.types[k]=='bug'){
    //         color='<span style="color:brown;"> '
    //     } else if(pokemon.types[k]=='electric'){
    //         color='<span style="color:yellow;"> '
    //     }  else if(pokemon.types[k]=='water'){
    //         color='<span style="color:blue;"> '
    //     }  else if(pokemon.types[k]=='grass'){
    //         color='<span style="color:green;"> '
    //     } 
    // }
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
// for(let i=0; i<pokemonList.length; i++){
//     let size= "";
//     if(pokemon.height>5){
//         size="Wow! That's a big pokemon!"
//     } else if(pokemon.height<4){
//         size="That's a small pokemon"
//     } else  {
//         size="This is a medium pokemon"
//     }

// // This is a for loop that gives information on the color of the pokemon.
//     let color="";
//     for(let k=0; k<pokemon.types.length; k++){
//         if(pokemon.types[k]=='bug'){
//             color='<span style="color:brown;"> '
//         } else if(pokemon.types[k]=='electric'){
//             color='<span style="color:yellow;"> '
//         }  else if(pokemon.types[k]=='water'){
//             color='<span style="color:blue;"> '
//         }  else if(pokemon.types[k]=='grass'){
//             color='<span style="color:green;"> '
//         } 
//     }

// // This is information within the loop that displays the name and height on the page    
//     document.write(
//         '<div class="box">'+

//         pokemonList[i].name+
//         " (height: "+
//         pokemonList[i].height+
//         ")"+
//         "<br>"+
//         size+
//         "<br>"+
//         color+
//         pokemonList[i].types+
//         "</div>"
//         )
// }

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


