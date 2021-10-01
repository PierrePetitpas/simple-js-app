
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
        item.species = details.species.name;
      }).catch(function (e) {
        console.error(e);
      });
    }

    // show detail in Modal when name is clicked
    function showDetails(pokemon){
      
      loadDetails(pokemon).then(function () {
        let modalContainer = document.querySelector('#modal-container');
        // Clear all existing modal content
        modalContainer.innerHTML = '';
        let modal = document.createElement ('div');
        modal.classList.add ('modal');
  
      // add a close button to the new modal
        let closeButtonElement = document.createElement ('button');
        closeButtonElement.classList.add ('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
  
        // add the Name of pokeman for title
        let titleElement = document.createElement ('h1');
        titleElement.classList.add ('modal-title');
        titleElement.innerText = pokemon.name;

        //add the pokemon Image to the new modal
        let imageElement = document.createElement ('img');
        imageElement.classList.add ('modal-image');
        imageElement.src = pokemon.imageUrl;
  
        // add the pokemon height to the new modal
        let heightElement = document.createElement('p');
        heightElement.classList.add ('modal-height');
        heightElement.innerText = 'Height: ' + pokemon.height;

        //add pokemon species to the new modal
        let speciesElement = document.createElement('p');
        speciesElement.classList.add ('modal-species');
        speciesElement.innerText = 'Species: ' + pokemon.species;
  
        // appen all the elements and display them
        modal.appendChild (closeButtonElement);
        modal.appendChild (titleElement);
        modal.appendChild (imageElement);
        modal.appendChild (heightElement);
        modal.appendChild (speciesElement);
        modalContainer.appendChild (modal);
        modalContainer.classList.add ('is-visible');
        
        //function to hide the modal 
        function hideModal(){
          modalContainer.classList.remove('is-visible');
        }

        // if the esc key is press close modal
        window.addEventListener('keydown', (e) => {
          let modalContainer = document.querySelector('#modal-container');
          if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();  
          }
        });

        // when clicking outside modal close modal
        modalContainer.addEventListener('click', (e) => {
          let target = e.target;
          if (target === modalContainer) {
            hideModal();
          }
        });
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