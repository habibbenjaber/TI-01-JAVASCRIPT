function validerForm() {

    //Cette variable donne L’état de validation du formulaire qui est par défaut true, il va passer à false si une information saisie n’est pas valide. 
    let formValide = true;


    // Initialiser à vide le contenue de divMessage permet d’effacer les messages affiche durant le dernier contrôle. 
    let divMessage = document.getElementById("divMessage");
    divMessage.innerHTML = "";

    // Vérifier la valeur saisie dans l’input Nom on commence par la récupération de son objet dans le DOM, en utilisant la méthode getElementById de l’objet document, qui nous donne accès a sa propriété value qu’on va passer à la fonction estAlphabetique
    let sNom = document.forms["formEtudiant"]["inTextNom"].value;
    if (sNom == "" || !estAlphabetique(sNom)) {
        divMessage.innerHTML = "<p> Nom invalide </p>";
        formValide = false;
    }

    let sPrenom = document.forms["formEtudiant"]["inTextPrenom"].value;
    if (sPrenom == "" || !estAlphabetique(sPrenom)) {
        divMessage.innerHTML += "<p> Prenom invalide </p>";
        formValide = false;
    }

    let sEmail = document.forms["formEtudiant"]["inTextEmail"].value;
    if (!estEmail(sEmail)) {
        divMessage.innerHTML += "<p> Email invalide  </p>";
        formValide = false;
    }

    let sAge = document.forms["formEtudiant"]["inTextAge"].value;
    if (!estNum(sAge)) {
        divMessage.innerHTML += "<p> Age invalide  </p>";
        formValide = false;
    }

    return formValide;
}
 

function estNum(chaine) {
    let i = 0;
    if(chaine.length == 0) return false;
    while (i < chaine.length && chaine.charCodeAt(i) >= 48 && chaine.charCodeAt(i) <= 57)
        i++;
    
    if(i == chaine.length) return true;
    return false;
}

/**
 * Cette fonction permet de vérifier si une chaine de caractère est alphabétique ou non.
 * L’idée est de mettre la chaine en majuscule ensuite de vérifier que le code ascii de 
 * chacun des caractères dans l’intervalle des codes ASCI [A..Z]
 * @param {chaine} chaine La chaine de caractères à contrôler.
 * @returns true si chaine est alphabitique 
 */
function estAlphabetique(chaine) {

    // 1.. Mettre la chaine en majuscule 
    chaine = chaine.toUpperCase();

    // 2.. vérifier que le code ascii de chacun des caractères dans l’intervalle des codes ASCII [A..Z]
    let i = 0;
    while (
        i < chaine.length &&
        ((chaine.charCodeAt(i) >= 'A'.charCodeAt(0) && chaine.charCodeAt(i) <= 'Z'.charCodeAt(0)) ||
            chaine.charCodeAt(i) == ' '.charCodeAt(0))
    )
        i++;
    if (i == chaine.length) return true;
    return false;
}

function estAlphaNumExtra(chaine) {

    // 1.. Mettre la chaine en majuscule 
   chaine = chaine.toUpperCase();
    


    // 2.. vérifier que le code ascii de chacun des caractères dans l’intervalle des codes ASCII [A..Z]
    let i = 0;
    while (
        i < chaine.length &&
        ((chaine.charCodeAt(i) >= 'A'.charCodeAt(0) && chaine.charCodeAt(i) <= 'Z'.charCodeAt(0)) ||
         (chaine.charCodeAt(i) >= '0'.charCodeAt(0) && chaine.charCodeAt(i) <= '9'.charCodeAt(0)) ||    
          chaine.charCodeAt(i) == ' '.charCodeAt(0) ||
          chaine.charCodeAt(i) == '.'.charCodeAt(0) ||
          chaine.charCodeAt(i) == '_'.charCodeAt(0))
    )
        i++;
    if (i == chaine.length) return true;
    return false;
}
/**
 * 
 * @param {*} chaine 
 */
function estEmail(chaine)
{
    // Récupérer la position de @
    let  posAt = chaine.indexOf('@');
    if(posAt == -1) return false;

    // Extraire le nom d'utilisateur et le domaine de l adresse email dont le format est nomUtili@serveurEmail
    let nomUtili = chaine.slice(0,posAt);
    let domaine = chaine.slice(posAt+1);

    // Le nom d'utilisateur et le nom du serveur ne doivent pas être vide
    if(nomUtili == '' || domaine == '') return false;

    // Le nom d'utilisateur doit être alphNumExtra
    if(!estAlphaNumExtra(nomUtili)) return false;

    // Extraire sousDomaine.premierDomaine ... Le nom du domaine doit être de la forme sousDomaine.premierDomaine
    let posPoint = domaine.lastIndexOf('.');

    // Erreur si pas de point
    if(posPoint == -1) return false;

    let sousDomaine = domaine.slice(0,posPoint);
    let premierDomaine = domaine.slice(posPoint+1);

    if(sousDomaine == '' || premierDomaine.length > 3 || premierDomaine.length < 2) return false;
    
    if(!estAlphaNumExtra(sousDomaine)) return false;
    return true;
    
}
