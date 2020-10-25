<template>
  <el-card class="box-card box-card-table" v-loading="page.loading">
    <div slot="header" class="clearfix">
      <span class="card-title">{{page.title}}</span>
    </div>
    <div id="main">
      <div id="area">
        <canvas id="bg" ref="bg"></canvas>
        <canvas id="fg"></canvas>
      </div>
    </div>
  </el-card>
</template>

<script>
/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
const texture = new Image();
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
      map: [
        [[0, 0]],
      ],
      canvas: null,
      bg: null,
      fg: null,
      cf: null,
      tileWidth: 128,
      tileHeight: 64,
      tools: null,
      tool: null,
      activeTool: null,
      isPlacing: null,
      w: 130,
      h: 230,
    };
  },
  mounted() {
    texture.src = '/map-items.png';
    texture.onload = () => this.init();
    // this.init();
  },
  methods: {
    init() {
      /* this.w = 130 * this.map.length;
      this.h = 230 + (25 * this.map.length); */
      this.canvas = this.$refs.bg;
      this.canvas.width = 500;
      this.canvas.height = 600;
      this.bg = this.canvas.getContext('2d');
      // this.bg.drawImage(texture, 0, 0, 130, 230, 0, 0, 130, 230);
      this.bg.translate(64, 130);
      this.bg.drawImage(texture, 0, 0, 130, 230, -65, -130, 130, 230);
      this.bg.translate(64, 32);
      this.bg.drawImage(texture, 0, 0, 130, 230, -65, -130, 130, 230);
      this.bg.translate(64, 32);
      this.bg.drawImage(texture, 0, 0, 130, 230, -65, -130, 130, 230);
      this.bg.translate(-64, -128);
      this.bg.drawImage(texture, 0, 0, 130, 230, -65, -130, 130, 230);
      // this.bg.clearRect(-260, -460, 260, 460);
    },
    drawMap() {
      this.bg.clearRect(-this.w, -this.h, this.w * 2, this.h * 2);
      for (let i = 0; i < this.map.length; i++) {
        for (let j = 0; j < this.map[0].length; j++) {
          this.drawImageTile(this.bg, i, j, this.map[i][j][0], this.map[i][j][1]);
        }
      }
    },
    drawImageTile(c, x, y, i, j) {
      c.save();
      c.translate((y - x) * this.tileWidth / 2, (x + y) * this.tileHeight / 2);
      j *= 130;
      i *= 230;
      c.drawImage(texture, j, i, 130, 230, -65, -130, 130, 230);
      c.restore();
    },
  },
};
</script>

<style scoped lang="scss">
#main {
  position: relative;
  /* display: flex;
  align-items: center;
  justify-content: space-around; */
  height: 800px;
}
#area {
  position: relative;
  width: 100%;
  height: 100%;
  /* flex: 1;
  display: flex;
  justify-content: space-around; */
  overflow: auto;
}
canvas {
  display: block;
  position: absolute;
}
</style>
