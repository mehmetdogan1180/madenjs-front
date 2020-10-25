<template>
  <validation-observer
    :class="'md-'+type+'-form'"
    v-slot="{handleSubmit}"
  >
    <el-form
      @submit.native.prevent="handleSubmit(submitForm)"
      @input="$emit('input',model)"
      :disabled="formLoading"
    >
      <slot name="formHeader"/>
      <el-row
        :gutter="15"
        v-for="(colunm,rIndex) in getSchema"
        :key="rIndex"
      >
        <el-col
          v-for="(cell,cIndex) in colunm"
          :key="rIndex + '_' + cIndex"
          :md="Math.floor(24/colunm.length)"
        >
            <slot :name="cell.name" :cell="cell">
              <component
                :is="'md-' + (cell.type ? cell.type : 'text')"
                v-model="model[cell.name]"
                @input="$emit('input',model)"
                :loading="formLoading"
                v-bind="cell"
              />
            </slot>
        </el-col>
      </el-row>
      <slot name="footer" :loading="formLoading" v-if="footer">
        <el-button
          type="primary"
          :loading="formLoading"
          native-type="submit"
        >
          Kaydet
        </el-button>
      </slot>
    </el-form>
  </validation-observer>
</template>
<script>
const MdText = () => import('@/components/MDForm/MDFormItem/Text');
const MdDivider = () => import('@/components/MDForm/MDFormItem/Divider');
const MdSubmit = () => import('@/components/MDForm/MDFormItem/Submit');
const MdCheckbox = () => import('@/components/MDForm/MDFormItem/Checkbox');
const MdCustom = () => import('@/components/MDForm/MDFormItem/Custom');
const MdPassword = () => import('@/components/MDForm/MDFormItem/Password');
const MdCascader = () => import('@/components/MDForm/MDFormItem/Cascader');
const MdSelect = () => import('@/components/MDForm/MDFormItem/Select');
const MdDateTime = () => import('@/components/MDForm/MDFormItem/DateTime');
const MdTextarea = () => import('@/components/MDForm/MDFormItem/Textarea');
const MdMask = () => import('@/components/MDForm/MDFormItem/Mask');
const MdUpload = () => import('@/components/MDForm/MDFormItem/Upload');
const MdDate = () => import('@/components/MDForm/MDFormItem/Date');
const MdNumber = () => import('@/components/MDForm/MDFormItem/Number');
const MdRadio = () => import('@/components/MDForm/MDFormItem/Radio');
const MdTag = () => import('@/components/MDForm/MDFormItem/Tag');
export default {
  name: 'MDForm',
  components: {
    MdText,
    MdDivider,
    MdSubmit,
    MdCheckbox,
    MdCustom,
    MdPassword,
    MdCascader,
    MdSelect,
    MdDateTime,
    MdTextarea,
    MdMask,
    MdUpload,
    MdDate,
    MdNumber,
    MdRadio,
    MdTag,
  },
  data() {
    return {
      model: this.value,
      formLoading: this.loading,
      createRequest: false,
    };
  },
  props: {
    name: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'basic',
    },
    value: {
      type: Object,
      default: () => {
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
    schema: {
      type: Array,
      default: () => [],
    },
    footer: {
      type: Boolean,
      default: true,
    },
    api: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    async submitForm() {
      this.formLoading = true;
      try {
        if (this.createRequest) {
          const result = await this.$request({
            ...this.createRequest,
            data: this.model,
          });
          this.$message.success(result);
          this.$emit('success');
        }
      } catch (e) {
        console.log(e);
        this.$emit('fail');
      }
      this.$emit('submit');
      this.formLoading = false;
    },
    createModel(schema) {
      return schema.reduce((p, c) => {
        let n = p;
        if (c.length) {
          n = { ...n, ...this.createModel(c) };
        } else if (c.name) {
          n[c.name] = (this.model[c.name] ? this.model[c.name] : '');
        }
        return n;
      }, {});
    },
    createApiRequests() {
      try {
        if (this.getApi.create) {
          this.createRequest = {
            method: 'post',
            ...this.getApi.create,
          };
        }
      } catch (e) {
        console.log('createAPi', e);
      }
    },
  },
  computed: {
    getSchema() {
      // Grid sisteminde kullanabilmek için eğer array değilse array çeviriyoruz.
      return this.schema.map((value) => (value.length ? value : [value]));
    },
    getModel: {
      get() {
        return this.value;
      },
    },
    getApi() {
      return this.api;
    },
  },
  watch: {
    getApi() {
      this.createApiRequests();
    },
  },
  created() {
    this.createApiRequests();
  },
};
</script>

<style scoped>

</style>
