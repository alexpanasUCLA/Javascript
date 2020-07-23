document.body.onload = generateDinos;

  // create Dino constructor 

  function Dino({species, weight, height, diet, where, when, fact}) {
      this.species = species;
      this.weight= weight;
      this.height= height;
      this.diet= diet;
      this.facts = [
          fact,
          `${this.species} lived in ${where}`,
          `${this.species} lived during ${when}`,         
        ]

  }

 // Load Dino Objects from dino.json 
 let dinos = [];

 async function generateDinos(){
   const myJson = await fetch("./dino.json");
   const data = await myJson.json();
 
   // generate array of Dino objects 
   dinos = data.Dinos.map(dino => new Dino(dino));     
 }

 // Create Human Object

function generateHuman (){

    return (function(){
        let humanObject = {};
        humanObject.diet = document.getElementById('diet').value;
        let inputs = document.getElementsByTagName('input');
        for (const _ of inputs) { humanObject[_.name] = _.value; }
        humanObject.height = 12* parseInt(humanObject.feet) + parseInt(humanObject.inches);
        return humanObject;

  })()
}

  // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.compareHeight = function ({height}) {
        this.facts.push( `${this.species} is ${
          (this.height / height).toPrecision(2)
        } times your height.`)
      };

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.compareWeight = function ({weight}) {
        this.facts.push(`${this.species} is ${
          (this.weight / weight).toPrecision(2)
        } times your weight.`)
      };

        // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.compareDiet = function ({diet}) {
       this.facts.push(`${this.species} is ${this.diet} and you is ${diet}`);
      };




// Add tiles to DOM
  
function addTilesToDOM({name}) {
    const grid = document.getElementById('grid');
    dinos.map(dino => {
      const tile = document.createElement('div');
      tile.className = 'grid-item';
  
      const title = document.createElement('h3');
      title.className = 'h3';
      if (dino.species) {
        title.innerHTML = dino.species;
      } else {
        title.innerHTML = name;
      }
  
      const fact = document.createElement('p');
      fact.className = 'p';
      const factsArray = dino.facts;
      let randomFact = '';
  
      if (factsArray) {
        randomFact = factsArray[Math.floor(Math.random() * factsArray.length)];
      }
  
      if (dino.species == 'Pigeon') {
        fact.innerHTML = dino.facts[0];
      } else {
        fact.innerHTML = randomFact;
      }
  
      const image = document.createElement('img');
      image.className = 'img';
      dino.species?image.src = `./images/${dino.species}.png`:image.src =`./images/human.png`;

      tile.append(fact);
      tile.append(image);
      tile.append(title);
      grid.append(tile);
    });
  }
  
 // Remove form from screen
  
 function removeFormFromScreen() {
    const form = document.getElementById('dino-compare');
    form.innerHTML = '';
  }

 // On button click, prepare and display infographic
  
 const button = document.getElementById('btn');
 button.addEventListener('click', function () {
   const human = generateHuman();
   dinos.splice(4,0,human);
  
   dinos.map(dino => {
     if (dino.species) {
       dino.compareHeight(human);
       dino.compareWeight(human);
       dino.compareDiet(human);
     }
   });
   addTilesToDOM(human);
   removeFormFromScreen();
 });
