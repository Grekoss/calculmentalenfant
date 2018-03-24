var app = {
  seconds: 10,
  init: function() {

    console.log('Init');

    // on crée l'évènement
    document.getElementById('test').addEventListener('click', app.updateTimer);


  },

  // Toutes les secondes, on décrémente le timer
  // et on si on arrive à 0, on s'arrête
  updateTimer: function() {

    // On décrémente le timer
    app.seconds--;

    // On affiche le timer
    document.getElementById('timer').textContent = app.seconds + ' s.';

    // Est ce qu'on a fini ?
    if (app.seconds <= 0) {

      console.log('On arrête tout');
      // On masque le formulaire
    }
    else {

      setTimeout(app.updateTimer, 1000);
    }
  }
};

document.addEventListener('DOMContentLoaded', app.init);