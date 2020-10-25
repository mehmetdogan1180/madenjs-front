<template>
    <div
      :class="{'collapse':$store.getters.isSidebarCollapse}"
      class="min-h-100vh"
    >
      <div class="close-sidebar" @click="$store.dispatch('toggleSidebar',true)"></div>
      <sidebar/>
      <div class="main-container">
        <headbar></headbar>
        <sub-headbar></sub-headbar>
        <div class="main-content">
          <router-view/>
        </div>
      </div>
    </div>
</template>

<script>
const sidebar = () => import('@/components/Common/Sidebar');
const headbar = () => import('@/components/Common/Headbar');
const subHeadbar = () => import('@/components/Common/SubHeadbar');
export default {
  name: 'Dashboard',
  components: {
    sidebar,
    headbar,
    subHeadbar,
  },
  created() {
    this.$store.dispatch('authInfo');
    this.initMonitoring();
  },
  computed: {
  },
  methods: {
    async initMonitoring() {
      try {
        await this.$store.dispatch('init');
        this.$socket.on('ibeaconConnected', (ibeaconId) => {
          this.$store.dispatch('ibeaconConnected', ibeaconId);
        });
        this.$socket.on('ibeaconDisconnected', (ibeaconId) => {
          this.$store.dispatch('ibeaconDisconnected', ibeaconId);
        });
        this.$socket.on('changedTrackerLocation', (payload) => {
          this.$store.dispatch('changedTrackerLocation', payload);
        });
        /* setInterval(() => {
          this.$store.dispatch('changedTrackerLocation', {
            ibeacon_id: this.getRndInteger(1, 4),
            tracker_id: this.getRndInteger(5, 8),
          });
        }, 4000); */
      } catch (e) {
        // this.$message.error(e.message);
        console.log(e);
      }
    },
    getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
};
</script>
