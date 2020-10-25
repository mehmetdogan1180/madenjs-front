<template>
  <el-card
    class="box-card"
    v-loading="page.loading"
  >
    <div slot="header" class="clearfix">
      <span class="card-title">
        {{page.title}}
      </span>
    </div>
    <md-form
      :schema="form.schema"
      v-model="form.model"
      :submit="submit"
    >
      <template slot="footer" scope="{loading}">
        <div class="card-footer" style="text-align: right">
          <el-button
            v-if="form.cancel !== false"
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
  data() {
    return {
      page: {
        title: this.$route.meta.title,
        loading: false,
      },
      form: {
        type: 'new',
        schema: [],
        model: {},
        primaryKey: 'id',
        cancel: this.$router.resolve({ name: `${this.$route.meta.configName}List` }).resolved.matched.length,
      },
      configName: this.$route.meta.configName,
    };
  },
  methods: {
    async submit(model) {
      try {
        this.page.loading = true;
        const { create, update } = await import(`@/api/${this.configName}.js`);
        const { params } = this.$route;
        let message;
        if (this.form.type === 'edit') {
          message = await this.$request({
            method: 'put',
            ...update(params),
            data: model,
          });
        } else {
          message = await this.$request({
            method: 'post',
            ...create(params),
            data: model,
          });
        }
        this.handleCancel();
        this.$message.success(message);
      } catch (e) {
        console.log(e);
        if (e !== 'showedMessage') {
          this.$message({
            showClose: true,
            message: 'Bir hata oluştu sayfayı yenileyip tekrar deneyiniz.',
            type: 'error',
            duration: 30,
          });
        }
      } finally {
        this.page.loading = false;
      }
    },
    handleCancel() {
      if (this.$router.resolve({ name: `${this.configName}List` }).resolved.matched.length) {
        this.$router.push({ name: `${this.configName}List` });
      }
    },
  },
  async created() {
    this.page.loading = true;
    try {
      if (this.$route.name === `${this.configName}EditForm`) {
        this.form.type = 'edit';
        const { params } = this.$route;

        const { get } = await import(`@/api/${this.configName}.js`);
        this.form.model = await this.$request({
          method: 'get',
          ...get(params),
        });
      }
    } catch {
      this.$message({
        showClose: true,
        message: 'Bir hata oluştu sayfayı yenileyip tekrar deneyiniz.',
        type: 'error',
        duration: 0,
      });
    } finally {
      this.page.loading = false;
    }
  },
  async mounted() {
    this.page.loading = true;
    try {
      const { form, primaryKey } = await import(`@/schemas/${this.configName}.js`);
      const schema = form(this.form.type);
      this.form.schema = schema;
      this.form.primaryKey = primaryKey;
    } catch {
      this.$message({
        showClose: true,
        message: 'Bir hata oluştu sayfayı yenileyip tekrar deneyiniz.',
        type: 'error',
        duration: 0,
      });
    } finally {
      this.page.loading = false;
    }
  },
};
</script>
