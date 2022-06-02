import {ConfigStore} from "../interfaces/config-store.data";

export const store = {
    namespaced: true,
    state() {
        return {
            refreshInterval: 1000,
            possibleRefreshIntervals: [1000, 5000, 10000, 20000, 30000]
        }
    },
    getters: {
        getRefreshInterval(state: ConfigStore): number {
            return state.refreshInterval;
        },
        getPossibleRefreshIntervals(state: ConfigStore): Array<number> {
            return state.possibleRefreshIntervals;
        }
    },
    mutations: {
        updateRefreshInterval(state: ConfigStore, payload: number) {
            state.refreshInterval = payload;
        }
    }
}