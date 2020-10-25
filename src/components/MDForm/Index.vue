<template>
  <validation-observer
    :class="'md-'+type+'-form'"
    v-slot="{handleSubmit}"
  >
    <el-form
      @submit.native.prevent="handleSubmit(submitForm)"
      :disabled="loading"
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
              :loading="loading"
              v-bind="cell"
            />
          </slot>
        </el-col>
      </el-row>
      <slot name="footer" :loading="loading"/>
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
      newModel: {},
      loading: false,
    };
  },
  props: {
    type: {
      type: String,
      default: 'basic',
    },
    schema: {
      type: Array,
      default: () => [],
    },
    submit: {
      type: Function,
      default: () => Promise.resolve([]),
    },
    value: {
      type: [Object, Array],
      default: () => {},
    },
  },
  computed: {
    getSchema() {
      // Grid sisteminde kullanabilmek için eğer array değilse array çeviriyoruz.
      return this.schema.map((value) => (value.length ? value : [value]));
    },
  },
  watch: {
    value(model) {
      this.model = model;
      this.createModel(this.getSchema);
    },
  },
  methods: {
    async submitForm() {
      // TODO: şemadaki name göre bir model oluşturulacak
      this.$emit('submit', this.model);
      this.loading = true;
      try {
        await this.submit(this.model);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    createModel(schema) {
      schema.reduce((p, c) => {
        try {
          if (Array.isArray(c)) {
            this.createModel(c);
          } else if (c.name) {
            if (!c.schema) {
              this.$set(this.newModel, c.name, this.value[c.name] || (this.value[c.name] === false ? false : ''));
            } else {
              this.$set(this.newModel, c.name, this.value[c.name] || this.value[c.name] || {});
            }
          }
        } catch (e) {
          console.log(e);
        }
        return p;
      }, {});
      // Sadece şemadaki alanları göndermek için ayıklanıyor
      this.model = this.newModel;
    },
  },
};
</script>

<style scoped>

</style>
