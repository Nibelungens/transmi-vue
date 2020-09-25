import {mapGetters} from "vuex";
import keyStore from "@/constantes/key.store.const";

const IntervalMixin = {
    data() {
        return {
            interval: null
        }
    },
    mounted() {
        this.setInterval()
    },
    created() {
        this.$store.watch(() => this.$store.getters[keyStore.GET_TIME_REFRESH], this.setInterval)
    },
    computed: {
        ...mapGetters({timeRefresh: keyStore.GET_TIME_REFRESH})
    },
    methods: {
        setInterval() {
            if (this.interval != null) {
                clearInterval(this.interval);
            }

            this.interval = window.setInterval(() => {
                this.refresh();
            }, this.timeRefresh);
        },
        refresh() {
            console.log("non!")
        }
    }
}

export default IntervalMixin;