let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 7, types: ["grass", "poison"] },
    { name: "Squirtle", height: 5, types: ["water"] },
    { name: "Pikachu", height: 4, types: ["electric"] },
    { name: "Caterpie", height: 3, types: ["bug"] },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let ul = document.querySelector(".pokemon-list");
    let li = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    li.appendChild(button);
    ul.appendChild(li);
    button.addEventListener("click", function(){
      showDetails(pokemon)
    })
  }
  
  function showDetails(pokemon){
    console.log(pokemon)
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

console.log(pokemonRepository.getAll());
console.log(
  pokemonRepository.add({ name: "Eve", height: 2, types: ["speed"] })
);
pokemonRepository.add({ name: "Charmander", height: 10, types: ["fire"] });

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
