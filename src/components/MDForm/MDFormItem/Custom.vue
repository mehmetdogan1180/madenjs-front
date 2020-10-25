<template>
  <span
    v-bind="attrs"
    v-html="content"
  />
</template>

<script>
export default {
  name: 'MDCustom',
  props: {
    content: {
      type: String,
      default: '',
    },
    attrs: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>

</style>
