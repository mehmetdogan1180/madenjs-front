<template>
  <div>
    <div class="md-table-search-wrap">
      <el-input
        placeholder="Tüm sütunlarda arama yapar"
        clearable
        v-model="searchText"
        @keyup.enter.native="handleSearch"
        @input="searchText.length || handleSearch()"
      >
        <template slot="suffix">
          <a
            href="javascript:void(0)"
            @click="handleSearch"
          >
            <i class="el-input__icon el-icon-search"></i>
          </a>
        </template>
      </el-input>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      v-bind="$attrs"
      height="calc(100vh - 401px)"
      v-on="listeners"
      class="md-table"
      :default-sort="defaultSort"
      style="width: 100%">
      <el-table-column
        :sortable="column.sortable ? 'custom' : false"
        v-for="column in schema"
        :prop="column.name"
        :key="column.name"
        v-bind="column"
      >
        <template slot-scope="scope">
          <slot
            :name="column.name"
            :row="scope.row"
            :index="scope.$index"
          >
            <el-switch
              v-if="column.type === 'switch'"
              v-model="scope.row[column.name]"
              :active-value="column.switchValues ? column.switchValues.active || 1 : 1"
              :inactive-value="column.switchValues ? column.switchValues.inactive || 0 : 0"
              @change="handleChange(scope,column.name)"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            <template v-else>
              <template
                v-if="column.format"
              >
                {{column.format(getName(column.name,scope.row))}}
              </template>
              <template v-else>
                {{getName(column.name,scope.row)}}
              </template>
            </template>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="page"
      layout="prev, pager, next, jumper, sizes, total"
      :page-sizes="[10,25,50,100,200]"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'mdTable',
  props: {
    schema: {
      type: Array,
      default: () => [],
    },
    getData: {
      type: Function,
      default: () => Promise.resolve([]),
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableData: this.value,
      page: this.getState('page') || 1,
      total: 0,
      defaultSort: this.getDefaultSort(),
      sortParams: this.getState('sortParams') || [],
      loading: false,
      searchText: this.getState('searchText'),
      limit: this.getState('limit') || 10,
    };
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        'sort-change': this.onSortChange,
      };
    },
  },
  watch: {
    value(d) {
      this.tableData = d;
    },
  },
  methods: {
    handleChange(scope, column) {
      const { $index, row } = scope;
      // index, kolon adı, yeni değer, eski değer
      this.$emit('patch', $index, column, row[column], row[column] === 1 ? 0 : 1);
    },
    async getTableData() {
      this.loading = true;
      try {
        const params = {};
        if (this.sortParams) {
          params.sort = this.sortParams; // {"column","dir"}
        }
        if (this.searchText) {
          params.q = this.searchText;
        }
        params.page = this.page;
        params.limit = this.limit;
        this.setState();
        const response = await this.getData(params);
        this.tableData = response.results;
        this.total = response.total;
        if ((this.page - 1) * this.limit >= this.total && this.page > 1) {
          this.page -= 1;
          this.getTableData();
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    getName(name, data) {
      const arr = name.split('.');
      let d = data;
      arr.forEach((e) => {
        d = d[e] || '-';
      });
      return d;
    },
    handlePageChange(page) {
      this.page = page;
      this.getTableData();
    },
    handleSizeChange(size) { // Tablo satır sayısı değiştirildiğinde
      this.limit = size;
      this.getTableData();
    },
    handleSearch() { // Enter yada butonla aramada yada arama boşaldığında
      this.getTableData();
    },
    onSortChange({ prop, order }) { // Sıralama
      if (prop && order) {
        const shortOrder = order === 'ascending' ? 'asc' : 'desc';
        this.sortParams = {
          column: prop,
          dir: shortOrder,
        };
      } else {
        this.sortParams = '';
      }
      this.getTableData();
    },
    getDefaultSort() {
      return this.getState('sortParams') ? {
        prop: this.getState('sortParams').column,
        order: this.getState('sortParams').dir === 'asc' ? 'ascending' : 'descending',
      } : {};
    },
    setState() { // Tablo durumları kaydediliyor
      localStorage.setItem(this.$route.path, JSON.stringify({
        sortParams: this.sortParams,
        searchText: this.searchText,
        limit: this.limit,
        page: this.page,
      }));
    },
    getState(setting) {
      return (localStorage.getItem(this.$route.path) ? JSON.parse(localStorage.getItem(this.$route.path))[setting] : '');
    },
  },
  created() {
    this.getTableData();
  },
  mounted() {
    // Responsive yapabilmek için paginationa split atılıyor
    const element = document.querySelector('.el-pagination__jump');
    const newElement = document.createElement('div');
    newElement.classList.add('split-pagination');
    const elementParent = element.parentNode;
    elementParent.insertBefore(newElement, element);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
