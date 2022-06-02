import TorrentsStore from "../interfaces/list-torrents-store.data";
import Torrent from "../../data/torrent.data";

export const store = {
    namespaced: true,
    state() {
        return {
            torrents: Array<Torrent>
        }

    },
    getters: {
        getTorrents (state: TorrentsStore): Array<Torrent> {
            return state.torrents;
        }
    },
    mutations: {
        setListTorrent(state: TorrentsStore, payload: Array<Torrent>) {
            state.torrents = payload;
        }
    }
}

