# Guide de Démonstration EduAfrique

Ce guide vous permettra de tester toutes les fonctionnalités du système EduAfrique en utilisant les comptes de démonstration.

## 🚀 Accès Rapide

### Page d'accueil

- Visitez la page d'accueil
- Cliquez sur **"C'est parti"** pour accéder à la connexion
- Ou créez une nouvelle école avec **"Inscrire votre école"**

## 👥 Comptes de Démonstration

### 🏫 Administrateur École

- **Email**: `admin@ecolelumiere.edu`
- **Mot de passe**: `admin123`
- **Fonctionnalités testables**:
  - Vue d'ensemble de l'établissement
  - Gestion des utilisateurs (enseignants, élèves, parents)
  - Gestion des abonnements et facturation
  - Analyse des résultats scolaires
  - Navigation entre toutes les sections

### 👨‍🏫 Enseignant

- **Email**: `marie.diallo@ecolelumiere.edu`
- **Mot de passe**: `teacher123`
- **Profil**: Marie Diallo - Professeure de Mathématiques
- **Fonctionnalités testables**:
  - Tableau de bord enseignant
  - Gestion des classes (6ème A, 5ème B, 4ème C)
  - Suivi des devoirs et évaluations
  - Planning personnel
  - Progression des élèves

### 👩‍🎓 Élève

- **Email**: `aya.traore@student.ecolelumiere.edu`
- **Mot de passe**: `student123`
- **Profil**: Aya Traoré - Élève de 6ème A
- **Fonctionnalités testables**:
  - Dashboard personnel
  - Accès aux cours et matières
  - Devoirs à rendre
  - Consultation des notes
  - Emploi du temps

### 👨‍👩‍👦 Parent

- **Email**: `jean.traore@parent.ecolelumiere.edu`
- **Mot de passe**: `parent123`
- **Profil**: Jean Traoré - Parent d'Aya et Kofi
- **Fonctionnalités testables**:
  - Suivi de plusieurs enfants
  - Consultation des notes et bulletins
  - Notifications importantes
  - Communication avec l'école
  - Calendrier des événements

## 📱 Fonctionnalités à Tester

### Connexion

1. **Connexion classique**: Utilisez email + mot de passe
2. **Connexion démo rapide**: Cliquez sur les boutons démo (École, Enseignant, Élève, Parent)
3. **Redirection automatique**: Chaque type d'utilisateur est dirigé vers son dashboard approprié

### Inscription École (Nouvelle fonctionnalité)

1. Allez sur `/inscription-admin`
2. Remplissez le formulaire complet avec :
   - Informations administrateur
   - Informations de l'école
   - Informations du directeur
3. Le système crée automatiquement l'école ET le compte administrateur
4. Redirection automatique vers le dashboard école

### Navigation

- **Sidebar contextuelle**: Menu adapté au type d'utilisateur
- **Header unifié**: Recherche, notifications, profil
- **Navigation fluide**: Changement de sections sans rechargement

## 🔍 Données de Test Disponibles

### École Lumière

- **Lieu**: Abidjan, Côte d'Ivoire
- **Type**: Collège Lycée
- **Élèves**: 1,247 élèves
- **Enseignants**: 89 professeurs
- **Classes**: 42 classes actives

### Utilisateurs Fictifs

- **2 Enseignants**: Marie Diallo (Math), Kofi Ouattara (Histoire-Géo)
- **2 Élèves**: Aya Traoré (6ème A), Kofi Traoré (3ème B)
- **1 Parent**: Jean Traoré (parent des 2 élèves)

### Données Pédagogiques

- **8 Matières**: Mathématiques, Français, Anglais, Sciences, Histoire, Géographie, Physique, Chimie
- **5 Classes**: 6ème A, 5ème B, 4ème C, 3ème B, Terminale C
- **Notes et évaluations**: Système complet avec devoirs, contrôles, TP
- **Abonnements**: 3 plans (Basique, Standard, Premium)

## 🎯 Scénarios de Test Recommandés

### Scénario 1: Administrateur École

1. Connectez-vous comme admin
2. Explorez la vue d'ensemble (statistiques, activités récentes)
3. Allez dans "Gestion des utilisateurs"
   - Ajoutez un nouvel enseignant
   - Filtrez et recherchez des utilisateurs
   - Supprimez un utilisateur test
4. Visitez "Abonnements"
   - Consultez l'abonnement actuel
   - Explorez les plans disponibles
   - Testez un changement de plan
5. Analysez "Résultats"
   - Vue d'ensemble des performances
   - Résultats par classe et par matière
   - Évaluations récentes avec filtres

### Scénario 2: Enseignant

1. Connectez-vous comme Marie Diallo
2. Consultez les statistiques (classes, cours, devoirs)
3. Explorez vos classes assignées
4. Vérifiez le planning du jour
5. Naviguez entre les différentes sections

### Scénario 3: Élève

1. Connectez-vous comme Aya Traoré
2. Consultez vos matières et progressions
3. Vérifiez les devoirs à rendre
4. Consultez l'emploi du temps
5. Explorez vos notes par matière

### Scénario 4: Parent

1. Connectez-vous comme Jean Traoré
2. Consultez le tableau de bord des 2 enfants
3. Vérifiez les notifications récentes
4. Consultez les événements à venir
5. Analysez les progressions par enfant

### Scénario 5: Inscription Nouvelle École

1. Allez sur la page d'inscription admin
2. Remplissez complètement le formulaire
3. Vérifiez la création automatique et la redirection
4. Explorez le nouveau compte créé

## 📊 Points Forts à Démontrer

### Interface Utilisateur

- **Design moderne** et responsive
- **Navigation intuitive** avec sidebars contextuelles
- **Couleurs thématiques** par type d'utilisateur
- **Composants uniformes** basés sur Radix UI

### Fonctionnalités Métier

- **Gestion complète** des établissements scolaires
- **Suivi pédagogique** détaillé
- **Communication** entre tous les acteurs
- **Analyses** et statistiques avancées

### Aspects Techniques

- **TypeScript** pour la robustesse
- **React Router** pour la navigation
- **Données JSON** simulant une vraie base de données
- **Services** structurés pour l'authentification et les données
- **localStorage** pour la persistance de session

## 🛠 Fonctionnalités Avancées

### Authentification

- Connexion sécurisée avec validation
- Session persistante avec localStorage
- Redirection automatique selon le type d'utilisateur
- Déconnexion propre

### Gestion des Données

- Services structurés pour les données
- Simulation d'API avec délais réalistes
- CRUD complet pour les utilisateurs
- Calculs automatiques de statistiques

### Expérience Utilisateur

- Toasts pour les notifications
- Loading states pendant les opérations
- Validation de formulaires
- Navigation breadcrumb

## 🎨 Personnalisation

Le système est conçu pour être facilement personnalisable :

- Couleurs et thèmes dans `tailwind.config.ts`
- Composants UI réutilisables
- Structure modulaire des dashboards
- Services de données facilement adaptables

## 📱 Responsivité

Testez sur différentes tailles d'écran :

- **Desktop**: Expérience complète
- **Tablet**: Navigation adaptée
- **Mobile**: Interface optimisée

---

**Bon test ! 🚀**

Le système EduAfrique est maintenant prêt pour une démonstration complète avec toutes les fonctionnalités opérationnelles.
