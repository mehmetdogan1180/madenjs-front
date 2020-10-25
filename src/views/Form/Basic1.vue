<template>
  <el-card
    class="box-card"
    v-loading="loading"
  >
    <div slot="header" class="clearfix">
      <span class="card-title">
        {{title}}
      </span>
    </div>
    <md-form
    :schema="schema"
    v-model="model"
    :api="api"
    @submit="handleSubmit"
    @success="handleSuccess"
    >
      <template slot="footer" scope="{loading}">
        <div class="card-footer" style="text-align: right">
          <el-button
            v-if="cancel !== false"
            @click="handleCancel"
          >
            İptal
          </el-button>
          <el-button
            type="primary"
            :loading="loading"
            native-type="submit"
          >
            Kaydet
          </el-button>
        </div>
      </template>
    </md-form>
  </el-card>
</template>

<script>
const MdForm = () => import('@/components/MDForm/Index');
export default {
  name: 'BasicForm',
  components: {
    MdForm,
  },
  async mounted() {
    this.loading = true;
    const { form, api } = await import(`@/api/${this.$route.meta.configName}`);
    this.schema = form.schema; // Form şeması
    this.api = api; // Api = create
    this.loading = false;
  },
  data() {
    return {
      schema: [],
      model: {},
      title: this.$route.meta.title ? this.$route.meta.title : this.$route.meta.label,
      loading: false,
      api: {},
      cancel: this.$router.resolve({ name: `${this.$route.meta.configName}List` }).resolved.matched.length,
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.$route);
      // console.log(this.model);
      // console.log(this.api.create);
    },
    handleCancel() {
      if (this.$router.resolve({ name: `${this.$route.meta.configName}List` }).resolved.matched.length) {
        this.$router.push({ name: `${this.$route.meta.configName}List` });
      }
    },
    handleSuccess() {
      if (this.$router.resolve({ name: `${this.$route.meta.configName}List` }).resolved.matched.length) {
        this.$router.push({ name: `${this.$route.meta.configName}List` });
      }
    },
  },
};
</script>

<style scoped>

</style>
