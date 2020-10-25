<template>
  <el-card
    class="box-card box-card-table"
    v-loading="page.loading"
  >
    <div slot="header" class="clearfix">
      <span class="card-title">
        {{page.title}}
      </span>
      <div class="float-right">
        <router-link
          v-if="page.newRecord"
          :to="page.newRecord"
        >
          <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
          >
            Yeni Kayıt Ekle
          </el-button>
        </router-link>
      </div>
    </div>
    <md-table
      :schema="table.schema"
      v-model="table.data"
      :get-data="getData"
      ref="mdTable"
    >
      <div
        slot="md-actions"
        class="text-right"
        slot-scope="scope"
      >
        <el-button-group>
          <el-button
            v-if="actions.edit"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope)"
          />
          <el-popconfirm
            v-if="actions.delete"
            confirmButtonText='Evet, Devam Et'
            cancelButtonText='Hayır'
            icon="el-icon-info"
            iconColor="red"
            title="Bu kayıt silinecek devam edilsin mi?"
            @onConfirm="handleDelete(scope)"
          >
            <el-button
              slot="reference"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            />
          </el-popconfirm>
        </el-button-group>
      </div>
    </md-table>
  </el-card>
</template>

<script>
const mdTable = () => import('@/components/MDTable/Index');
export default {
  name: 'DefaultList',
  components: {
    mdTable,
  },
  data() {
    return {
      page: {
        loading: false,
        title: this.$route.meta.title,
        newRecord: '',
      },
      table: {
        data: [],
        schema: [],
        primaryKey: 'id',
      },
      actions: {
        edit: true,
        delete: true,
      },
      configName: this.$route.meta.configName,
    };
  },
  methods: {
    async getData(params) {
      let response = [];
      try {
        const { getAll } = await import(`@/api/${this.configName}`);
        response = await this.$request({
          method: 'get',
          ...getAll(),
          params,
        });
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
      }
      return response;
    },
    handleEdit(scope) {
      if (this.$router.resolve({ name: `${this.configName}EditForm` }).resolved.matched.length) {
        const params = {
          id: scope.row[this.table.primaryKey],
        };
        this.$router.push({
          name: `${this.configName}EditForm`,
          params,
        });
      }
    },
    async handleDelete(scope) {
      try {
        this.page.loading = true;
        const { del } = await import(`@/api/${this.configName}`);
        const params = {
          id: scope.row[this.table.primaryKey],
        };
        const message = await this.$request({
          method: 'delete',
          ...del(params),
        });
        this.$message.success(message);
        await this.$refs.mdTable.getTableData();
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
  },
  async mounted() {
    this.page.loading = true;
    try {
      const { list, primaryKey } = await import(`@/schemas/${this.configName}`);
      const schema = list();
      if (this.actions) {
        schema.push({
          name: 'md-actions',
          fixed: 'right',
        });
      }
      this.table.schema = schema;
      this.table.primaryKey = primaryKey;
      if (this.$router.resolve({ name: `${this.configName}Form` }).resolved.matched.length) {
        this.page.newRecord = {
          name: `${this.configName}Form`,
        };
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
};
</script>

<style scoped>

</style>
