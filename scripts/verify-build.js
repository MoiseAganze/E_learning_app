#!/usr/bin/env node

/**
 * Script de vérification du build pour déploiement Vercel
 * Vérifie que tous les fichiers nécessaires sont présents et corrects
 */

import fs from "fs";
import path from "path";

const DIST_DIR = "dist";
const REQUIRED_FILES = ["index.html", "assets"];

function checkFileExists(filePath) {
  const fullPath = path.join(DIST_DIR, filePath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Fichier manquant: ${filePath}`);
    return false;
  }
  console.log(`✅ Trouvé: ${filePath}`);
  return true;
}

function checkIndexHtml() {
  const indexPath = path.join(DIST_DIR, "index.html");
  const content = fs.readFileSync(indexPath, "utf8");

  // Vérifier que les assets sont correctement référencés
  const hasModuleScript = content.includes('type="module"');
  const hasAssets = content.includes("/assets/");
  const hasCorrectTitle = content.includes("EduAfrique");

  if (!hasModuleScript) {
    console.error("❌ Script module manquant dans index.html");
    return false;
  }

  if (!hasAssets) {
    console.error("❌ Références assets manquantes dans index.html");
    return false;
  }

  if (!hasCorrectTitle) {
    console.error("❌ Titre incorrect dans index.html");
    return false;
  }

  console.log("✅ index.html correctement configuré");
  return true;
}

function checkAssets() {
  const assetsDir = path.join(DIST_DIR, "assets");

  if (!fs.existsSync(assetsDir)) {
    console.error("❌ Dossier assets manquant");
    return false;
  }

  const files = fs.readdirSync(assetsDir);
  const jsFiles = files.filter((f) => f.endsWith(".js"));
  const cssFiles = files.filter((f) => f.endsWith(".css"));

  if (jsFiles.length === 0) {
    console.error("❌ Aucun fichier JS trouvé dans assets/");
    return false;
  }

  if (cssFiles.length === 0) {
    console.error("❌ Aucun fichier CSS trouvé dans assets/");
    return false;
  }

  console.log(
    `✅ Assets trouvés: ${jsFiles.length} JS, ${cssFiles.length} CSS`,
  );
  return true;
}

function checkVercelConfig() {
  if (!fs.existsSync("vercel.json")) {
    console.error("❌ vercel.json manquant");
    return false;
  }

  const config = JSON.parse(fs.readFileSync("vercel.json", "utf8"));

  // Vérifications critiques
  const checks = [
    { key: "framework", expected: "vite", actual: config.framework },
    {
      key: "outputDirectory",
      expected: "dist",
      actual: config.outputDirectory,
    },
    {
      key: "buildCommand",
      expected: "npm run build",
      actual: config.buildCommand,
    },
  ];

  let allGood = true;

  for (const check of checks) {
    if (check.actual !== check.expected) {
      console.error(
        `❌ vercel.json: ${check.key} = "${check.actual}", attendu: "${check.expected}"`,
      );
      allGood = false;
    } else {
      console.log(`✅ vercel.json: ${check.key} correct`);
    }
  }

  // Vérifier les rewrites
  if (!config.rewrites || config.rewrites.length === 0) {
    console.error("❌ vercel.json: rewrites manquants");
    allGood = false;
  } else {
    console.log("✅ vercel.json: rewrites configurés");
  }

  // Vérifier les headers
  if (!config.headers || config.headers.length === 0) {
    console.error("❌ vercel.json: headers MIME manquants");
    allGood = false;
  } else {
    console.log("✅ vercel.json: headers MIME configurés");
  }

  return allGood;
}

function main() {
  console.log("🔍 Vérification du build pour déploiement Vercel...\n");

  // Vérifier que le dossier dist existe
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`❌ Dossier de build manquant: ${DIST_DIR}`);
    console.error("💡 Exécutez: npm run build");
    process.exit(1);
  }

  let allChecks = true;

  // Vérifications des fichiers
  console.log("📁 Vérification des fichiers...");
  for (const file of REQUIRED_FILES) {
    if (!checkFileExists(file)) {
      allChecks = false;
    }
  }

  console.log("\n📄 Vérification index.html...");
  if (!checkIndexHtml()) {
    allChecks = false;
  }

  console.log("\n🎨 Vérification des assets...");
  if (!checkAssets()) {
    allChecks = false;
  }

  console.log("\n���️ Vérification configuration Vercel...");
  if (!checkVercelConfig()) {
    allChecks = false;
  }

  console.log("\n" + "=".repeat(50));

  if (allChecks) {
    console.log("✅ Toutes les vérifications sont passées !");
    console.log("🚀 Prêt pour le déploiement Vercel");
    console.log("\n💡 Commandes de déploiement:");
    console.log("   vercel --prod");
    console.log("   ou: git push (si connecté à Vercel)");
  } else {
    console.log("❌ Certaines vérifications ont échoué");
    console.log("🔧 Corrigez les erreurs avant de déployer");
    process.exit(1);
  }
}

main();
