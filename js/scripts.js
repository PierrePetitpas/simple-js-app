
 //  Create an array(pokemonList) in an IIE 
 let myPokeRepository = (function () {
 
    let pokemonList = [
     { name: 'Nidoking', height: 4, type: ['Poison', 'Ground']},
     { name: 'Venusaur', height: 7, type: ['Grass', 'Poison']},
     { name: 'Machamp', height: 5, type: 'Fighting'},
     { name: 'Golem', height: 4, type: ['Rock', 'Ground']},
     { name: 'Tentacruel', height: 5, type: ['Water','Poison']},
     { name: 'Rhyhorn', height: 3, type: ['Rock', 'Ground']},
     { name: 'Sandslash', height: 3, type: 'Ground'}
    ];
  // Return all the pokemon list
    function getAll() {
      return pokemonList;
    }
  //Add new item to the array
    function add(newItem) {
      return pokemonList.push(newItem);
    }
//create the list of pokemon and display a button for each pokemon name
    function addListItem(myPokemon){
      let myPokemonList = document.querySelector('.pokemon-list');
      let listItems = document.createElement ('li');
      let myButton = document.createElement ('button');
      myButton.innerText = myPokemon.name;
      myButton.classList.add ('button-class');
      listItems.appendChild(myButton);
      myPokemonList.appendChild(listItems);
      //on-click call the showdetails function 
      myButton.addEventListener('click', function (event) {
        myPokeRepository.showDetails(myPokemon);
      });
    }
    // show detail of a pokemon in the console
    function showDetails(myPokemon){
      console.log(myPokemon);
    }
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      showDetails: showDetails
    };
  })()
  
  
  myPokeRepository.getAll().forEach(function(myPokemon) {
    myPokeRepository.addListItem(myPokemon);
  });
  
  