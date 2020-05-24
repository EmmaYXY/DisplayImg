<template>
  <div class="di-content">
    <section v-if="imgArr.length !== 0" class="di-img-wrapper">
      <div>
        <div v-for="(img, index) in imgArr" :key="index">
          <div class="di-img-box">
            <img width="200px" :src="img.path" alt="" class="di-img-style" />
            <div class="di-img-opration">
              <i @click="del(index)" class=""></i>
              <span class="di-img-name" :title="img.name">{{ img.name }}</span>
            </div>
          </div>
        </div>
        </div>
    </section>
    <section v-show="imgArr.length === 0" class="di-buttons">
      <div class="di-select-btn" @click="select">
          选择
      </div>
      <input style="display: none" id="di-img-loader" type="file" name="file" multiple="multiple" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'DisplayImg',
  data() {
    return {
      imgArr: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let loader = document.getElementById('di-img-loader')
      uploader.addEventListener('change', event => {
        if (!this.valiFormat(loader)) return
        Array.prototype.forEach.call(loader.files, file => {
          let img = { path: '', name: file.name, file: void 0 }
          let blobFile = new File([file], file.name, { type: 'image/jpg' })
          img.file = blobFile
          img.path = URL.createObjectURL(blobFile)
          this.imgArr.push(img)
        })
        this.$emit('afterSelect', this.imgArr)
      })
    },
    // 校验选择的图片格式
    valiFormat(loader) {
      let formArr = 'image/jpeg/image/jpg/image/png'
      let res = true
      Array.prototype.forEach.call(loader.files, file => {
        if (formArr.indexOf(file.name.substring(file.name.lastIndexOf('.') + 1)) < 0) {
          alert('请选择图片')
          res = false
        }
      })
      return res
    },
    // 触发di-img-loader的click事件
    select() {
      let loader = document.getElementById('di-img-loader')
      loader.click()
    },
    // 删除图片
    del(ind) {
      this.imgArr.splice(ind, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.di-content {
  max-height: 70vh;
  position: relative;
  padding: 10px;
  .di-buttons {
    display: flex;
    justify-content: space-around;
    width: 50%;
    margin: 0 auto 30px;
    padding-bottom: 10px;
    .di-select-btn {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      background: #eef5f9;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        border: 1px dashed #0099ff;
      }
    }
  }
  .di-img-wrapper {
    max-height: calc(70vh - 40px);
    overflow-y: auto;
    overflow-x: hidden;
    > div {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(4, 25%);
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      padding: 10px;
      margin-bottom: 30px;
    }
  }
  .di-img-box {
    width: 200px !important;
    height: 146px;
    position: relative;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    .di-img-style {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
    .di-img-box {
      visibility: hidden;
      width: 220px;
      height: 146px;
    }
    &:hover {
      .di-img-opration {
        visibility: visible;
        position: relative;
        background-color: rgba(0, 0, 0, 0.5);
        font-size: 30px;
        color: #ffffff;
        .di-img-name {
          display: inline-block;
          max-height: 60px;
          text-align: center;
          width: 100%;
          font-size: 14px;
          position: absolute;
          bottom: 5px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
