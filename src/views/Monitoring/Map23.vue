<template>
  <el-card class="box-card box-card-table" v-loading="page.loading">
    <div slot="header" class="clearfix">
      <span class="card-title">{{page.title}}</span>
    </div>
    <el-row :gutter="15" style="padding:15px">
      <el-col :md="24" class="text-center">
        <span class="mr-15">X:</span>
        <el-input-number :min="1" v-model="model.x" class="mr-15"></el-input-number>
        <span class="mr-15">Y:</span>
        <el-input-number :min="1" v-model="model.y" class="mr-15"></el-input-number>
        <el-button type="primary" @click="init">Oluştur</el-button>
      </el-col>
    </el-row>
    <div style="position:relative; overflow:auto;">
      <canvas id="bg" ref="bg"></canvas>
      <canvas
        id="fg"
        ref="fg"
        @mousemove="handleFgMouseMove"
        @click="handleFgClick"
        @click.right.prevent="handleFgRightClick"
        style="position:absolute;top:0;left:0"
      ></canvas>
    </div>
    <div class="text-center">
      <el-button type="primary" @click="handleClickSave">Kaydet</el-button>
    </div>
    <el-dialog title="Seçim Yap" :visible.sync="model.itemDialog" width="80%" center>
      <div class="items">
        <template v-for="i in 6">
          <div
            v-for="j in 12"
            :key="`${i}.${j}`"
            class="item"
            @click="handleClickItem(i,j)"
            :style="setItemStyle(i,j)"
          ></div>
        </template>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
/* eslint-disable max-len */
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
      model: {
        x: 5,
        y: 5,
        itemDialog: false,
        selectedLocation: { x: 0, y: 0 },
        selectedItem: { x: 0, y: 0 },
      },
      data: {
        map: '',
      },
      map: [],
      bg: null,
      cf: null,
      tileWidth: 128,
      tileHeight: 64,
      w: 0,
      h: 0,
      itemW: 130,
      itemH: 230,
    };
  },
  mounted() {
    texture.src = '/map-items.png';
    texture.onload = () => this.init();
    // this.init();
  },
  methods: {
    handleClickSave() {
      this.data.map = this.bg.canvas.toDataURL();
    },
    setItemStyle(i, j) {
      return {
        backgroundPosition: `-${(j - 1) * 130}px -${(i - 1) * 230}px`,
      };
    },
    handleClickItem(i, j) {
      this.model.selectedItem.x = i - 1;
      this.model.selectedItem.y = j - 1;
      this.map[this.model.selectedLocation.x][this.model.selectedLocation.y][0] = this.model.selectedItem.x;
      this.map[this.model.selectedLocation.x][this.model.selectedLocation.y][1] = this.model.selectedItem.y;
      this.drawMap();
      this.model.itemDialog = false;
    },
    init() {
      const oldMap = [...this.map];
      this.map = [];
      for (let i = 0; i < this.model.x; i++) {
        this.map.push([]);
        for (let j = 0; j < this.model.y; j++) {
          this.map[i].push(oldMap[i] ? (oldMap[i][j] || [0, 0]) : [0, 0]);
        }
      }
      this.w = this.itemW + ((this.map.length - 1 + this.map[0].length - 1) * (this.tileWidth / 2 + 2));
      this.h = this.itemH + ((this.map.length - 1 + this.map[0].length - 1) * (this.tileHeight / 2 + 2));
      const canvas = this.$refs.bg;
      canvas.width = this.w;
      canvas.height = this.h;
      this.bg = canvas.getContext('2d');
      this.bg.translate(this.w - ((this.map[0].length) * this.tileWidth / 2), this.tileHeight * 2);
      this.drawMap();
      const { fg } = this.$refs;
      fg.width = canvas.width;
      fg.height = canvas.height;
      this.cf = fg.getContext('2d');
      this.cf.translate(this.w - ((this.map[0].length) * this.tileWidth / 2), this.tileHeight * 2);
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
      j *= this.itemW;
      i *= this.itemH;
      c.drawImage(texture, j, i, this.tileWidth, this.itemH, -this.tileWidth / 2, -this.itemW, this.itemW, this.itemH);
      c.restore();
    },
    handleFgClick(e) {
      const pos = this.getPosition(e);
      if (pos.x >= 0 && pos.x < this.map.length && pos.y >= 0 && pos.y < this.map[0].length) {
        this.map[pos.x][pos.y][0] = this.model.selectedItem.x;
        this.map[pos.x][pos.y][1] = this.model.selectedItem.y;
        this.drawMap();
      }
    },
    handleFgRightClick(e) {
      const pos = this.getPosition(e);
      if (pos.x >= 0 && pos.x < this.map.length && pos.y >= 0 && pos.y < this.map[0].length) {
        this.model.selectedLocation = pos;
        this.model.itemDialog = true;
      }
    },
    handleFgMouseMove(e) {
      const pos = this.getPosition(e);
      this.cf.clearRect(-this.w, -this.h, this.w * 2, this.h * 2);
      if (pos.x >= 0 && pos.x < this.map.length && pos.y >= 0 && pos.y < this.map[0].length) {
        this.drawTile(this.cf, pos.x, pos.y, 'rgba(0,0,0,0.2)');
      }
    },
    drawTile(c, x, y, color) {
      c.save();
      c.translate((y - x) * this.tileWidth / 2, (x + y) * this.tileHeight / 2);
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(this.tileWidth / 2, this.tileHeight / 2);
      c.lineTo(0, this.tileHeight);
      c.lineTo(-this.tileWidth / 2, this.tileHeight / 2);
      c.closePath();
      c.fillStyle = color;
      c.fill();
      c.restore();
    },
    getPosition(e) {
      const ey = (e.offsetY - this.tileHeight * 2) / this.tileHeight;
      const ex = e.offsetX / this.tileWidth - this.map.length / 2;
      const x = Math.floor(ey - ex);
      const y = Math.floor(ex + ey);
      return { x, y };
    },
  },
};
</script>

<style scoped lang="scss">
canvas {
  display: block;
}
.items {
  text-align: center;
  .item {
    margin: 2px;
    display: inline-block;
    background-image: url("/map-items.png");
    background-repeat: no-repeat;
    background-size: auto;
    position: relative;
    width: 130px;
    height: 230px;
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
        border-radius: 5px;
      }
    }
  }
}
</style>
