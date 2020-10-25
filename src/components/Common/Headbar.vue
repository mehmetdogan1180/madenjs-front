<template>
  <div class="main-header">
    <div class="float-left">
      <a
        href="javascript:void(0)"
        style="font-size: 35px"
        @click="$store.dispatch('toggleSidebar')"
      >
        <i :class="[$store.getters.isSidebarCollapse ? 'el-icon-s-unfold':'el-icon-s-fold']"></i>
      </a>
    </div>
    <div class="float-right">
      <el-dropdown
      >
        <span class="el-dropdown-link">
          {{$store.getters.getUserInfo.name}}
          {{$store.getters.getUserInfo.surname}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu
          slot="dropdown"
          style="width: 200px"
        >
          <el-dropdown-item>
            <router-link
              :to="{name:'Profile'}"
            >
              Profil
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item
            divided
          >
            <a
              href="javascript:void(0)"
              @click="logout"
            >
              Çıkış Yap
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Headbar',
  methods: {
    logout() {
      this.$store.dispatch('authLogout').then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
};
</script>
