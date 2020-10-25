<template>
  <validation-provider :name="label" :rules="rules" v-slot="{ errors }" :vid="name">
    <el-form-item :label="label" :class="{'is-error':errors[0]}">
      <el-select
        v-model="val"
        :loading="loading"
        :placeholder="placeholder ? placeholder : label"
        @input="$emit('input', val)"
        @change="$emit('change',val)"
        v-bind="attrs"
      >
        <el-option
          v-for="item in items"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
      type: [Array, Object],
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
    name: {
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
  /* computed: {
    getOptions() {
      this.createOptions();
      return this.options;
    },
  },
  watch: {
    getOptions() { // Optiona gelen değişiklik olursa çalışacak
      this.createOptions();
    },
  }, */
  mounted() {
    this.createOptions();
  },
  methods: {
    async createOptions() {
      if (this.options.api) {
        this.loading = true;
        try {
          const { api } = this.options;
          const result = await this.$request({
            method: 'get',
            ...api.request,
          });
          this.items = result.map((row) => ({
            label: row[api.relations.label],
            value: row[api.relations.value],
          }));
        } catch (e) {
          console.log('createOption', e);
        } finally {
          this.loading = false;
        }
      }
    },
  },
  data() {
    return {
      loading: false,
      val: this.value,
      items: this.options,
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
