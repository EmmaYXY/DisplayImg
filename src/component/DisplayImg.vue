<template>
  <div class="upload-writ-content">
    <section class="writ-wrapper">
      <div>
        <div v-for="(img, index) in imgArr" :key="index">
          <div class="writ-show">
            <img width="200px" :src="img.path" alt="" class="img-style" />
            <div class="writ-oper">
              <i
                @click="del(index)"
                class="el-icon-delete public del-right"
              ></i>
              <span class="down-file-name" :title="img.name">{{
                img.name
              }}</span>
            </div>
          </div>
        </div>
        <section class="buttons-wrapper">
          <div class="upload-proof-tips" @click="select"></div>
          <input
            style="display: none"
            id="file-uploader"
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
      let uploader = document.getElementById("file-uploader");
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
    // 触发file-uploader的click事件
    select() {
      let uploader = document.getElementById("file-uploader");
      uploader.click();
    },
    // 删除图片
    del(ind) {
      this.imgArr.splice(ind, 1);
      document.getElementById('file-uploader').value = null
    }
  },
};
</script>

<style lang="less" scoped>
.upload-writ-content {
  position: relative;
  padding: 10px;
  .buttons-wrapper {
    padding-bottom: 10px;
    .upload-proof-tips {
      width: 200px;
      height: 146px;
      text-align: center;
      line-height: 146px;
      background: #eef5f9;
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      box-sizing: border-box;
      font-size: 40px;
      color: #0099ff;
      cursor: pointer;
      &::before {
        content: "+";
      }
      &:hover {
        border: 1px dashed #0099ff;
      }
      .iconshangchuan {
        color: #0099ff;
      }
    }
    i {
      margin-bottom: 17px;
      vertical-align: bottom;
    }
  }
  .writ-wrapper {
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
  .writ-show {
    width: 200px !important;
    height: 146px;
    position: relative;
    overflow: hidden;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 6px;
    .img-style {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }
    .writ-oper {
      visibility: hidden;
      width: 220px;
      height: 146px;
    }
    &:hover {
      .writ-oper {
        visibility: visible;
        position: relative;
        background-color: rgba(0, 0, 0, 0.5);
        font-size: 30px;
        color: #ffffff;
        .public {
          position: absolute;
          top: 40%;
          &:hover {
            cursor: pointer;
          }
        }
        .del-right {
          right: 20%;
        }
        .down-file-name {
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
