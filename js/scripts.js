
 //  Create an array(pokemonList) in an IIE 
 let myPokeRepository = (function () {
 
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
      let listItems = document.createElement ('li');
      let myButton = document.createElement ('button');
      myButton.innerText = pokemon.name;
      myButton.classList.add ('button-class');
      listItems.appendChild(myButton);
      pokemonList.appendChild(listItems);
      //on-click call the showdetails function 
      myButton.addEventListener('click', function (event) {
        myPokeRepository.showDetails(pokemon);
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
        item.height = details.height;
        item.types = details.types;
      }).catch(function (e) {
        console.error(e);
      });
    }

    // show detail of a pokemon in the console
    function showDetails(pokemon){
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    }
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails
    };
  })()
  
  myPokeRepository.loadList().then (function(){
      myPokeRepository.getAll().forEach(function(pokemon) {
        myPokeRepository.addListItem(pokemon);
  });
  
});