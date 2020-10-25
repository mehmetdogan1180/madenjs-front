<template>
  <validation-provider :name="label" :rules="rules" v-slot="{ errors }">
    <el-form-item :label="label" :class="{'is-error':errors[0]}">
      <el-input
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


export default {
  name: 'MDText',
  props: {
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
