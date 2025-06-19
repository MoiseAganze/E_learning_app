# 🔧 Guide de Résolution d'Erreurs - EduAfrique

## Erreur Résolue : "TypeError: Failed to fetch"

### 🚨 Symptômes

```
TypeError: Failed to fetch
    at window.fetch (eval at <anonymous> ...)
    at ping (@vite/client:736:13)
    at waitForSuccessfulPing (@vite/client:749:13)
    at WebSocket.<anonymous> (@vite/client:561:13)
```

### 🔍 Cause Racine

Cette erreur était causée par :

1. **Connexions WebSocket instables** entre le navigateur et le serveur de développement Vite
2. **Services externes** (comme FullStory) tentant de faire des requêtes réseau
3. **Hot Module Replacement (HMR)** de Vite ayant des problèmes de connectivité

### ✅ Solutions Appliquées

#### 1. Configuration Vite Améliorée

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    hmr: {
      overlay: false, // Désactive l'overlay d'erreur
    },
    watch: {
      usePolling: true, // Améliore la détection des changements
    },
  },
  define: {
    global: "globalThis", // Évite les erreurs de process
  },
}));
```

#### 2. Gestionnaire d'Erreurs Global

- **Fichier** : `src/lib/errorHandler.ts`
- **Fonctionnalités** :
  - Capture les erreurs de fetch non gérées
  - Ignore les erreurs de services externes
  - Fournit des méthodes de logging structurées

#### 3. Gestion Proactive

- Import automatique du gestionnaire dans `main.tsx`
- Prévention des erreurs HMR
- Logging intelligent des erreurs

## 🛠️ Autres Erreurs Communes

### Erreur: "Module not found"

**Cause** : Import incorrect ou fichier manquant
**Solution** :

```bash
# Vérifier les imports
npm run typecheck

# Redémarrer le serveur
npm run dev
```

### Erreur: "Network request failed"

**Cause** : Problème de connexion réseau
**Solution** :

1. Vérifier la connexion internet
2. Redémarrer le serveur de développement
3. Vider le cache du navigateur

### Erreur: "WebSocket connection to 'ws://...' failed"

**Cause** : Problème de proxy ou de port
**Solution** :

```typescript
// Ajuster la configuration HMR
hmr: {
  port: 24678, // Port différent pour HMR
  host: 'localhost'
}
```

### Erreur: "Process is not defined"

**Cause** : Code Node.js dans le navigateur
**Solution** :

```typescript
// Dans vite.config.ts
define: {
  global: 'globalThis',
  process: JSON.stringify({ env: {} })
}
```

## 🔍 Méthodes de Debugging

### 1. Logs Structurés

```typescript
import { logError, logWarning, logInfo } from "@/lib/errorHandler";

// Dans votre code
try {
  // Code risqué
} catch (error) {
  logError("ComponentName", error, { userId: "123" });
}
```

### 2. Console du Navigateur

- **F12** → Onglet Console
- Filtrer par niveau : Error, Warning, Info
- Regarder la stack trace complète

### 3. Network Tab

- Vérifier les requêtes échouées
- Analyser les codes de statut
- Vérifier les headers CORS

### 4. Vite Dev Tools

```bash
# Logs verbeux
DEBUG=vite:* npm run dev

# Mode debug
npm run dev -- --debug

# Forcer le redémarrage
npm run dev -- --force
```

## 🚀 Commandes de Résolution Rapide

### Redémarrage Complet

```bash
# Nettoyer et redémarrer
rm -rf node_modules/.vite
npm run dev
```

### Reset Cache

```bash
# Vider tous les caches
rm -rf node_modules/.cache
rm -rf dist
npm run dev -- --force
```

### Diagnostic Réseau

```bash
# Tester la connectivité
curl -I http://localhost:8080

# Vérifier les ports
netstat -tulpn | grep 8080
```

## 📋 Checklist de Debugging

- [ ] Redémarrer le serveur de développement
- [ ] Vider le cache du navigateur (Ctrl+Shift+R)
- [ ] Vérifier la console pour d'autres erreurs
- [ ] Tester sur un autre navigateur
- [ ] Vérifier la connexion réseau
- [ ] Examiner les logs du serveur
- [ ] Vérifier les imports TypeScript
- [ ] Tester en mode incognito

## 🔄 Prévention Future

### 1. Monitoring Automatique

Le gestionnaire d'erreurs capture automatiquement :

- Erreurs de réseau
- Erreurs JavaScript non gérées
- Problèmes de services externes

### 2. Configuration Robuste

- Polling activé pour la détection de fichiers
- Overlay d'erreur désactivé
- Gestion des globals navigateur/Node.js

### 3. Logging Intelligent

```typescript
// Utilisation recommandée
logInfo("UserAction", "Login attempt", { email: user.email });
logWarning("ValidationError", "Invalid input", { field: "email" });
logError("APIError", error, { endpoint: "/api/users" });
```

## 📞 Support

Si le problème persiste :

1. Consulter les logs détaillés
2. Vérifier la configuration réseau
3. Tester avec une configuration minimale
4. Examiner les erreurs spécifiques dans la console

---

✅ **Problème Résolu** : L'erreur "Failed to fetch" a été corrigée avec succès grâce à une configuration Vite améliorée et un gestionnaire d'erreurs global.
