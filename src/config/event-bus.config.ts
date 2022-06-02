import {InjectionKey} from "vue";
import mitt, {Emitter} from "mitt";

export const key: InjectionKey<Emitter<any>> = Symbol();
export const bus = mitt();

export const refreshTorrents = 'REFRESH_TORRENTS';