import Notification from "@/store/module/class/notification.class";

export default {
    namespaced: true,
    state: {
        last: Notification.start(),
        history: []
    },
    getters: {
        getLast: s => s.last,
        getHistory: s => s.history
    },
    mutations: {
        /**
         * @param s
         * @param {Notification} notification
         */
        ADD_NOTIFICATION(s, notification) {
            s.last = notification;
            s.history.push(notification);
        }
    }
}