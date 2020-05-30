<template>
  <div class="di-content">
    <section class="di-img-wrapper">
      <div>
        <div v-for="(img, index) in imgArr" :key="index">
          <div class="di-img-box">
            <img width="200px" :src="img.path" alt="" class="di-img-style" />
            <div class="di-img-opration">
              <span @click="del(index)" class="di-img-del">-</span>
              <span class="di-img-name" :title="img.name">{{ img.name }}</span>
            </div>
          </div>
        </div>
        <section class="di-buttons">
          <div class="di-select-btn" @click="select"></div>
          <input
            style="display: none"
            id="di-img-loader"
            type="file"
            name="file"
            multiple="multiple"
          />
        </section>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "DisplayImg",
  data() {
    return {
      imgArr: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let uploader = document.getElementById("di-img-loader");
      uploader.addEventListener("change", (event) => {
        if (!this.validate(uploader)) return;
        Array.prototype.forEach.call(uploader.files, (file) => {
          let img = { path: "", name: file.name, file: void 0 };
          let blobFile = new File([file], file.name, { type: "image/jpg" });
          img.file = blobFile;
          img.path = URL.createObjectURL(blobFile);
          this.imgArr.push(img);
        });
        this.$emit("afterSelect", this.imgArr);
      });
    },
    getMessage(type, message) {
      this.$message({
        type: type,
        message: message,
      });
    },
    // 校验选择的上传内容
    validate(uploader) {
      let typeList = "image/jpeg/image/jpg/image/png";
      typeList += typeList.toUpperCase();
      let res = true;
      Array.prototype.forEach.call(uploader.files, (file) => {
        if (
          typeList.indexOf(
            file.name.substring(file.name.lastIndexOf(".") + 1)
          ) < 0
        ) {
          alert("请选择图片");
          res = false;
        }
      });
      return res;
    },
    // 触发di-img-loader的click事件
    select() {
      let uploader = document.getElementById("di-img-loader");
      uploader.click();
    },
    // 删除图片
    del(ind) {
      this.imgArr.splice(ind, 1);
      document.getElementById("di-img-loader").value = null;
    },
  },
};
</script>

<style lang="less" scoped>
.di-content {
  max-height: 70vh;
  position: relative;
  padding: 10px;
  .di-buttons {
    .di-select-btn {
      width: 200px;
      height: 146px;
      text-align: center;
      line-height: 146px;
      background: #eef5f9;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      font-size: 40px;
      color: #c0ccda;
      box-sizing: border-box;
      cursor: pointer;
      &:hover {
        border: 1px dashed #0099ff;
      }
      &::before {
        content: "+";
      }
    }
  }
  .di-img-wrapper {
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
    .di-img-opration {
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
        .di-img-del {
          position: absolute;
          left: 0;
          width: 200px;
          text-align: center;
          font-size: 60px;
          margin-top: 20px;
          color: rgba(255, 255, 255, .8);
          cursor: pointer;
        }
        .di-img-name {
          display: inline-block;
          max-height: 60px;
          text-align: center;
          width: 200px;
          font-size: 14px;
          position: absolute;
          bottom: 5px;
          left: 0;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
