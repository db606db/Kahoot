
# Kahoot IA Auto Answer

Cette extension Chrome lit automatiquement la question d’un Kahoot et utilise OpenAI pour afficher la réponse suggérée dans un cadre visuel. À vous de cliquer.

## ✅ Installation sur Kali Linux

1. Lance Chrome ou Chromium avec :
```bash
google-chrome --enable-features=ExtensionManifestV3
# ou
chromium --enable-features=ExtensionManifestV3
```

2. Va sur `chrome://extensions`  
3. Active le **mode développeur**  
4. Clique sur **"Charger l’extension non empaquetée"**  
5. Sélectionne le dossier extrait de ce ZIP

## 🎯 Utilisation

1. Ouvre un quiz sur Kahoot
2. Clic droit > "Inspecter" > Console (optionnel pour logs)
3. Utilise un bouton (bientôt dans popup) ou raccourci pour déclencher la réponse IA
4. Regarde la réponse dans la bulle flottante

## 🔐 Sécurité

Ta clé API est stockée localement dans `config.js` et n’est jamais envoyée ailleurs que vers l'API OpenAI.
