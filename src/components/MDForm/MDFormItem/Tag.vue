<template>
  <validation-provider :name="label" :rules="rules" v-slot="{ errors }">
    <el-form-item :label="label" :class="{'is-error':errors[0]}">
      <el-input-tag
        v-model="val"
        :placeholder="placeholder ? placeholder : label"
        @input="$emit('input', val)"
        v-bind="attrs"
      />
      <div class="el-form-item__error">
        {{errors[0]}}
      </div>
    </el-form-item>
  </validation-provider>
</template>

<script>

import ElInputTag from '@/components/Element/ElInputTag.vue';

export default {
  name: 'MDTag',
  components: {
    ElInputTag,
  },
  props: {
    value: {
      type: [Array],
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    attrs: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      val: this.value,
      items: this.val,
    };
  },
  watch: {
    value(val) {
      this.val = val;
    },
  },
};
</script>

<style scoped>

</style>
