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
    // let ul = document.querySelector(".pokemon-list");
    let ul = $('.pokemon-list');
    // let li = document.createElement("li");
    let li = $('<li></li>');
    // let button = document.createElement("button");
    // button.innerText = pokemon.name;
    // button.classList.add("button-class");
    let button = $('<button class = "button-class" >'+ pokemon.name +'</button>')
    // li.appendChild(button);
    li.append(button);
    // ul.appendChild(li);
    ul.append(li);
    // button.addEventListener("click", function(){
    //   showDetails(pokemon)
    // })
    button.on("click", function(){
      showDetails(pokemon);
    })
  }
  
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon)
    });
  }

    function showModal(pokemon) {
      // let modalContainer = document.querySelector('#modal-container');
      let modalContainer = $('#modal-container');
      // modalContainer.innerHTML = '';
      modalContainer.empty();

      // let modal = document.createElement('div');
      // modal.classList.add('modal');
      let modal = $('<div class= "modal" ></div>');

      // let closeButtonElement = document.createElement('button');
      // closeButtonElement.classList.add('modal-close');
      // closeButtonElement.innerText = 'Close';
      let closeButtonElement = $('<button class="modal-close">close</button>');

      // closeButtonElement.addEventListener('click', hideModal);
      closeButtonElement.on('click', hideModal);
    
      // let pokemonName = document.createElement('h1');
      // pokemonName.innerText = pokemon.name;
      let pokemonName = $('<h1>' + pokemon.name + '</h1>');

      // let pokemonImage = document.createElement("img");
      // pokemonImage.classList.add("modal-img");
      // pokemonImage.setAttribute("src", pokemon.imageUrl);
      let pokemonImage = $('<img class="modal-img"></img>');
      pokemonImage.attributes('src', pokemon.imageUrl);


      // let pokemonHeight = document.createElement('p');
      // pokemonHeight.innerText = "Height: " + pokemon.height;
      let pokemonHeight = $('<p>' + "Height: " + pokemon.height + '</p>');

      // let pokemonAbilities = document.createElement('p');
      // pokemonAbilities.innerText = "Abilities: " + pokemon.abilities;
      let pokemonAbilities = $('<p>' + "Abilities: " + pokemon.abilities + '</p>');

      // let pokemonTypes = document.createElement('p');
      // pokemonTypes.innerText = "Types: " + pokemon.types;
      let pokemonTypes = $('<p>' + "Types: " + pokemon.types + '</p>');
    
      // modal.appendChild(closeButtonElement);
      // modal.appendChild(pokemonName);
      // modal.appendChild(pokemonImage);
      // modal.appendChild(pokemonHeight);
      // modal.appendChild(pokemonAbilities);
      // modal.appendChild(pokemonTypes);
      // modalContainer.appendChild(modal);

      modal.append(closeButtonElement);
      modal.append(pokemonName);
      modal.append(pokemonImage);
      modal.append(pokemonHeight);
      modal.append(pokemonAbilities);
      modal.append(pokemonTypes);
      modalContainer.append(modal);
    
      // modalContainer.classList.add('is-visible');
      modalContainer.addClass('is-visible');
    }
    

    function hideModal() {
      // let modalContainer = document.querySelector('#modal-container');
      let modalContainer = $('#modal-container');
      // modalContainer.classList.remove('is-visible');
      modalContainer.removeClass('is-visible');
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

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  let modalContainer = document.querySelector('#modal-container');
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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