# Système de Dashboards EduAfrique

Ce document décrit le système de dashboards intégré dans la plateforme EduAfrique, permettant à différents types d'utilisateurs d'accéder à leurs espaces personnalisés.

## 📋 Vue d'ensemble

Le système de dashboards comprend 4 types d'utilisateurs principaux, chacun avec son interface et ses fonctionnalités spécifiques :

1. **École/Administration** - Gestion complète de l'établissement
2. **Enseignants** - Espace pédagogique et de gestion de classes
3. **Élèves** - Espace d'apprentissage personnel
4. **Parents** - Suivi et communication

## 🎯 Fonctionnalités par type d'utilisateur

### 🏫 École/Administration (`/dashboard/ecole`)

- **Gestion des utilisateurs** : Création et gestion des comptes élèves, enseignants, parents
- **Structure scolaire** : Création des classes, niveaux, matières et emplois du temps
- **Attribution** : Assignation des enseignants aux classes
- **Résultats** : Publication des résultats, bulletins et appréciations
- **Communication** : Organisation de réunions, envoi de circulaires
- **Suivi** : Présences et performances générales
- **Gestion financière** : Abonnements et paiements

### 👨‍🏫 Enseignants (`/dashboard/enseignant`)

- **Contenu pédagogique** : Publication de cours (texte, fichiers, vidéos, liens)
- **Évaluations** : Création de devoirs, tests, examens avec dates limites
- **Notation** : Correction et notation des copies
- **Suivi** : Progression par élève et par classe
- **Planning** : Gestion de l'emploi du temps personnel
- **Communication** : Messagerie avec élèves et parents

### 👩‍🎓 Élèves (`/dashboard/eleve`)

- **Apprentissage** : Accès aux cours et ressources pédagogiques
- **Organisation** : Consultation de l'emploi du temps
- **Travail** : Réalisation des devoirs et passage des examens
- **Résultats** : Consultation des notes, bulletins et appréciations
- **Information** : Réception des notifications importantes
- **Interaction** : Participation aux sessions interactives

### 👨‍👩‍👦 Parents (`/dashboard/parent`)

- **Suivi scolaire** : Progression et résultats des enfants
- **Alertes** : Notifications d'absences, retards, devoirs non remis
- **Évaluations** : Consultation des bulletins et appréciations
- **Communication** : Participation aux réunions virtuelles
- **Gestion** : Mise à jour des informations personnelles
- **Calendrier** : Suivi du calendrier scolaire

## 🛠 Architecture technique

### Structure des fichiers

```
src/
├── components/dashboard/
│   ├── DashboardLayout.tsx     # Layout partagé
│   ├── Header.tsx              # En-tête commun
│   └── Sidebar.tsx             # Navigation latérale
├── pages/dashboard/
│   ├── EcoleDashboard.tsx      # Dashboard administration
│   ├── EnseignantDashboard.tsx # Dashboard enseignant
│   ├── EleveDashboard.tsx      # Dashboard élève
│   ├── ParentDashboard.tsx     # Dashboard parent
│   └── index.ts                # Exports groupés
├── pages/
│   └── DashboardSelector.tsx   # Page de sélection
└── App.tsx                     # Configuration des routes
```

### Routes configurées

- `/dashboard` - Sélection du type de dashboard
- `/dashboard/ecole` - Dashboard École/Administration
- `/dashboard/enseignant` - Dashboard Enseignant
- `/dashboard/eleve` - Dashboard Élève
- `/dashboard/parent` - Dashboard Parent

### Composants partagés

- **DashboardLayout** : Structure commune (header + sidebar + contenu)
- **Header** : Navigation supérieure avec recherche, notifications, profil
- **Sidebar** : Menu latéral adapté selon le type d'utilisateur

## 🎨 Design et UX

### Principes de design

- **Cohérence** : Utilisation du système de design existant (TailwindCSS + composants UI)
- **Responsive** : Adaptation parfaite mobile/desktop
- **Accessibilité** : Composants basés sur Radix UI
- **Performance** : Composants optimisés et légers

### Couleurs et iconographie

- **École** : Bleu (administration, sérieux)
- **Enseignant** : Vert (croissance, pédagogie)
- **Élève** : Violet (créativité, apprentissage)
- **Parent** : Orange (chaleur, famille)

### Navigation intuitive

- Menu latéral contextuel selon le rôle
- Fil d'Ariane pour l'orientation
- Actions rapides accessibles
- Notifications en temps réel

## 🚀 Utilisation

### Accès depuis la page d'accueil

1. Cliquer sur "Accéder aux dashboards" depuis la page d'accueil
2. Sélectionner le type de compte approprié
3. Naviguer vers le dashboard correspondant

### Navigation directe

Les URLs sont directement accessibles :

- `https://votresite.com/dashboard/ecole`
- `https://votresite.com/dashboard/enseignant`
- `https://votresite.com/dashboard/eleve`
- `https://votresite.com/dashboard/parent`

## 🔄 Extensions futures

Le système est conçu pour être facilement extensible :

- Ajout de nouveaux types d'utilisateurs
- Nouvelles fonctionnalités par dashboard
- Modules complémentaires
- Intégrations tierces

## 📊 Données et états

Actuellement, les dashboards utilisent des données mockées pour la démonstration. L'intégration avec une API backend permettra :

- Authentification et autorisation
- Données personnalisées par utilisateur
- Synchronisation en temps réel
- Persistance des actions utilisateur
