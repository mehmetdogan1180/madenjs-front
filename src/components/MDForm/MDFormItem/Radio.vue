<template>
  <validation-provider :name="label" :rules="rules" v-slot="{ errors }">
    <el-form-item :label="label" :class="{'is-error':errors[0]}">
      <el-radio-group
        v-model="val"
        @input="$emit('input', val)"
      >
        <el-radio
          v-for="item in options"
          :key="item.value"
          :label="item.value"
        >
          {{item.label}}
        </el-radio>
      </el-radio-group>
      <div class="el-form-item__error">
        {{errors[0]}}
      </div>
    </el-form-item>
  </validation-provider>
</template>

<script>
export default {
  name: 'MDSelect',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
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
