let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  // This function is called through a loop from the loadItem function to add each item(pokemon) to the pokemonList from above. 
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //This function is to retrieve all available Pokemon fromt he pokemonList from above.
  function getAll() {
    return pokemonList;
  }

  // This function is to add each Pokemon to a list to be displayed in the web applicaiton.
  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let row = $(".row");

      let card = $('<div class="card" style="width:400px"></div>');
      let image = $(
        '<img class="card-img-top" alt="Card image" style="width:20%" />'
      );
      image.attr("src", pokemon.imageUrl);
      let cardBody = $('<div class="card-body"></div>');
      let cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
      let seeProfile = $(
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">See Profile</button>'
      );

      row.append(card);
      //Append the image to each card
      card.append(image);
      card.append(cardBody);
      cardBody.append(cardTitle);
      cardBody.append(seeProfile);

      seeProfile.on("click", function (event) {
        showDetails(pokemon);
      });
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    // let modalContainer = document.querySelector('#modal-container');
    // let modalContainer = $('#modal-container');
    // modalContainer.innerHTML = '';
    // modalContainer.empty();
    let modalTitle = $(".modal-title");
    let modalBody = $(".modal-body");
    modalTitle.empty();
    modalBody.empty();

    // let modal = document.createElement('div');
    // modal.classList.add('modal');

    // let closeButtonElement = document.createElement('button');
    // closeButtonElement.classList.add('modal-close');
    // closeButtonElement.innerText = 'Close';

    // closeButtonElement.addEventListener('click', hideModal);

    // let pokemonName = document.createElement('h1');
    // pokemonName.innerText = pokemon.name;
    let pokemonName = $("<h1>" + pokemon.name + "</h1>");

    // let pokemonImage = document.createElement("img");
    // pokemonImage.classList.add("modal-img");
    // pokemonImage.setAttribute("src", pokemon.imageUrl);
    let pokemonImage = $('<img class="modal-img"></img>');
    pokemonImage.attr("src", pokemon.imageUrl);

    // let pokemonHeight = document.createElement('p');
    // pokemonHeight.innerText = "Height: " + pokemon.height;
    let pokemonHeight = $("<p>" + "Height: " + pokemon.height + "</p>");

    // let pokemonAbilities = document.createElement('p');
    // pokemonAbilities.innerText = "Abilities: " + pokemon.abilities;
    let pokemonAbilities = $("<p>" + "Abilities: " + pokemon.abilities + "</p>");

    // let pokemonTypes = document.createElement('p');
    // pokemonTypes.innerText = "Types: " + pokemon.types;
    let pokemonTypes = $("<p>" + "Types: " + pokemon.types + "</p>");

    // modal.appendChild(closeButtonElement);
    // modal.appendChild(pokemonName);
    // modal.appendChild(pokemonImage);
    // modal.appendChild(pokemonHeight);
    // modal.appendChild(pokemonAbilities);
    // modal.appendChild(pokemonTypes);
    // modalContainer.appendChild(modal);

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonAbilities);
    modalBody.append(pokemonTypes);

    // modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    // let modalContainer = document.querySelector('#modal-container');
    let modalContainer = $("#modal-container");
    // modalContainer.classList.remove('is-visible');
    modalContainer.removeClass("is-visible");
  }

  // The function is to fetch to pokemon API and then add each item in the returned Promise to the pokemonList from above.
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // This funciton is to load the details of the Pokemon via fetch. If successful, the pokemon's height, weight and image of the pokemon will be store in a pokeDetails object.
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = [];
        details.types.forEach(function (pokemonType) {
          item.types.push(pokemonType.type.name);
        });
        item.abilities = [];
        details.abilities.forEach(function (pokemonAbility) {
          item.abilities.push(pokemonAbility.ability.name);
        });
      })
      .catch(function (e) {
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
    hideModal: hideModal,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
