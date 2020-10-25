<template>
  <validation-provider :name="label" :rules="rules" v-slot="{ errors }">
    <el-form-item :class="{'is-error':errors[0]}">
      <el-checkbox
        v-model="val"
        @input="$emit('input', val)"
        v-bind="attrs"
      >
        {{label}}
      </el-checkbox>
      <div class="el-form-item__error">
        {{errors[0]}}
      </div>
    </el-form-item>
  </validation-provider>
</template>

<script>
export default {
  name: 'MDCheckbox',
  props: {
    value: {
      default: false,
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
      val: !!this.value,
    };
  },
  watch: {
    value(val) {
      this.val = !!val;
    },
  },
  created() {
    this.$emit('input', this.val);
  },
};
</script>

<style scoped>

</style>
