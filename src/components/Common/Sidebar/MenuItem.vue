<template>
  <div class="menu-wrap" v-if="!item.hidden">
    <router-link
      :to="{name: item.name}"
      v-if="!item.children"
    >
      <el-menu-item
        :index="item.name"
      >
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
        <span slot="title">
          {{item.meta.title}}
        </span>
      </el-menu-item>
    </router-link>
    <el-submenu
      v-else
      :popper-append-to-body="false"
      :index="item.name"
    >
      <template slot="title">
        <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
        <span slot="title">
        {{item.meta.title}}
      </span>
      </template>
      <menu-item
        v-for="cItem in item.children"
        :item="cItem"
        :key="cItem.name"
      />
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>

</style>
