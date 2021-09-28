
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
  
    return {
      getAll: getAll,
      add: add,
    };
  })()
  
  
  // Loop into all array elements of my repository (myPokeRepository)
  myPokeRepository.getAll().forEach(function(myPokemons) {
    let pokeName = myPokemons.name
    let pokeHeight = myPokemons.height
    // If height is bigger then 3 and smaller or equal to 6 write average message
    if (pokeHeight > 3 && pokeHeight <=6){
      document.write ('<p> <strong> <u>' + pokeName + '</u> </strong> (height: ' + pokeHeight  + '). This one is average.</p>')
    }
    // If height is smaller then 3 write small message
    else if (pokeHeight <= 3){
      document.write ('<p> <strong> <u>' + pokeName + '</u> </strong> (height: ' + pokeHeight  + '). This one is small.</p>')
    } 
    // All else write massive message
    else{
      document.write ('<p> <strong> <u>' + pokeName + '</u> </strong> (height: ' + pokeHeight  + '). <b> WoW This one is Massive!!!</b></p>')
    }
  });
  
  
  