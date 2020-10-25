<template>
  <el-card class="box-card box-card-table" style="position:relative; overflow:auto;" v-loading="page.loading">
    <div slot="header" class="clearfix">
      <span class="card-title">{{page.title}}</span>
    </div>
    <div class="map" v-if="page.ready">
      <img ref="image" :src="data.image" class="img-map" />
      <div
        v-for="(staff, staffIndex) in staffs"
        :key="staffIndex"
        class="staff"
        :style="staffLocation(staff)"
      >
        <div>
          <span>{{`${staff.name} ${staff.surname}`}}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getPlan } from '@/api/plan';

export default {
  name: 'MonitoringList',
  components: {
  },
  data() {
    return {
      page: {
        loading: false,
        title: 'Canlı İzleme',
        ready: false,
      },
      data: {
        image: null,
        imageWidth: 0,
        imageHeight: 0,
        xCount: 0,
        yCount: 0,
      },
      ibeacons: {},
    };
  },
  computed: {
    staffs() {
      return this.$store.getters.monitoring;
    },
  },
  async mounted() {
    this.page.loading = true;
    const result = await this.getPlan();
    const items = JSON.parse(result.items);
    this.data.xCount = items.length;
    this.data.yCount = items[0].length;
    this.data.imageWidth = this.$refs.image.clientWidth;
    this.data.imageHeight = this.$refs.image.clientHeight - 35;
    // eslint-disable-next-line array-callback-return
    result.ibeaconCords.map((ibeacon) => {
      const left = this.data.xCount - ibeacon.x + ibeacon.y;
      const top = this.data.yCount + ibeacon.y - this.data.yCount + ibeacon.x + 1;
      const position = {
        left: left * 65 - 5,
        top: top * 32.5 - 5,
      };
      this.$set(this.ibeacons, ibeacon.ibeacon_id, position);
    });

    this.page.loading = false;
    /* setTimeout(() => {
      this.staffs[1].left = '63%';
      this.staffs[1].top = '52%';
    }, 2000); */
  },
  methods: {
    staffLocation(staff) {
      if (!Object.keys(this.ibeacons).length) {
        return {};
      }
      const sameLocation = this.staffs.filter((i) => i.ibeaconId === staff.ibeaconId);
      if (sameLocation.length > 1) {
        const unitWidt = 20 / sameLocation.length;
        const findIndexStaff = sameLocation.findIndex((i) => i.id === staff.id) + 1;
        return {
          left: `${this.ibeacons[staff.ibeaconId].left - (findIndexStaff * unitWidt - (unitWidt / 2))}px`,
          top: `${this.ibeacons[staff.ibeaconId].top - (findIndexStaff * unitWidt - (unitWidt / 2))}px`,
        };
      }
      return {
        left: `${this.ibeacons[staff.ibeaconId].left}px`,
        top: `${this.ibeacons[staff.ibeaconId].top}px`,
      };
    },
    async getPlan() {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const result = await this.$request({
              method: 'get',
              ...getPlan({ planId: 1 }),
            });

            this.data.image = Buffer.from(result.image.data, 'base64').toString('ascii');
            resolve(result);
          } catch (e) {
            reject();
          } finally {
            this.page.ready = true;
          }
        })();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.map {
  position: relative;
  display: inline-block;
}
.img-map {
  display: block;
  // width: 100%;
  height: auto;
}
.staff {
  width: 10px;
  height: 10px;
  position: absolute;
  /* right: 0;
  top: 0; */
  background: #73dc12;
  border-radius: 100%;
  transition: all 1.2s ease;
  div{
    position: relative;
    span{
      position: absolute;
      transform: rotate(25deg);
      background: #73dc12;
      padding: 0 10px;
      display: block;
      bottom: 10px;
      border-radius: 5px;
      font-size: 10px;
      white-space: nowrap;
      -webkit-box-shadow: 0px 0px 29px -13px rgba(0,0,0,0.78);
      -moz-box-shadow: 0px 0px 29px -13px rgba(0,0,0,0.78);
      box-shadow: 0px 0px 29px -13px rgba(0,0,0,0.78);
    }
  }
  &:hover{
    z-index: 9999;
    span{
      font-size: 18px;
    }
  }
}
</style>
