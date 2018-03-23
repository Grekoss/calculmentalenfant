**COMMENCER**
Masquer le bouton "Commencer"
Affiche le bouton "Valider"
Génération des Randoms
Affiche les Randoms dans les DIV
Initialisation du "Timer"
Lancement du "Timer"
**si**
	*DECOMPTE DU TIMER*
		**Timer = 0**
			*A* Affiche le Tampon "Faux"
					Affiche le message de "Réponse"

		**Timer > 0**
			**VALIDER**
				**si**
					*Résultat de l'utilisateur + Arrêt du Timer*
						**User != Resultat**
							Va au point *A*
						**User = Résultat**
							Affiche le Tampon "Vrai"
							Affiche le bouton "Next"
							**NEXT**
							Push le résultat dans le Tableau
							Masque les tampons
							Masque le message
							Masque le bouton "Next"
