# Marvel Quiz

Marvel Quiz est une application de quiz interactive basée sur l'univers Marvel. Elle permet aux utilisateurs de tester leurs connaissances sur les personnages et les événements de l'univers Marvel.

## Fonctionnalités

- Inscription et connexion des utilisateurs
- Quiz interactif avec plusieurs niveaux de difficulté
- Affichage des scores et des pourcentages de réussite
- Système de progression avec des niveaux
- Affichage des réponses correctes et des informations supplémentaires sur les personnages Marvel
- Déconnexion sécurisée des utilisateurs

## Technologies utilisées

- **React** : Bibliothèque JavaScript pour la création d'interfaces utilisateur
- **Firebase** : Plateforme de développement d'applications pour l'authentification et la base de données
- **React Router** : Bibliothèque pour la gestion des routes dans une application React
- **React Icons** : Bibliothèque d'icônes pour React
- **React Toastify** : Bibliothèque pour les notifications toast dans React
- **React Tooltip** : Bibliothèque pour les tooltips dans React
- **Axios** : Bibliothèque pour les requêtes HTTP
- **Vite** : Outil de build pour les applications modernes

## Installation

1. Clonez le dépôt :
    ```bash
    git clone https://github.com/votre-utilisateur/marvel-quiz.git
    ```

2. Accédez au répertoire du projet :
    ```bash
    cd marvel-quiz
    ```

3. Installez les dépendances :
    ```bash
    npm install
    ```

4. Créez un fichier `.env` à la racine du projet et ajoutez vos clés API Firebase et Marvel :
    ```env
    VITE_REACT_APP_API_KEY=your_firebase_api_key
    VITE_REACT_APP_KEY_PUBLIC=your_marvel_public_key
    VITE_REACT_APP_KEY_PRIVATE=your_marvel_private_key
    VITE_REACT_APP_HASH=your_marvel_hash
    ```

## Scripts

- `npm run dev` : Démarre le serveur de développement
- `npm run build` : Compile l'application pour la production
- `npm run lint` : Lint le code source
- `npm run preview` : Prévisualise l'application de production

## Dépendances

```json
"dependencies": {
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-icons": "^5.4.0",
  "react-stepper-horizontal": "^1.0.11",
  "react-toastify": "^11.0.2",
  "react-tooltip": "^5.28.0"
},
"devDependencies": {
  "@eslint/js": "^9.17.0",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5",
  "@vitejs/plugin-react": "^4.3.4",
  "eslint": "^9.17.0",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "globals": "^15.14.0",
  "typescript": "~5.6.2",
  "typescript-eslint": "^8.18.2",
  "vite": "^6.0.5"
}
```
```bash
marvel_Quizz/
├── public/
│   ├── images/
│   │   ├── batman.png
│   │   ├── xmen.png
│   │   └── ...
│   └── index.html
├── src/
│   ├── components/
│   │   ├── app/
│   │   │   └── index.tsx
│   │   ├── errorPage/
│   │   │   └── index.tsx
│   │   ├── firebase/
│   │   │   └── firebaseConfig.js
│   │   ├── footer/
│   │   │   └── index.tsx
│   │   ├── forgetPassword/
│   │   │   └── index.tsx
│   │   ├── header/
│   │   │   └── index.tsx
│   │   ├── landing/
│   │   │   └── index.tsx
│   │   ├── levels/
│   │   │   └── index.tsx
│   │   ├── login/
│   │   │   └── index.tsx
│   │   ├── logout/
│   │   │   └── index.tsx
│   │   ├── modale/
│   │   │   └── index.tsx
│   │   ├── progessBar/
│   │   │   └── index.tsx
│   │   ├── quizz/
│   │   │   └── index.tsx
│   │   ├── quizzMarvel/
│   │   │   └── index.tsx
│   │   ├── quizOver/
│   │   │   └── index.tsx
│   │   ├── signUp/
│   │   │   └── index.tsx
│   │   ├── welcome/
│   │   │   └── index.tsx
│   │   └── ...
│   ├── App.css
│   ├── main.tsx
│   └── ...
├── .env
├── package.json
└── vite.config.ts
```

## Utilisation

```bash
npm run dev
```