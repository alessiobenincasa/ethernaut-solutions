# Level 2: Fallout

## Objectif
Prendre le contrôle du contrat en devenant son propriétaire.

## Vulnérabilité
Ce niveau présente une vulnérabilité subtile mais critique: une erreur typographique dans ce qui devrait être le constructeur du contrat.

Dans Solidity 0.6.0 (la version utilisée), un constructeur peut être défini de deux façons:
1. Avec le mot-clé `constructor()`
2. Avec une fonction portant **exactement** le même nom que le contrat

Dans ce contrat, la fonction censée être le constructeur est nommée `Fal1out()` (avec un "1" au lieu d'un "l"), alors que le contrat s'appelle `Fallout`. En conséquence, cette fonction n'est PAS un constructeur, mais une fonction publique standard que n'importe qui peut appeler.

```solidity
/* constructor */
function Fal1out() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
}
```

Ce commentaire `/* constructor */` indique l'intention du développeur, mais le code ne correspond pas à cette intention à cause de l'erreur typographique.

## Exploit
L'exploitation est simple: il suffit d'appeler la fonction `Fal1out()`, qui définit `msg.sender` (nous) comme propriétaire. Aucune condition ou restriction n'est imposée sur cette fonction.

## Impact en conditions réelles
Cette vulnérabilité illustre comment une simple erreur typographique peut avoir des conséquences catastrophiques en matière de sécurité. Dans un contrat réel, cela permettrait à n'importe qui de prendre le contrôle administratif complet, probablement conduisant à la perte de tous les fonds.

De telles erreurs se sont produites dans des contrats réels et ont conduit à des pertes significatives.

## Correction recommandée
Deux options pour corriger ce problème:

### Option 1: Utiliser la syntaxe moderne (recommandée)
```solidity
constructor() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
}
```

### Option 2: Corriger le nom pour correspondre exactement au contrat
```solidity
function Fallout() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
}
```

## Leçons de sécurité
1. Les erreurs typographiques peuvent être critiques en matière de sécurité
2. Toujours utiliser la syntaxe moderne des constructeurs avec le mot-clé `constructor`
3. Vérifier soigneusement les noms des fonctions, surtout pour les fonctions critiques
4. Les commentaires ne changent pas le comportement du code - le code s'exécute comme écrit, pas comme commenté