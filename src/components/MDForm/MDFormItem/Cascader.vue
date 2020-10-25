<template>
  <validation-provider :name="label" :rules="rules" v-slot="{ errors }">
    <el-form-item :label="label" :class="{'is-error':errors[0]}">
      <el-cascader
        :placeholder="placeholder ? placeholder : label"
        :options="options"
        :props="{ multiple: true }"
        @input="$emit('input', val)"
        v-bind="attrs"
        filterable
      />
      <div class="el-form-item__error">
        {{errors[0]}}
      </div>
    </el-form-item>
  </validation-provider>
</template>

<script>
export default {
  name: 'MDTCascader',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: '',
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
