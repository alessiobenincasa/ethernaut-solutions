# Level 3: CoinFlip - Vulnérabilité de Prédictibilité

## Objectif
Gagner 10 lancers de pièce consécutifs en devinant correctement le résultat.

## Vulnérabilité
Le contrat utilise le hash du bloc précédent comme source d'aléatoire, une pratique dangereuse car ces valeurs sont publiques et prévisibles.

### Points clés de sécurité
- `blockhash(block.number - 1)` est accessible à tous
- Les calculs sur la blockchain sont déterministes
- Tout "hasard" basé sur des données blockchain est prévisible

## Exploitation
L'attaque consiste à:
1. Reproduire exactement le même calcul que le contrat cible
2. Utiliser le résultat pour "deviner" correctement
3. Répéter 10 fois (un appel par bloc)

## Impact en conditions réelles
Cette vulnérabilité pourrait compromettre:
- Systèmes de loterie
- Génération de NFT
- Distribution aléatoire de récompenses
- Mécaniques de jeu

## Solution recommandée
Pour un véritable aléatoire en blockchain:
- Utiliser Chainlink VRF
- Implémenter un schéma commit-reveal
- Combiner plusieurs sources d'entropie externes

## Leçon apprise
Ne jamais utiliser des données blockchain comme seule source d'aléatoire. La nature publique et déterministe de la blockchain rend ces valeurs prévisibles.