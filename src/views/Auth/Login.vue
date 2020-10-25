<template>
  <div class="login-container">
    <div class="el-col-sm-12 el-col-md-16 hidden-xs-only left-wrap min-h-100vh"></div>
    <div class="login-wrap el-col-md-8 el-col-xs-24 el-col-sm-12" v-loading="loading">
      <el-row type="flex" align="middle" class="min-h-100vh">
        <md-form
          @submit="submitForm"
          :schema="schema"
          v-model="model"
          :loading="loading"
        >
          <template slot="forgotPassword">
            <a class="d-block text-right" href="#">Şifremi Unuttum</a>
          </template>
        </md-form>
      </el-row>
    </div>
  </div>
</template>

<script>
const MdForm = () => import('@/components/MDForm/Index');
export default {
  name: 'Login',
  components: {
    MdForm,
  },
  data() {
    return {
      loading: false,
      model: {},
      schema: [
        {
          type: 'divider',
          title: '<h2>Yönetim Paneli</h2>',
          position: 'center',
          class: 'mb-50',
        },
        {
          name: 'username',
          label: 'Kullanıcı Adı',
          rules: 'min:3|max:50|required',
        },
        {
          type: 'password',
          name: 'password',
          label: 'Parola',
          rules: 'min:3|max:50|required',
        },
        [
          {
            label: 'Beni hatırla',
            type: 'checkbox',
            name: 'rememberMe',
          },
          {
            name: 'forgotPassword',
          },
        ],
        {
          type: 'submit',
          text: 'Giriş Yap',
          class: 'd-block',
        },
        {
          type: 'divider',
          title: 'www.ikiortak.com',
          position: 'right',
        },
      ],
    };
  },
  methods: {
    async submitForm(model) {
      console.log(model);
      this.loading = true;
      try {
        const { username, password } = model;
        await this.$store.dispatch('authRequest', { username, password });
        await this.$router.push({ name: 'dashboard' });
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/template/pages/login.scss";
</style>
