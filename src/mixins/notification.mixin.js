const NotificationMixin = {
    methods: {
        notificationSuccess(msg) {
            this.$bvToast.toast(msg, {
                variant: 'success',
                toaster: 'b-toaster-bottom-left',
                solid: true,
                noCloseButton: true
            })
        },
        notificationFail(msg) {
            this.$bvToast.toast(msg, {
                variant: 'error',
                toaster: 'b-toaster-bottom-left',
                solid: true,
                noCloseButton: true
            })
        }
    }
}

export default NotificationMixin;