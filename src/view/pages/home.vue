<template>
  <a-row class="border-top h-100" type="flex" justify="space-around" align="middle">
    <a-col :span="15">
      <div @drop="convertWxapkg" @dragover="onDragover" class="dragover">
        <div class="ant-upload ant-upload-drag">
          <p class="ant-upload-drag-icon mt-5">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p class="ant-upload-hint">
            请选择".wxapkg"文件
          </p>
        </div>
      </div>
      <div class="btn">
        <a-tooltip placement="bottom">
          <template v-slot:title>
            <span>微信.wxapkg小程序安装包路径'/tencent/MicroMsg/xxx/appbrand/pkg' (需root权限)</span>
          </template>
          <a-button :loading="btnState == 'loading'" type="primary">
            <input class="input-file" type="file" @change="uploadFile($event)">
            选择 ".wxapkg" 文件
          </a-button>
        </a-tooltip>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { ref } from 'vue'
import { InboxOutlined } from '@ant-design/icons-vue';

try {
  var { shell, ipcRenderer } = require('electron')
} catch(e) {
  // no select
}

export default {
  components: { InboxOutlined },
  setup() {
    const content = ref('')
    const btnState = ref('')

    function onDragover(event) {
      event.preventDefault()
    }
    function convertWxapkg(event) {
      event.preventDefault();
      const filePath = event.dataTransfer.files[0]?.path
      decompilerFile(filePath)
    }

    function uploadFile(event) {
      const filePath = event.target.files[0]?.path
      decompilerFile(filePath)
    }

    function decompilerFile(filePath) {
      if (btnState.value == 'loading') {
        alert("您太快了！")
        return
      }
      if (filePath && filePath.endsWith('.wxapkg')) {
        btnState.value = 'loading'
        ipcRenderer.send('decompiler-start', filePath)
        ipcRenderer.on('decompiler-success', (event, arg) => {
          content.value = arg.content
          btnState.value = ''
          shell.openPath(arg.path)
        })
      } else {
        alert("文件格式错误，应为 '.wxapkg' 结尾")
      }
    }
    return {
      btnState: btnState,
      content: content,
      onDragover,
      convertWxapkg,
      uploadFile
    }
  }
}
</script>

<style scoped>
.border-top {
  border: 1px solid #CCC;
}
.h-100 {
  height: 100vh;
}
.dragover {
  width: 100%;
  height: 20rem;
  line-height: 20rem;
  border-radius: 0.5rem;
}
.mt-5 {
  margin-top: 5rem;
}
.btn {
  margin: 3rem 0;
  text-align: center;
}
.input-file {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>