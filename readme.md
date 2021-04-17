## WorkshopScrapping with pupetteer

Le workshop se fera uniquement en node js via pupetteer pour des raisons de connaissance des intervenants, mais aussi de vitesse et de possibilité.  
Vous devez donc installer node js, je recommande la V12 ou V14.  
Puppetter utilise chromium, merci de l'installer et de ne pas utiliser d'autre npm que ceux mis dans le index.js  
Télécharger le repo git, utiliser la partie exercice, vous n'aurez qu'à faire un `npm i` dans le dossier pour installer les librairies.  
Pour lancer le script `node index.js`  
Dans index.js, il y a par défaut du code, remplir args: [] par un user agent. (man google)
Si vous avez des questions venez nous voir, pareil si vous restez bloqué.

### Pour commencer le workshop, vous devrez faire un premier exercice:

Vous devrez afficher dans votre console la description d'un hero de league of legends via cet url:
https://euw.leagueoflegends.com/fr-fr/champions/  
Puis lancer votre programme node un argument qui sera le nom du héro que vous ajouterez à la fin de l'url pour aller sur sa page.  
Vous devrez ensuite cliquer sur le bouton voir plus de sa description et récupérer le texte :)

### Pour la suite du workshop, vous avez le choix entre 3 sujets:

(Attention au cloudflare de nationsglory mettre un timeout de 6sec)

- 1 Faire la liste des pays en sous power sur nationsGlory (minecraft)
- 2 Faire la liste des membres de plusieurs pays sur nationsGlory (minecraft)
- 3 Récupérer les données d'un joueur overwatch via le site : https://playoverwatch.com/

Pour tout les sujets, vous devez save les données obtenu dans un fichier .md avec un rendu "Correct".

## 1 projet UnderPower nationsGlory

Votre but est de récupérer la liste des pays en sous power afin de savoir quel pays pillé.  
Vous devrez chercher la liste des pays puis comparer les claims au power.  
Claims > power = underPower  
Voici le lien à utiliser dans ce workshop, cherchez bien ;)  
https://nationsglory.fr/server/blue

## 2 projet For The Horde nationsGlory

Créer un .env et mettez y ça:

> `COUNTRY=EmpireJamaicain,Jamaique,EmpireAdaman,EmpireCentreAfricain,CentreAfrique,EmpireCamerounais,Cameroun,PortoRico,EmpirePortoRicain,Ghana,RDCongo,EmpireRDcongo`

A partir de la liste des pays donné (d'une alliance "la Horde"), vous devrez faire la liste des membres et afficher quelques informations du pays (à vous de voir)  
Voici le lien à utiliser dans ce workshop, cherchez bien ;)  
https://nationsglory.fr/server/blue

## 3 projet data on players overwatch

Vous devrez récupéré les informations d'un joueur overwatch, si vous n'avez pas de nom de joueur, utilisez celui de Emma: Emma#23116  
Vous devrez mettre dans votre .md le nom, l'avatar, le nombre de parties gagnées, les listes de top heroes sous formes de tableaux de : Temps joués, partie gagnés, Multi kill-Best.  
Voici le lien à utiliser dans ce workshop, cherchez bien ;)  
https://playoverwatch.com/en-us/search/?q=
