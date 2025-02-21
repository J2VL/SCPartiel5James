# Refactoring de l'Exercice 1

## Problèmes Identifiés dans le Code Legacy

### 1. **Violation du SRP (Single Responsibility Principle)**

- La classe `DeliveryService` gérait à la fois :
  - Le calcul du prix de la livraison.
  - L'impression de la facture.
- **Problème** : Une classe doit avoir une seule responsabilité pour faciliter la maintenance et l’évolution du code.

### 2. **Violation du OCP (Open/Closed Principle)**

- La logique des réductions (`VIP`, `Business`, etc.) était codée en dur.
- **Problème** : Ajouter une nouvelle réduction nécessitait de modifier `calculateDeliveryPrice`, augmentant ainsi les risques de bugs.

### 3. **Violation du LSP (Liskov Substitution Principle)**

- `printInvoice` dépendait de `calculateDeliveryPrice` sans vérification de compatibilité.
- **Problème** : Modifier une méthode pouvait casser le comportement attendu ailleurs.

### 4. **Violation du ISP (Interface Segregation Principle)**

- Une classe qui calcule le prix ne devrait pas être obligée d’implémenter des fonctionnalités d’impression.
- **Problème** : Un couplage inutile entre des fonctionnalités distinctes.

### 5. **Violation du DIP (Dependency Inversion Principle)**

- `DeliveryService` dépendait directement des détails d’implémentation des réductions et de l’impression.
- **Problème** : Il était difficile de modifier ou tester indépendamment ces fonctionnalités.

---

## Modifications Apportées

### ✅ Séparation des responsabilités

- **Création de plusieurs classes dédiées :**
  - `DeliveryPriceCalculator` : Gère uniquement le calcul du prix.
  - `DiscountStrategy` (Interface) : Permet d’ajouter facilement de nouvelles stratégies de réduction.
  - `InvoicePrinter` : Responsable de l’impression de la facture.

### ✅ Respect du principe OCP

- **Introduction de l’interface `DiscountStrategy`** pour appliquer des réductions sans modifier `DeliveryPriceCalculator`.
- **Ajout de classes spécifiques pour chaque réduction** (`VIPDiscount`, `BusinessDiscount`, `NoDiscount`).

### ✅ Respect du principe LSP

- **Les stratégies de réduction sont interchangeables** et fonctionnent indépendamment sans affecter d’autres parties du code.

### ✅ Respect du principe ISP

- **Suppression de l’impression dans `DeliveryPriceCalculator`**, la facture est gérée séparément.

### ✅ Respect du principe DIP

- **Injection de dépendances** : `DeliveryPriceCalculator` ne dépend plus d’implémentations concrètes mais d’une abstraction (`DiscountStrategy`).

---

## Bénéfices du Nouveau Code

- **Meilleure modularité** : Chaque classe a une seule responsabilité.
- **Facilité d’extension** : Ajouter une nouvelle réduction ne nécessite pas de modifier le code existant.
- **Facilité de test** : Les classes sont indépendantes, ce qui facilite les tests unitaires.
- **Maintenance simplifiée** : Moins de couplage entre les différentes fonctionnalités.
