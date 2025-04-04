# Level 0: Hello Ethernaut

## Objectif
Comprendre les mécanismes de base d'interaction avec les smart contracts et se familiariser avec l'environnement Ethernaut.

## Analyse du contrat
Ce niveau est un tutoriel qui nécessite de suivre une série d'indices à travers différentes fonctions du contrat. Bien qu'il ne présente pas de vulnérabilité réelle, il enseigne les fondamentaux de l'interaction avec un contrat via la console.

## Exploit
L'exploitation consiste à suivre une chaîne d'appels de fonction qui mène finalement à une fonction d'authentification:

1. Appeler `info()` → Renvoie vers `info1()`
2. Appeler `info1()` → Suggère d'appeler `info2("hello")`
3. Appeler `info2("hello")` → Indique que `infoNum()` contient le numéro de la prochaine fonction
4. Appeler `infoNum()` → Renvoie 42
5. Appeler `info42()` → Indique que "theMethodName" est le nom de la prochaine fonction
6. Appeler `theMethodName()` → Indique `method7123949()`
7. Appeler `method7123949()` → Révèle qu'un mot de passe doit être soumis à `authenticate()`
8. Appeler `password()` → Obtenir le mot de passe
9. Appeler `authenticate(password)` → Résout le niveau

## Code d'exploitation
Voir `solution.js` pour le code d'exploitation complet.

## Leçons de sécurité
Bien que ce niveau soit un tutoriel, il illustre l'importance de:
- Ne pas stocker de secrets (comme des mots de passe) dans le bytecode d'un contrat
- Être conscient de toutes les fonctions publiques d'un contrat
- Comprendre que toutes les données d'un contrat sont visibles sur la blockchain

## Application dans le monde réel
En conditions réelles, les secrets stockés dans un smart contract peuvent être extraits facilement, ce qui compromet la sécurité. Ce niveau introduit le concept d'analyse de contrat pour découvrir des fonctionnalités cachées.