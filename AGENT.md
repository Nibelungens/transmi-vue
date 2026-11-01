# Instructions pour les agents

## Présentation

Transmi(vue) est une interface web Vue 3 pour piloter un client BitTorrent Transmission. Elle communique avec le démon via son API RPC HTTP, généralement exposée sous `/api` par un proxy.

## Architecture et organisation

- `src/main.js` initialise Vue, Vuex, Vue I18n, BootstrapVueNext, les filtres globaux et l’intercepteur HTTP.
- `src/App.vue` compose l’interface principale, déclenche le rafraîchissement des torrents et récupère la configuration de session.
- `src/components/` contient les vues : liste et ligne de torrent, détails, menus, modales et éléments d’interface.
- `src/store/` contient le store Vuex et ses modules namespacés : `Torrents`, `Config`, `Token` et `Notification`.
- `src/services/api/` regroupe les services RPC (`torrent`, `queue`, `config`) et `api_parent.transmission.service.js` centralise les requêtes Axios.
- `src/services/class/` contient les classes qui construisent les arguments RPC ; `src/services/const/` définit les noms de méthodes RPC.
- `src/config/` contient l’intercepteur Axios et le bus d’événements. `src/constantes/` regroupe les clés Vuex, événements et valeurs du domaine.
- `src/mixins/` fournit les comportements réutilisés de rafraîchissement et de traitement des réponses.
- `src/filters/` contient les fonctions de formatage affichées par l’interface.
- `src/utils/` contient les utilitaires partagés ; `src/locales/` contient les messages de traduction.
- `tests/unit/` contient les tests Vitest ; `tests/tools/conponent.config.js` fournit des utilitaires de montage et de nettoyage des composants.
- `templates/nginx.conf.template`, `Dockerfile` et `compose/` concernent le déploiement.

## Flux de données et conventions

- Garder les appels Transmission dans `src/services/`, pas dans les composants. Ajouter ou modifier une opération dans le service adapté et utiliser les classes d’arguments existantes, plutôt que construire des payloads RPC ad hoc.
- Les requêtes utilisent `axios.post('/api', { method, arguments })`. Le proxy transforme `/api` en `/transmission/rpc`.
- L’intercepteur HTTP ajoute `x-transmission-session-id` et renouvelle le jeton puis rejoue la requête sur une réponse `409`.
- Lire et modifier l’état partagé via le store Vuex, ses getters et mutations namespacés. Suivre le module et les clés de `src/constantes/key.store.const.js`.
- Les mises à jour transversales de l’interface passent par le bus de `src/config/bus.event.js` et les événements de `src/constantes/event.const.js`. Désabonner les écouteurs et nettoyer les timers à la destruction des composants.
- Réutiliser les filtres de `src/filters/` pour le formatage et les mixins existants pour le rafraîchissement et le traitement des réponses.
- Le code est en JavaScript avec composants Vue `.vue` (pas TypeScript). Respecter le style et les conventions des fichiers voisins.
- Utiliser l’alias `@` pour les imports depuis `src/` et `@tests` pour les imports depuis `tests/`.
- L’interface et ses messages sont localisés avec Vue I18n ; les fichiers de langue sont chargés depuis `src/locales/`. La locale par défaut est `en`, configurable par `VITE_I18N_LOCALE` et `VITE_I18N_FALLBACK_LOCALE`.
- La configuration RPC de développement est dans `vite.config.js` (`server.proxy['/api']`). En production, Nginx utilise `templates/nginx.conf.template` et la variable `URL_TRANSMISION`.

## Technologies et commandes

Technologies principales : Vue 3, Vuex 4, Vue I18n, Axios, Bootstrap 5, BootstrapVueNext, Vite et Vitest.

Version Node.js : `^22.12.0 || ^24.0.0 || >=26.0.0`.

```sh
npm ci
npm run serve
npm run test:unit
npm run lint
npm run build
```

Pour cibler un test : `npm run test:unit -- tests/unit/components/NomDuTest.spec.js`.
