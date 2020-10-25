<template>
  <el-card class="box-card box-card-table" v-loading="page.loading">
    <div slot="header" class="clearfix">
      <span class="card-title">{{page.title}}</span>
    </div>
    <div v-if="page.ready">
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
      <el-form style="padding:20px">
        <el-row>
          <el-col v-for="(road,roadIndex) in roads" :key="roadIndex" :md="12">
            <el-form-item :label="`X:${road.position.x} | Y:${road.position.y}`">
              <el-select
                @focus="handleItemFocus(road.position)"
                clearable
                v-model="data.roads[`${road.position.x}.${road.position.y}`]"
              >
                <el-option
                  v-for="item in model.ibeacons"
                  :key="`${road.position.x}.${road.position.y}.${item.id}`"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="text-center">
        <el-button type="primary" @click="handleClickSave">Kaydet</el-button>
      </div>
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
/* eslint-disable array-callback-return */

import { getAll } from '@/api/ibeacon';
import { putPlan, getPlan } from '@/api/plan';

const texture = new Image();
const roads = [
  [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
  [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
  [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
  [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
  [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6],
  [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5], [5, 6],
];
export default {
  name: 'MonitoringList',
  components: {
  },
  data() {
    return {
      page: {
        loading: false,
        ready: false,
        title: 'Maden Krokisi',
      },
      model: {
        x: 5,
        y: 5,
        itemDialog: false,
        selectedLocation: { x: 0, y: 0 },
        selectedItem: { x: 0, y: 0 },
        ibeacons: [],
      },
      data: {
        map: '',
        roads: {},
      },
      roads: [],
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
  async mounted() {
    this.page.loading = true;
    await this.getPlan();
    this.getIbeacons();
    texture.src = '/map-items.png';
    texture.onload = () => this.init();
    this.page.loading = false;
  },
  methods: {
    async getPlan() {
      return new Promise((resolve, reject) => {
        (async () => {
          try {
            const result = await this.$request({
              method: 'get',
              ...getPlan({ planId: 1 }),
            });
            this.map = JSON.parse(result.items);
            this.model.x = this.map.length;
            this.model.y = this.map[0].length;
            this.map.map((i, xIndex) => {
              i.map((j, yIndex) => {
                if (roads.find((k) => k[0] === j[0] && k[1] === j[1])) {
                  const item = {
                    position: {
                      x: xIndex,
                      y: yIndex,
                    },
                    item: j,
                  };
                  this.roads.push(item);
                  this.$set(this.data.roads, `${xIndex}.${yIndex}`, null);
                }
              });
            });
            result.ibeaconCords.map((road) => {
              this.$set(this.data.roads, `${road.x}.${road.y}`, road.ibeacon_id);
            });
            resolve(result);
          } catch (e) {
            reject();
          } finally {
            this.page.ready = true;
          }
        })();
      });
    },
    async getIbeacons() {
      try {
        const ibeacons = await this.$request({
          method: 'get',
          ...getAll(),
        });
        this.model.ibeacons = ibeacons;
      } catch (e) {
        console.log(e);
      }
    },
    handleItemFocus(pos) {
      this.cf.clearRect(-this.w, -this.h, this.w * 2, this.h * 2);
      this.drawTile(this.cf, pos.x, pos.y, 'rgba(0,0,0,0.2)');
    },
    handleItemBlur() {
      this.cf.clearRect(-this.w, -this.h, this.w * 2, this.h * 2);
    },
    async handleClickSave() {
      try {
        const data = {};
        data.image = this.trimCanvas(this.bg.canvas).toDataURL();
        data.items = this.map;
        data.roads = [];
        Object.keys(this.data.roads).map((key) => {
          const position = key.split('.');
          data.roads.push({
            x: position[0],
            y: position[1],
            ibeacon_id: this.data.roads[key],
          });
        });
        const result = await this.$request({
          method: 'put',
          ...putPlan({ planId: 1 }),
          data,
        });
        this.$message.success(result);
      } catch (error) {
        this.$message.error(error.message);
      }
    },
    trimCanvas(c) {
      const ctx = c.getContext('2d');
      const copy = document.createElement('canvas').getContext('2d');
      const pixels = ctx.getImageData(0, 0, c.width, c.height);
      const l = pixels.data.length;
      let i;
      const bound = {
        top: null,
        left: null,
        right: null,
        bottom: null,
      };
      let x; let
        y;

      // Iterate over every pixel to find the highest
      // and where it ends on every axis ()
      for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] !== 0) {
          x = (i / 4) % c.width;
          // eslint-disable-next-line no-bitwise
          y = ~~((i / 4) / c.width);

          if (bound.top === null) {
            bound.top = y;
          }

          if (bound.left === null) {
            bound.left = x;
          } else if (x < bound.left) {
            bound.left = x;
          }

          if (bound.right === null) {
            bound.right = x;
          } else if (bound.right < x) {
            bound.right = x;
          }

          if (bound.bottom === null) {
            bound.bottom = y;
          } else if (bound.bottom < y) {
            bound.bottom = y;
          }
        }
      }

      // Calculate the height and width of the content
      const trimHeight = bound.bottom - bound.top;
      const trimWidth = bound.right - bound.left;
      const trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

      copy.canvas.width = trimWidth;
      copy.canvas.height = trimHeight;
      copy.putImageData(trimmed, 0, 0);

      // Return trimmed canvas
      return copy.canvas;
    },
    createRoads() {
      this.roads = [];
      const dataRoads = {};
      this.map.map((i, xIndex) => {
        i.map((j, yIndex) => {
          if (roads.find((k) => k[0] === j[0] && k[1] === j[1])) {
            const item = {
              position: {
                x: xIndex,
                y: yIndex,
              },
              item: j,
            };
            this.roads.push(item);
            if (this.data.roads[`${xIndex}.${yIndex}`]) {
              dataRoads[`${xIndex}.${yIndex}`] = this.data.roads[`${xIndex}.${yIndex}`];
            }
          }
        });
      });
      this.$set(this.data, 'roads', dataRoads);
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
      this.createRoads();
      this.model.itemDialog = false;
    },
    init() {
      const oldMap = [...this.map];
      const map = [];
      for (let i = 0; i < this.model.x; i++) {
        map.push([]);
        for (let j = 0; j < this.model.y; j++) {
          map[i].push(oldMap[i] ? (oldMap[i][j] || [0, 0]) : [0, 0]);
        }
      }
      this.$set(this, 'map', map);
      this.w = this.itemW + ((this.map.length - 1 + this.map[0].length - 1) * (this.tileWidth / 2 + 2));
      this.h = this.itemH + ((this.map.length - 1 + this.map[0].length - 1) * (this.tileHeight / 2 + 2));
      const canvas = this.$refs.bg;
      canvas.width = this.w;
      canvas.height = this.h;
      this.bg = canvas.getContext('2d');
      this.bg.translate(this.w - ((this.map[0].length) * this.tileWidth / 2), this.tileHeight * 2);
      this.drawMap();
      this.createRoads();
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
        this.createRoads();
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
      c.font = '20px Arial';
      c.fillStyle = 'red';
      c.fillText(`x:${x} | y:${y}`, -35, -10);
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
