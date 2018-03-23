var app = {
  nbgames : 0,
  init : function () {
    //On clique sur "Commencer"
    $('#start').on('click', app.start);
  },
  verif : function(chars) {
    //Caractères autorisés
    var regex = new RegExp('[0-9]', 'i');
    var valid;
    for (var  x = 0; x < chars.value.length; x++) {
      valid = regex.test(chars.value.charAt(x));
      if (valid === false) {
        chars.value = chars.value.substr(0, x) + chars.value.substr(x + 1, chars.value.length - x + 1); x--;
      }
    }
  },
  random : function(min, max){
    //Creation des variables Randoms
    app.random1 = Math.floor(Math.random() * ( max - min + 1 ));
    app.random2 = Math.floor(Math.random() * ( max - min + 1 ));
    // console.log(app.random1);
    // console.log(app.random2);
    //Calcul de l'opération
    app.result  = app.random1 + app.random2;
    // console.log(app.result);
  },
  start : function() {
    //Masquer le bouton "Commencer" et Afficher "Valider"
    $('#start').css('visibility', 'hidden');
    $('#validation').css('display', 'inline-block');
    //Génération des Randoms + Affichage dans les Divs
    app.random(0,10);
    $('#firstNumber').text(app.random1);
    $('#secondNumber').text(app.random2);
    //Incrémentation du nombre de partie + Affichage
    app.nbgames ++;
    $('#questionNumber').text('Question n° ' + app.nbgames);
    //Initialisation du temps : 20
    app.seconds = 3;
    app.updateTimer();
  },
  updateTimer : function () {
    //Toute les secondes, on décrémente le timer et si on arrive à 0, on stop!
    //On affiche le timer
    $('#cpt').css('visibility', 'visible');
    $('#cpt').text(app.seconds + ' s');
    //Est ce qu'on a fini?
    if(app.seconds <= 0) {
      app.falseAnswer();
    } else {
      setTimeout(app.updateTimer, 1000);
    }
    // On décrémente le Timer
    app.seconds--;
  },
  falseAnswer : function () {
    //Etape lors d'une réponse Fause ou Timer a 0
    $('#solution').text('La réponse est : ' + app.result);
    $('#false, #solution').css('visibility', 'visible');
    $('#cpt').css('visibility', 'hidden');
    app.beforeNext();
  },
  trueAnswer : function () {
    //Etape lors d'une réponse Vrai
    $('#solution').text('Continue, tu as trouvé la bonne réponse');
    $('#true, #solution').css('visibility', 'visible');
    $('#cpt').css('visibility', 'hidden');
    app.beforeNext();
  },
  beforeNext : function () {
    //Swicth entre le bouton "Valider" et "Next"
    $('#validation').css('display', 'none');
    $('#next').css('display', 'inline-block');
    //Action sur le clique du bouton "Next"
    $('#next').on('click', app.afterNext);
  },
  afterNext : function() {
    //Push le résultat
    //Masque les tanpons, message et bouton "Next"
    $('#true, #false, #solution').css('visibility', 'hidden');
    $('#next').css('display', 'none');
    //Relance le jeu
    app.start();
  },
};



$(app.init);
