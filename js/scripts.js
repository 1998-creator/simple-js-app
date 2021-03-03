let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
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
  
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon)
    });
  }

    function showModal(pokemon) {
      let modalContainer = document.querySelector('#modal-container');
    
      modalContainer.innerHTML = '';
    
      let modal = document.createElement('div');
      modal.classList.add('modal');
    
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);
    
      let pokemonName = document.createElement('h1');
      pokemonName.innerText = pokemon.name;

      let pokemonImage = document.createElement("img");
      pokemonImage.classList.add("modal-img");
      pokemonImage.setAttribute("src", pokemon.imageUrl);
    
      let pokemonHeight = document.createElement('p');
      pokemonHeight.innerText = "Height: " + pokemon.height;

      let pokemonAbilities = document.createElement('p');
      pokemonAbilities.innerText = "Abilities: " + pokemon.abilities;

      let pokemonTypes = document.createElement('p');
      pokemonTypes.innerText = "Types: " + pokemon.types;
    
      modal.appendChild(closeButtonElement);
      modal.appendChild(pokemonName);
      modal.appendChild(pokemonImage);
      modal.appendChild(pokemonHeight);
      modal.appendChild(pokemonAbilities);
      modal.appendChild(pokemonTypes);
      modalContainer.appendChild(modal);
    
      modalContainer.classList.add('is-visible');
    }
    
    document.querySelector('#show-modal').addEventListener('click', () => {
      showModal('', '');
    });

    function hideModal() {
      let modalContainer = document.querySelector('#modal-container');
      modalContainer.classList.remove('is-visible');
    }

  
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.types = [];
      details.types.forEach(function(pokemonType){
        item.types.push(pokemonType.type.name)
      })
      item.abilities = [];
      details.abilities.forEach(function(pokemonAbility){
        item.abilities.push(pokemonAbility.ability.name)
      })
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});