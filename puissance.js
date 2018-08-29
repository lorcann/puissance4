(function($) {
	$.fn.grid = function(x, y, p1_color, p2_color, name_p1, name_p2, turn) {

		if (p1_color == p2_color) {
			alert("Les joueurs ne peuvent avoir la même couleurs. Veuillez changer les paramètres à l'appel du plugin.");
			return;
		}
		else if(x < 4 || y < 4)
		{
			alert("Vous devez entrez minimum une grille de 4x4");
			return;
		}

		/* ------------ */
		/* INDICATEURS  */
		/* ------------ */
		turn_indicator = 1; // Indicateur du tour des joueurs
		col_indicator = ['']; // Indicateur de colonnes
		row_win_indicator = []; // Indicateur de victoire (tableau multidimensinelle) 
		row_indicator = []; // Indicateur de lignes
		total_pion = x * y; // Total pions
		cancel_p1 = 0; // Annuler coup joué (joueur1)
		cancel_p2 = 0; // Annuler coup joué (joueur2)
		string = "" // 
		if (turn == '2') {
			turn_indicator++;
		}
		/* ----------------------- */
		/* TOUR DU JOUEUR AU DEBUT */
		/* ----------------------- */
		nextTurn(turn);

		/* ------- */
		/* SCORES */
		/* ------- */
		score_p1 = localStorage.getItem('score_p1');
		score_p2 = localStorage.getItem('score_p2');

		/* ------------------------ */
		/* AFFICHAGE COULEUR JOUEUR */
		/* ------------------------ */
		displayPlayerColor('1', p1_color, name_p1);
		displayPlayerColor('2', p2_color, name_p2);
		displayScore(score_p1, score_p2);
		displayButton();
		/* ------------------ */
		/* FIN AFFICHAGE TOUR */

		/* -------- */
		/*  GRILLE  */
		/* -------- */
		createGrid(x, y);
		/* ---------- */
		/* FIN GRILLE */
		/* ---------- */

		/* ------------------ */
		/* PUISSANCE 4 : JEU */
		/* ---------------- */

		/* Reset la partie */
		$('#reset_button').on('click', function() {
			location.reload();
			localStorage.removeItem("score_p1");
			localStorage.removeItem("score_p2");
		});

		$('#reset_game').on('click', function() {
			if(confirm('Êtes vous sur de vouloir commencer une nouvelle partie ?'))
				{
					location.reload();
				}
		});

		/* Annuler un coup joué */
		$('#cancel').click(function() {
			cancelButton();
		});

		/* AJOUT DE PIONS */
		$('span').on('click', function() {
			PlayGame(this);
		});

		/* -------- */
		/* FIN JEU */
		/* ------ */



		/* *********************************** */
		/* *                                 * */
		/* *            FONCTIONS            * */
		/* *                                 * */
		/* *********************************** */



		function displayPlayerColor(player, color, name) {
			/* Affichage de la couleur des joueurs */
			$("#p" + player + "").attr("style", "color:" + color).append(name + " (" + color + ")<br>")
		}

		function displayScore(score_a, score_b) {
			/* Affichage de la couleur des joueurs */
			$("#score").append("<br>Score : " + score_a + " - " + score_b + "<br>")
		}

		function displayButton() {
			/* Affichage des boutons */
			$("#score").append("<button id='reset_game'>Nouvelle Partie</button>").append("<input type='submit' value='Reset score' id='reset_button'>").append("<button id='cancel'>Annuler</button>")
		}

		function createColumn(nb) {
			/* Création d'une première ligne et attribution de chaque case à une class (col_i) */
			$('<span style="border: 4px solid black;border-radius: 100%;height:100Px; width:125Px;margin-left: 3%;">').html("").attr('class', 'col_' + nb).appendTo(".row_1");
		};

		function createRows(nb) {
			/* Copie de la première ligne */
			content = $(".row_1").html();
			$('<div style="display: inline-flex">').html(content).attr('class', 'row_' + nb).appendTo(".rows");
		};

		function createGrid(x, y) {
			/* Création d'un tableau multidimensionelle (indicateur position pions) */
			for (it = 0; it < y; it++) {
				row_win_indicator[it] = [];
				for (it2 = 0; it2 < x; it2++) {
					row_win_indicator[it][it2] = "vide";
				}
			}

			/* Création de la grille (affichage) */
			$("#grid").append("<br>");

			/* Div dans laquel sera placé la première ligne */
			$('<div>').html("").attr('class', 'row_1').appendTo("#grid");

			/* --------- */
			/* COLONNES */
			/* ------- */

			i = 1;
			while (i <= x) {
				createColumn(i);
				col_indicator.push(x);
				i++;
			}

			$("#grid").append("<br>")
			/* ------------- */
			/* FIN COLONNES */
			/* ------------- */

			$('<div>').html("").attr('class', 'rows').appendTo("#grid"); // Div dans laquelle on va mettre les autres lignes
			/* ------- */
			/* LIGNES */
			/* ------- */
			j = 2; // On commence a 2 vu qu'on a déjà une première ligne
			while (j < y + 1) {
				createRows(j);
				j++;
			}
			/* ----------- */
			/* FIN LIGNES */
			/* ----------- */


		}

		function addPoint(position, color) {
			/* Ajout d'un pion à une position spécifique (affichage + animation) */
			position.attr("style", "border: 4px solid black;background-color:" + color + ";border-radius: 100%;height:100Px; width:125Px;margin-left: 3%;margin-top:-100%").addClass('fill ' + color).animate({
				"margin-top": "0%"
			}, "slow");
		};

		function nextTurn(player) {
			/* Changement du tour (affichage) */
			if (player == "1") {
				$('#tour').fadeOut().fadeIn().html("Tour de " + name_p1)
			} else {
				$('#tour').fadeOut().fadeIn().html("Tour de " + name_p2)
			}
		};

		function cancelButton() {
			/* ANnuler dernier coup joué */
				if (cancel_p2 == 1 && turn_indicator % 2 != 0 || cancel_p1 == 1 && turn_indicator % 2 == 0) {
					alert("Vous ne pouvez qu'annuler qu'une fois !")
					return;
				}
			if (turn_indicator % 2 == 0) {
				if (cancel_p1 < 1) {
			if(confirm("Êtes vous sur de annuler votre dernier coup "+name_p1+" ? (Vous n'êtes autorisé à faire sa qu'une fois !)"))
				{
					nextTurn('1');
					turn_indicator--;
					last_play = $(".rows").children("div.row_" + (last_row_play + 1) + "").find("span").eq(col_num - 1);
					last_play.css("background-color", "white");
					col_indicator[col_num] = col_indicator[col_num] + 1;
					row_win_indicator[last_row_play][last_col_play] = "vide"
					cancel_p1++;
				} 
			}else {
					alert("Vous ne pouvez qu'annuler qu'une fois (" + name_p1 + ")!")
				}
			} else if (turn_indicator % 2 != 0) {
				if (cancel_p2 < 1) {
			if(confirm("Êtes vous sur de annuler votre dernier coup "+name_p2+" ? (Vous n'êtes autorisé à faire sa qu'une fois !)"))
				{
					nextTurn('2');
					turn_indicator--;
					last_play = $(".rows").children("div.row_" + (last_row_play + 1) + "").find("span").eq(col_num - 1);
					last_play.css("background-color", "white");
					col_indicator[col_num] = col_indicator[col_num] + 1;
					cancel_p2++;
				} 
			} else {
					alert("Vous ne pouvez qu'annuler qu'une fois (" + name_p2 + ")!")
				}
			}
		};

		function PlayGame(obj) {
			/* Ajout/empilement de pions et détection victoire/nulle */

			/* ----------- */
			/* INDICATEURS */
			/* ----------- */
			a = 0;
			turn_indicator++; // Tour


			/* ------------------------- */
			/*  DETECTION PARTIE NULLE   */
			/* ------------------------- */
			if (total_pion == 0) {
				alert("Partie nulle. Fin du jeu");
				location.reload();
			}


			/* ------------------------- */
			/* AJOUT/EMPILEMENT DE PIONS */
			/* ------------------------- */

			// Récupere la colonne de la case sur laquel on a cliqué
			col = $(obj).attr("class");
			col_num = col.slice(-1);
			row_target = $(obj).parent('div').attr("class");

			// Position spécifique pour placer pions
			point_first_row = $(".row_1").find("span").eq(col_num - 1);
			last_row = 'row_' + (j - 1);
			point_last_row = $(".rows").children("div." + last_row + "").find("span").eq(col_num - 1);
			point_top = $(".rows").children("div.row_" + col_indicator[col_num] + "").find("span").eq(col_num - 1);

			// Récupere couleur d'une case
			color = $(point_last_row).attr("style"); // recupere la couleur du dernier point
			color = color.split(';');

			/* TOUR JOUEUR 1 */
			if (turn_indicator % 2 == 0) {

				if (col_indicator[col_num] <= 0) {
					alert('Cette colonne est pleine !');
					total_pion++;
				}
				if (col_indicator[col_num] !== 1) {
					if (color.length == 6) {

						addPoint(point_last_row, p1_color);
						nextTurn("2");
						col_indicator[col_num] = col_indicator[col_num] - 1;
						total_pion--;
						row_win_indicator[y - 1][col_num - 1] = p1_color
						last_row_play = y - 1;
						last_col_play = col_num - 1;
						//game.push('_')
					} else {


						addPoint(point_top, p1_color);
						nextTurn("2");
						col_indicator[col_num] = col_indicator[col_num] - 1;
						col_indic = col_indicator[col_num];
						total_pion--;
						row_win_indicator[col_indic][col_num - 1] = p1_color
						last_row_play = col_indic;
						last_col_play = col_num - 1;
						//game.push('-')
					}
				} else {
					addPoint(point_first_row, p1_color);
					row_win_indicator[0][col_num - 1] = p1_color
					last_row_play = 0;
					last_col_play = col_num - 1;
					col_indicator[col_num] = col_indicator[col_num] - 1;
					total_pion--;

					//game.push('^')
				}
			}
			/* JOUEUR 2 */
			if (turn_indicator % 2 != 0) {

				if (col_indicator[col_num] <= 0) {
					alert('Cette colonne est pleine !');
					total_pion++;
				}
				if (col_indicator[col_num] !== 1) {
					if (color.length == 6) {
						addPoint(point_last_row, p2_color);
						nextTurn("1");
						col_indicator[col_num] = col_indicator[col_num] - 1;
						total_pion--;
						row_win_indicator[y - 1][col_num - 1] = p2_color
						last_row_play = y - 1;
						last_col_play = col_num - 1;
						//game.push('|')
					} else {
						addPoint(point_top, p2_color);
						nextTurn("1");
						col_indicator[col_num] = col_indicator[col_num] - 1;
						col_indic = col_indicator[col_num];
						total_pion--;
						row_win_indicator[col_indic][col_num - 1] = p2_color
						last_row_play = col_indic;
						last_col_play = col_num - 1;
						//game.push('O')
					}
				} else {
					addPoint(point_first_row, p2_color);
					col_indicator[col_num] = col_indicator[col_num] - 1;
					row_win_indicator[0][col_num - 1] = p2_color
					total_pion--;
					last_row_play = 0;
					last_col_play = col_num - 1;
					//game.push('T')
				}
			}


			/* ----------------------------- */
			/* FIN AJOUT/EMPILEMENT DE PIONS */
			/* ----------------------------- */


			console.log(row_win_indicator);
			/* ------------------ */
			/* DETECTION VICTOIRE */
			/* ------------------ */

			/* Initialisation variables detection victoire */
			player1_win = p1_color + "," + p1_color + "," + p1_color + "," + p1_color;
			player2_win = p2_color + "," + p2_color + "," + p2_color + "," + p2_color;
			diago1_win = ""
			diago2_win = ""
			diago1_win2 = ""
			diago2_win2 = ""
			string = ""
			string2 = ""
			boucle = x;
			col_i = 1;

			/* Position des points de départs et fin des diagonales */
			while (boucle >= 0) {
				diago_droit = $(".rows").children("div.row_" + (boucle) + "").find("span").eq(col_num - (boucle - col_indicator[col_num]));
				diago_gauche = $(".rows").children("div.row_" + (col_i) + "").find("span").eq(col_num - (boucle + col_indicator[col_num]) - 1);
				string += diago_gauche.attr('class');
				string2 += diago_droit.attr('class');

				diago_droit_top = $(".rows").children("div.row_" + (boucle - 1) + "").find("span").eq(col_num - (boucle - col_indicator[col_num] - 1));
				boucle--;
				col_i++;
			}

			diago_col = col_num - 0; // point départ diagonale
			limit = diago_col + 3; // limit diagonale

			while (diago_col <= limit) {
				diago1_win += "col_" + diago_col + " fill " + p1_color;
				diago2_win += "col_" + diago_col + " fill " + p2_color;
				diago_col++;
			}
			diago_col_inv = col_num - 3 // point de fin comme départ (inverse)
			limit_inv = diago_col_inv + 3 // point de debut comme fin
			while (diago_col_inv <= limit_inv) {
				diago1_win2 += "col_" + diago_col_inv + " fill " + p1_color;
				diago2_win2 += "col_" + diago_col_inv + " fill " + p2_color;
				diago_col_inv++
			}

			if($(obj).attr("style").indexOf("background-color:red") !== -1 && col_indicator[col_num] <= 0)
			{
				alert('ok')
			}

			/* Détection victoire diagonale */
			if (string.indexOf(diago1_win) !== -1 || string2.indexOf(diago1_win) !== -1 || string.indexOf(diago1_win2) !== -1 || string2.indexOf(diago1_win2) !== -1) {

				alert("Puissance 4 ! " + name_p1 + " a gagné (en diagonale) ");
				score_p1++;
				location.reload();
				window.localStorage.setItem("score_p1", score_p1);
			} else if (string.indexOf(diago2_win) !== -1 || string2.indexOf(diago2_win) !== -1 || string.indexOf(diago2_win2) !== -1 || string2.indexOf(diago2_win2) !== -1) {

				alert("Puissance 4 ! " + name_p2 + " a gagné (en diagonale) ");
				score_p2++;
				location.reload();
				window.localStorage.setItem("score_p2", score_p2);
			}
			/* Fin détection victoire diagonale */

			/* Detection victoire horizontale */
			while (a <= x - 1) {
				row = $(".row_" + a).find("span");
				if (row_win_indicator[a].toString().indexOf(player1_win) !== -1) {
					alert("Puissance 4 ! " + name_p1 + " a gagné (en horizontale)");
					location.reload();
					score_p1++;
					location.reload();
					window.localStorage.setItem("score_p1", score_p1);
				} else if (row_win_indicator[a].toString().indexOf(player2_win) !== -1) {
					alert('Puissance 4 ! ' + name_p2 + ' a gagné ! (en horizontale)')
					score_p2++;
					location.reload();
					window.localStorage.setItem("score_p2", score_p2);
				}
				a++;

			}
			/* Fin detection victoire horizontale */

			/* Détection victoire vertical */
			for (z = 0; z < y; z++) {
				for (e = 0; e < x; e++) {
					if (row_win_indicator[z][e] === p1_color && row_win_indicator[z + 1][e] === p1_color && row_win_indicator[z + 2][e] === p1_color && row_win_indicator[z + 3][e] === p1_color) {
						alert("Puissance 4 ! " + name_p1 + " a gagné (en vertical)");
						score_p1++;
						location.reload();
						window.localStorage.setItem("score_p1", score_p1);
					} else if (row_win_indicator[z][e] === p2_color && row_win_indicator[z + 1][e] === p2_color && row_win_indicator[z + 2][e] === p2_color && row_win_indicator[z + 3][e] === p2_color) {
						alert("Puissance 4 ! " + name_p2 + " a gagné (en vertical)");
						score_p2++;
						location.reload();
						window.localStorage.setItem("score_p2", score_p2);
					}
				}
			}
			/* Fin détection victoire vertical */

			/* ----------------------- */
			/* FIN DETECTION VICTOIRE */
			/* ----------------------- */


			/* Réinitialisation indicateur */
			row_indicator = [];

		};


		/* *********************************** */
		/* *                                 * */
		/* *          FIN FONCTIONS          * */
		/* *                                 * */
		/* *********************************** */

	};
})(jQuery);