//
// Para incluir los diferentes sets de cartas podemos _importar_ el archivo
// JavasSript que contenga el `export` correspondiente...
//
import webdev from '../data/webdev/webdev.js';
 console.log(webdev);
//
// O alternativamente podríamos cargar el JSON de forma asíncrona usando
// `fetch` en el momento que consideremos necesario.
//
//fetch('./data/webdev/webdev.json')
//.then(resp => resp.json())
//.then(console.log)
//.catch(console.error);
//

const App = () => {
  const el = document.createElement('div');

  el.className = 'App'; 
  
  // Home
  var home = document.getElementById('home')
  var img = document.createElement('img'); 
  img.id = 'banner';
  img.src = './images/code.png';
  img.style.width = '100%';
  img.style.height = '500px';
  img.style.margin = '0%';
  
  el.appendChild(home)
  home.appendChild(img);

  // About button          
  var aboutBtn = document.createElement('button');
  aboutBtn.className = 'button';
  aboutBtn.id = 'about';
  aboutBtn.type = 'button';
  aboutBtn.title = 'About';
  aboutBtn.style.width = '50px';
  aboutBtn.style.height = '50px';

  home.appendChild(aboutBtn);
  
// About modal
  var aboutModal = document.createElement('div');
  aboutModal.id = 'aboutModal';
  aboutModal.className = 'modal';
  
  home.appendChild(aboutModal);

  var span = document.createElement('span');
  span.className = 'close';  
  span.innerHTML = '&times;';
  
  aboutModal.appendChild(span);

  //About paragraph inside the modal

  var aboutPara = document.createElement('p');
  aboutPara.className = 'paragraph';
  aboutPara.id = 'aboutPara';
  aboutPara.textContent = 'Codecentration is a memory match game that let you learn some basic concepts related to web developmnet, and have fun at the same time. This is an excellent practice for developing concentration and memory skills.';
  
  span.appendChild(aboutPara);

// When the user clicks the button, open the modal 
aboutBtn.onclick = function() {
  aboutModal.style.display = "block";
};

// When the user clicks on (x), close the modal
span.onclick = function() {
  aboutModal.style.display = "none";
};

  // How to play button
  var howToBtn = document.createElement('button');
  howToBtn.className = 'button';
  howToBtn.id = 'howToPlay';
  howToBtn.type = 'button';
  howToBtn.title = 'How to play';
  howToBtn.style.width = '50px';
  howToBtn.style.height = '50px';
  

  home.appendChild(howToBtn);

  // How to play page
  var howToModal = document.createElement('div');
  howToModal.id = 'howToModal';
  howToModal.className = 'hmodal';
  
  home.appendChild(howToModal);

  var howTospan = document.createElement('span');
  howTospan.className = 'close'; 
  howTospan.innerHTML = '&times;'; 

  howToModal.appendChild(howTospan);

  var howToPara = document.createElement('p');
  howToPara.className = 'htpara';
  howToPara.id = 'howToPara';
  howToPara.innerHTML = '- On the game board, there are always two identical images.<br/>- Start the game by flipping a card. Then try to find another card that has the same image as the first. <br/>- If you cannot find a pair, the flipped cards will be flipped back with the face down.<br/>- Try to remember these images as it becomes easier to find pairs the longer you play. <br/>- When you find a pair they are removed.';
  
  howTospan.appendChild(howToPara);

// When the user clicks the button, open the modal 
howToBtn.onclick = function() {
  howToModal.style.display = "block";
};

// When the user clicks on (x), close the modal
howTospan.onclick = function() {
  howToModal.style.display = "none";
};


  // Play button
  var playBtn = document.createElement('button');
    playBtn.className = 'button';
    playBtn.id = 'play';
    playBtn.type = 'button';
    playBtn.title = 'Play';
    playBtn.style.width = '50px';
    playBtn.style.height = '50px';

  

 //Show board function
  const showBoard = () =>{
    let memoryMatch = document.createElement('div')
      memoryMatch.id = 'board';
      memoryMatch.className = 'grid';
      memoryMatch.style.display = 'none'

      
  
    //CREATE THE BOARD
    var cardsArray = webdev.items;
    console.log(cardsArray)
    
    var gameGrid = cardsArray.concat(cardsArray).sort(function () {
      return 0.5 - Math.random();
    });
    
    var firstGuess = '';
    var secondGuess = '';
    var count = 0;
    var previousCard = null;
    var delay = 1200;
    
    var game = document.getElementById('game');
    var grid = document.createElement('section');
    grid.className = 'grid';
    game.appendChild(grid);
    
    gameGrid.forEach( (item) => {
      var name = item.id,
      image = item.image;
    
    
      var card = document.createElement('div');
      card.classList.add('card');
      card.dataset.name = name;
      
    
      var front = document.createElement('div');
      front.classList.add('front');
    
      var back = document.createElement('div');
      back.classList.add('back');
      back.style.backgroundImage = 'url(' + image + ')';
    
      grid.appendChild(card);
      card.appendChild(front);
      card.appendChild(back);
    });
    
    var match = function match() {
      var selected = document.querySelectorAll('.selected');
      selected.forEach(function (card) {
      card.classList.add('match');
      });
    };
    
    var resetGuesses = function resetGuesses() {
      firstGuess = '';
      secondGuess = '';
      count = 0;
      previousCard = null;
    
      var selected = document.querySelectorAll('.selected');
      selected.forEach(function (card) {
      card.classList.remove('selected');
      });
    };
    
    grid.addEventListener('click', function (event) {
    
      var clicked = event.target;
    
      if (clicked.nodeName === 'section' || clicked === previousCard || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
        return;
      };
    
      if (count < 2) {
        count++;
        if (count === 1) {
          firstGuess = clicked.parentNode.dataset.name;
          console.log(firstGuess);
          clicked.parentNode.classList.add('selected');
        } else {
          secondGuess = clicked.parentNode.dataset.name;
          console.log(secondGuess);
          clicked.parentNode.classList.add('selected');
        }
    
        if (firstGuess && secondGuess) {
          if (firstGuess === secondGuess) {
            setTimeout(match, delay);
          }
          setTimeout(resetGuesses, delay);
        }
        previousCard = clicked;
      }
      
    });
     
   
// Show game with play button
    document.querySelectorAll('.App')
    home.style.display = 'none';
    aboutBtn.style.display= 'none';
    howToBtn.style.display= 'none';
    playBtn.style.display= 'none';
    game.style.display = 'block';
// Reset button

var resetBtn = document.createElement('button');
  resetBtn.className = 'button';
  resetBtn.id = 'reset';
  resetBtn.type = 'button';
  resetBtn.title = 'Home';
  resetBtn.style.width = '50px';
  resetBtn.style.height = '50px';
  resetBtn.style.justifyContent = 'center';
  resetBtn.style.alignItems = 'center';

game.appendChild(resetBtn);

const showHome = () =>{
 let goBack = document.getElementById('home');
 goBack.style.display = 'block';
 location.reload()

 let gamePage = document.getElementById('game');
 gamePage.style.display = 'none';

};

resetBtn.addEventListener('click', showHome)
  game.appendChild(resetBtn);

  game.appendChild(memoryMatch);
  };

  // Hide home with play button
  
  playBtn.addEventListener('click', showBoard)
    home.appendChild(playBtn);


  return el;
};
export default App;
