//Array of pokemons (Name, Height, Type)
let pokemonList = [
    { name: 'Nidoking', height: 4, type: ['Poison', 'Ground']},
    { name: 'Venusaur', height: 7, type: ['Grass', 'Poison']},
    { name: 'Machamp', height: 5, type: 'Fighting'},
    { name: 'Golem', height: 4, type: ['Rock', 'Ground']},
    { name: 'Tentacruel', height: 5, type: ['Water','Poison']},
    { name: 'Rhyhorn', height: 3, type: ['Rock', 'Ground']},
    { name: 'Sandslash', height: 3, type: 'Ground'}
];

//Loop though the pokemonlist objects
for(let i=0; i < pokemonList.length; i++){
// If height is bigger then 3 and smaller or equal to 6 write average message
  if (pokemonList[i].height > 3 && pokemonList[i].height <=6){
    document.write ('<p> <strong> <u>' + pokemonList[i].name + '</u> </strong> (height: ' + pokemonList[i].height  + '). This one is average.</p>')
  }
  // If height is smaller then 3 write small message
  else if (pokemonList[i].height <= 3){
    document.write ('<p> <strong> <u>' + pokemonList[i].name + '</u> </strong> (height: ' + pokemonList[i].height  + '). This one is small.</p>')
  } 
  // All else write massive message
  else{
    document.write ('<p> <strong> <u>' + pokemonList[i].name + '</u> </strong> (height: ' + pokemonList[i].height  + '). <b> WoW This one is Massive!!!</b></p>')
  }
}