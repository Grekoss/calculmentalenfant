function promptForNumber(min, max) {

  var userNumber;
  var error = false;

  do {

    userNumber = prompt('Saisissez un entier entre ' + min + ' et ' + max);

    error = !userNumber
      || isNaN(Number(userNumber))
      || Number(userNumber) > max
      || Number(userNumber) < min
      || !Number.isInteger(Number(userNumber));

    if(error) {
      alert('Ceci n\'est pas un entier valide');
    }
  }
  while(error)

  return Number(userNumber);
}


function getRandomInt(min, max) {
  var nbAleatoire = Math.floor(Math.random() * ( max-min+1 ));
  return nbAleatoire;
}


function partie() {

  var randomNumber = getRandomInt(0, 1000);
  console.log('réponse : ' + randomNumber);

  var attempts = 0;

  do {

    var guess = promptForNumber(0, 1000);
    console.log('tentative : ' + guess);

    attempts++;

    if (guess > randomNumber) {
      alert('plus petit, il te reste ' + (10-attempts) + ' chances');
    }
    else if (guess < randomNumber) {
      alert('plus grand, il te reste ' + (10-attempts) + ' chances');
    }

  } while (guess !== randomNumber && attempts < 3)

  // On regarde ce qu'il en est
  if(guess === randomNumber) {

    // On a trouvé le bon nombre, on a gagné
    alert('gagné !!');
  }
  else {

    // On a pas trouvé, on a perdu
    alert('Perdu, better luck next time !');
  }

  // On a fini la partie, on souhaite enregistrer
  // les données de la partie
  var result = {
    // Est ce qu'on a gagné ?
    win: guess === randomNumber,
    // Le nombre de tentatives
    tentatives: attempts,
    // Le nombre à trouver
    numberToFind: randomNumber
  };

  // On retourne les résultats de la partie
  return result;
}


// On factorise le code, on crée une fonction
// qui nous retourne un "td" avec son contenu
function createTd( content ) {

  var td = document.createElement('td');
  td.textContent = content;
  return td;
}

// On crée la variable qui va enregistrer
// les données de chacune des parties
var games = [];

// On cible le bouton de début de partie
var btn = document.getElementById('start');

// On veut détecter le clic sur le bouton
btn.addEventListener('click', lancerJeu);

function lancerJeu() {

  // On gère plusieurs parties
  do {

    // On lance une partie et on récupère
    // les résultats à la fin de la partie
    var data = partie();

    // On enregistre ces résultats dans le
    // tableau javascript "games"
    games.push( data );

  } while ( confirm('Une nouvelle partie ?') );

  // On peut afficher le tableau de résultats
  // On cible le tableau HTML
  // var tablo = document.getElementById('resultats');

  // On découvre querySelector
  // var list = document.getElementsByTagName("table");
  // var list = document.getElementsByClassName("maclasse");
  var tablo = document.querySelector('#resultats tbody');

  // On vide le tableau HTML pour y ré-afficher
  // toutes les lignes de résultats
  // tablo.innerHTML = '';
  var list = tablo.children;

  for (var index = 0; index < list.length; index++) {

    // On récupère chaque '<tr>' et on la supprime
    // var temp = list[ index ];
    // temp.remove();
    list[ index ].remove();
  }

  // Pour chaque partie, on ajoute une ligne au tableau HTML
  // for (var index = 0; index < games.length; index++) {
  for (var index in games) {

    // On récupère les données à afficher
    var stat = games[ index ];

    // On affiche ces données dans le HTML
    // if (stat.win) { 'gagné' } else { 'perdu' }
    // (stat.win) ? 'gagné' : 'perdu'
    // var temp = (stat.win) ? 'gagné' : 'perdu';
    // tablo.innerHTML += '<tr><td>'+ (index+1) +'</td> <td>'+ ((stat.win) ? 'gagné' : 'perdu') +'</td> <td>'+ stat.tentatives +'</td> <td>'+ stat.numberToFind +'</td></tr>';

    // On crée le '<tr>'
    var tr = document.createElement('tr');

    // On crée les 4 '<td>'
    // var numPartie = document.createElement('td');
    // numPartie.textContent = index+1;
    var numPartie = createTd( Number(index) + 1 );

    // var isWin = document.createElement('td');
    // isWin.textContent = (stat.win) ? 'gagné' : 'perdu';
    var isWin = createTd( (stat.win) ? 'gagné' : 'perdu' );
    var tentatives = createTd( stat.tentatives );
    var nbToFind = createTd( stat.numberToFind );

    // On insère les '<td>' dans notre '<tr>'
    tr.appendChild( numPartie );
    tr.appendChild( isWin );
    tr.appendChild( tentatives );
    tr.appendChild( nbToFind );

    // On affiche la ligne 'tr' dans notre tableau HTML
    tablo.appendChild( tr );
  }
}