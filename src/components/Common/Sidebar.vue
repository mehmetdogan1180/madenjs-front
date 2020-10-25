<template>
  <div
    class="sidebar-container"
  >
    <div class="sidebar-header">
      mdJS
    </div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :unique-opened="true"
        :collapse="$store.getters.isSidebarCollapse"
      >
        <menu-item
          v-for="item in menu"
          :item="item"
          :key="item.name"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import MenuItem from '@/components/Common/Sidebar/MenuItem.vue';
import { routeMap } from '@/router';

export default {
  name: 'Sidebar',
  components: {
    MenuItem,
  },
  computed: {
    activeMenu() {
      return this.$route.name;
    },
  },
  mounted() {
    const ww = window.innerWidth;
    if (ww <= 768) { // Mobilde her zaman sidebar kapalı olarak açılacak
      this.$store.dispatch('toggleSidebar', true);
    }
  },
  data() {
    return {
      collapse: this.$store.getters.isSidebarCollapse,
      menu: routeMap,
    };
  },
};
</script>
