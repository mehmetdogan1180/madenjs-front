<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="card-title">Profil</span>
      <div class="float-right">

      </div>
    </div>
    <md-form
    :schema="schema"
    v-model="model"
    />
    <div class="card-footer" style="text-align: right">
      <el-button
        v-if="cancel !== false"
        @click="handleCancel"
      >
        İptal
      </el-button>
      <el-button
      type="primary"
      >
        Kaydet
      </el-button>
    </div>
  </el-card>
</template>

<script>
const MdForm = () => import('@/components/MDForm/Index');
export default {
  name: 'Profile',
  components: {
    MdForm,
  },
  data() {
    return {
      schema: [
        [
          {
            name: 'name',
            label: 'Ad',
          },
          {
            name: 'surname',
            label: 'Soyad',
          },
        ],
      ],
      model: {},
    };
  },
  methods: {
    handleCancel() {
      console.log(this.cancel);
    },
  },
  props: {
    cancel: {
      type: [Boolean, Object],
      default: false,
    },
  },
};
</script>

<style scoped>

</style>
