const event = {
    NOTIFICATION_SUCCESS: 'notification_success',
    NOTIFICATION_FAIL: 'notification_fail',
    NOTIFICATION_WARN: 'notification_warn',

    /**
     * Ouvre/Ferme le panneau de détail des torrents
     * @param none
     */
    SWITCH_INSPECTOR_PANEL: 'switch_inspector_panel',
    /**
     * Ouvre la fenetre d'ajout de torrents
     * @param none
     */
    REMOVE_MODAL_ADD_TORRENT: 'remove_modal_add_torrent',
    /**
     * Ouvre la fenetre d'ajout de torrents
     * @param none
     */
    OPEN_MODAL_ADD_TORRENT: 'open_modal_add_torrent',
    /**
     * Ouvre/Ferme le Menu 'Settings'
     * @param none
     */
    SWITCH_MENU_SETTINGS: 'switch_menu_settings',
    /**
     * Rafraichie la liste des torrents
     * @param none
     */
    REFRESH_LIST_TORRENT: 'refresh_list_torrent',
    /**
     * Ouvre la menu contextuel
     * @param event => Pour la position du menu sur la sourie
     * @param torrent => torrent de la ligne selectionnée
     */
    OPEN_CONTEXT_MENU: 'open_context_menu',

    /**
     * Deselectione tout les torrents
     * @param event => Pour désactiver sur certains id ('context-menu')
     */
    UNSELECTED_ALL_TORRENT: 'unselected',
    /**
     * Selectione tout les torrents
     * @param none
     */
    SELECT_ALL_TORRENT: 'select_all',
    /**
     * Selectionne une liste de torrents
     * @param torrents => Liste des torrents a slectionner
     */
    SELECTED: 'selected',
    /**
     * Supprime les torrents selectionnés
     * @param trash => si true, supprime egalement les fichiers
     */
    DELETE_SELECTED_TORRENT: 'deleteSelectedTorrent',

    REFRESH_FILES: 'refresh_files'
}

export default event;

