<template>
  <div
    class="el-input-tag input-tag-wrapper"
    :class="[size ? 'el-input-tag--' + size : '']"
    @click="foucusTagInput">
    <el-tag
      v-for="(tag, idx) in innerTags"
      :key="tag"
      :size="size"
      :closable="!readOnly"
      :disable-transitions="false"
      @close="remove(idx)">
      {{tag}}
    </el-tag>
    <input
      v-if="!readOnly"
      :size="size"
      class="tag-input el-input__inner"
      :placeholder="placeholder || ''"
      v-model="newTag"
      @keydown.delete.stop = "removeLastTag"
      @keydown = "addNew"
      @blur = "addNew"/>
  </div>
</template>

<script>
export default {
  name: 'ElInputTag',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    addTagOnKeys: {
      type: Array,
      default: () => [13, 188, 9],
    },
    placeholder: {
      type: String,
      default: '',
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    size: String,
  },
  data() {
    return {
      newTag: '',
      innerTags: [...this.value],
    };
  },
  watch: {
    value() {
      this.innerTags = [...this.value];
    },
  },
  methods: {
    foucusTagInput() {
      if (!(this.readOnly || !this.$el.querySelector('.tag-input'))) {
        this.$el.querySelector('.tag-input').focus();
      }
    },
    addNew(e) {
      if (e && (!this.addTagOnKeys.includes(e.keyCode)) && (e.type !== 'blur')) {
        return;
      }
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      let addSuucess = false;
      if (this.newTag.includes(',')) {
        this.newTag.split(',').forEach((item) => {
          if (this.addTag(item.trim())) {
            addSuucess = true;
          }
        });
      } else if (this.addTag(this.newTag.trim())) {
        addSuucess = true;
      }
      if (addSuucess) {
        this.tagChange();
        this.newTag = '';
      }
    },
    addTag(tag) {
      // eslint-disable-next-line no-param-reassign
      tag = tag.trim();
      if (tag && !this.innerTags.includes(tag)) {
        this.innerTags.push(tag);
        return true;
      }
      return false;
    },
    remove(index) {
      this.innerTags.splice(index, 1);
      this.tagChange();
    },
    removeLastTag() {
      if (this.newTag) {
        return;
      }
      this.innerTags.pop();
      this.tagChange();
    },
    tagChange() {
      this.$emit('input', this.innerTags);
    },
  },
};
</script>

<style scoped>
  .input-tag-wrapper {
    position: relative;
    font-size: 14px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    display: inline-block;
    outline: none;
    padding: 0 10px 0 5px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }

  .el-tag {
    margin-right: 4px;
  }

  .tag-input {
    -webkit-appearance: none;
    color: #72777a;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    background: transparent;
    border: 0;
    width: 150px;
    padding-left: 10px;
  }

  .el-input-tag--mini .tag-input{
    height: 28px;
    line-height: 28px;
  }

  .el-input-tag--small .tag-input{
    height: 32px;
    line-height: 32px;
  }

  .el-input-tag--medium .tag-input{
    height: 36px;
    line-height: 36px;
  }

</style>
