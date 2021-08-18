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
        <el-button @click="setTodayDate">Bugün</el-button>
        <el-date-picker
          v-model="table.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="Baş. Tarihi"
          end-placeholder="Bit. Tarihi"
          @change="getScorings"
          :picker-options="pickerOptions"
        />
      </div>
    </div>
    <el-table
      :data="table.data"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Personel"
        >
        <template slot-scope="{row}">
          <router-link :to="{name: 'staffScoring', params: {id: row.id}}" class="table-link">
            {{ row.name }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        prop="startHour"
        label="Giriş Saati"
        >
      </el-table-column>
      <el-table-column
        prop="endHour"
        label="Çıkış Saati"
        >
      </el-table-column>
      <el-table-column
        prop="totalWorkingTime"
        label="Top. Çalışma Süresi"
        >
      </el-table-column>
      <el-table-column
        prop="totalBreakTime"
        label="Top. Mola Süresi"
        >
      </el-table-column>
      <el-table-column
        prop="totalNetWorkTime"
        label="Maden İçinde Geçirilen Süre"
        >
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
const { scorings } = require('@/api/staff');

export default {
  name: 'StaffScorings',
  components: {
  },
  data() {
    return {
      page: {
        loading: false,
        title: 'Personel Puantaj',
      },
      table: {
        data: [],
        dateRange: [
          new Date(),
          new Date(),
        ],
      },
      pickerOptions: {
        shortcuts: [
          {
            text: 'Bu Ay',
            onClick(picker) {
              const date = new Date();
              const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
              const start = new Date(date.getFullYear(), date.getMonth(), 1);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: 'Son 1 Hafta',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: 'Son 1 Ay',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: 'Son 3 Ay',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.getScorings();
  },
  methods: {
    async getScorings() {
      try {
        this.page.loading = true;
        const params = {
          start_date: this.$moment(this.table.dateRange[0]).format('YYYY-MM-DD'),
          end_date: this.$moment(this.table.dateRange[1]).format('YYYY-MM-DD'),
        };
        const response = await this.$request({
          method: 'get',
          ...scorings(),
          params,
        });
        this.table.data = response.map((i) => {
          const r = {};
          r.id = i.id;
          r.name = `${i.name} ${i.surname}`;
          r.startHour = i.start_hour || '-';
          r.endHour = i.end_hour || '-';
          r.totalWorkingTime = i.total_working_time || '-';
          r.totalBreakTime = i.total_break_time || '-';
          r.totalNetWorkTime = i.total_net_working_time || '-';
          return r;
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
      } finally {
        this.page.loading = false;
      }
    },
    setTodayDate() {
      this.table.dateRange = [
        new Date(),
        new Date(),
      ];
      this.getScorings();
    },
  },
};
</script>

<style scoped>

</style>
