# Transmi(vue)

Transmi(vue) est une interface web pour piloter un client BitTorrent
[Transmission](https://transmissionbt.com/). L’application affiche les torrents
et leurs détails, et communique avec Transmission via son API RPC.

## Technologies principales

- Vue.js 3.5
- Vuex 4.1
- Vue I18n 9.14
- Bootstrap 5.3 et BootstrapVueNext 1.2
- Vite 7.1
- Vitest 5
- Axios 1.20
- Node.js 22.12+, 24.x ou 26+

## Développement local

Installez une version de Node.js prise en charge, puis les dépendances :

```sh
npm ci
```

Configurez la cible Transmission dans `vite.config.js`, dans
`server.proxy['/api'].target` (par exemple `http://localhost:9091`).
Le proxy transmet les requêtes `/api` à `/transmission/rpc`.

Démarrez le serveur de développement :

```sh
npm run serve
```

Vite affiche l’adresse locale dans le terminal. Pour les autres commandes :

```sh
npm run build       # Générer la version de production dans dist/
npm run lint        # Vérifier le code
npm run test:unit   # Lancer les tests unitaires
```

Les langues peuvent être définies avec les variables d’environnement
`VITE_I18N_LOCALE` et `VITE_I18N_FALLBACK_LOCALE` (anglais par défaut).
