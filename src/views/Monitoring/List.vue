<template>
  <el-card
    class="box-card box-card-table"
    v-loading="page.loading"
  >
    <div slot="header" class="clearfix">
      <span class="card-title">
        {{page.title}}
      </span>
    </div>
    <el-table
      :data="$store.getters.monitoring"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Personel"
        >
      </el-table-column>
      <el-table-column
        prop="ibeaconName"
        label="Konum"
        >
      </el-table-column>
      <el-table-column
        prop="lastChangedTime"
        label="Son Değişiklik"
        >
        <template slot-scope="{row}">
          {{$moment(row.lastChangedTime).format('HH:mm:ss')}}
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'MonitoringList',
  components: {
  },
  data() {
    return {
      page: {
        loading: false,
        title: 'Canlı İzleme',
      },
      table: {
        data: [],
      },
      ibeacons: [],
      trackers: [],
    };
  },
  methods: {
  },
};
</script>

<style scoped>

</style>
