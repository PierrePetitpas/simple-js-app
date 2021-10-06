
 //  Create an array(pokemonList) in an IIE 
 let myPokeRepository = (function () {
    let pokemonList =[];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //create filter on search in nav-bar
    let myFilter = document.getElementById('my-search');

    myFilter.addEventListener('keyup', function (chars) {
      const searchString = chars.target.value.toLowerCase();
      const filteredPokemon = pokemonList.filter( pokemons => {
        return  pokemons.name.includes(searchString);
      });
      //console.log(filteredPokemon);
      filteredPokemon.forEach(function (item) {
        console.log(item);
        addListItem(item);
      });
    });

     // Return all the pokemon list
     function getAll() {
      return pokemonList;
    }
  //Add new item to the array
    function add(newItem) {
      return pokemonList.push(newItem);
    }

//create the list of pokemon and display a button for each pokemon name
    function addListItem(pokemon){
      let pokemonList = document.querySelector('.pokemon-list');
      pokemonList.classList.add('row');
      let listItems = document.createElement ('li');
      listItems.classList.add('pokemon-list', 'list-group-item', 'list-group-flush','col-xl-3', 'col-lg-4', 'col-md-6');
      let myButton = document.createElement ('button');
      myButton.innerText = pokemon.name;
      myButton.classList.add ('button-class', 'btn');
      listItems.appendChild(myButton);
      pokemonList.appendChild(listItems);
      //on-click call the showdetails function 
      addEventListener(myButton, pokemon);
      myButton.setAttribute('data-target', '#modal-container');
      myButton.setAttribute('data-toggle', 'modal');
      myButton.addEventListener('click', function () {
        showDetails(pokemon);
      });
    }
//fetch the list of pokemons from the API. lLopp into the json file and call the add function to build the array
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

   //Fetch the details for a specific pokemon and get the imageURL, Height and types from the Json. 
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = details.types;
        item.species = details.species.name;
      }).catch(function (e) {
        console.error(e);
      });
    }

    // show detail in Modal when name is clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }


    function showModal(pokemon){
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        //clear the content after use to be ready for the next
        modalTitle.empty();
        modalBody.empty();

        let namePokemon = $('<h1>' + pokemon.name + '</h1>');
        
        let imagePokemon = $('<img class = "modal-img" style="width:50%">');
        imagePokemon.attr('src', pokemon.imageUrl);

        let imagePokemonBack = $('<img class = "modal-img" style="width:50%">');
        imagePokemonBack.attr('src', pokemon.imageUrlBack);

        let heightPokemon = $('<p>' + 'Height: ' + pokemon.height + '</p>');
        let weightPokemon = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');
        let speciesPokemon = $('<p>' + 'Species: ' + pokemon.species + '</p>');



        modalTitle.append(namePokemon);
        modalBody.append(imagePokemon);
        modalBody.append(imagePokemonBack);
        modalBody.append(heightPokemon);
        modalBody.append(weightPokemon);
        modalBody.append(speciesPokemon);
    }

    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
      showDetails: showDetails,
      showModal: showModal
    };
  })()
  
  myPokeRepository.loadList().then (function(){
      myPokeRepository.getAll().forEach(function(pokemon) {
        myPokeRepository.addListItem(pokemon);
  });
  
});