<template>
  <a-row class="border-top h-100" type="flex" justify="space-around" align="middle">
    <a-col :span="8">
      <div @drop="convertWxapkg" @dragover="dragover" class="dragover">".wxapkg"文件拖拽到此执行</div>
      <div class="btn">
        <a-tooltip placement="top">
          <template v-slot:title>
            <span>微信.wxapkg小程序安装包路径'/Dick/tencent/MicroMsg/xxx/appbrand/pkg' (需root权限)</span>
          </template>
          <a-button :loading="btnState == 'loading'" type="primary">选择 ".wxapkg" 文件 {{ btnState }}</a-button>
        </a-tooltip>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import { ref } from 'vue'

try {
  var { shell, ipcRenderer } = require('electron')
} catch(e) {
  // no select
}

export default {
  setup() {
    const content = ref('')
    const btnState = ref('')

    function dragover(event) {
      event.preventDefault()
    }
    function convertWxapkg(event) {
      event.preventDefault();
      let filePath = event.dataTransfer.files[0].path
      if (filePath.endsWith('.wxapkg')) {
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
      dragover,
      convertWxapkg
    }
  }
}
</script>

<style scoped>
.border-top {
  border-top: 1px solid #CCC;
}
.h-100 {
  height: 100vh;
}
.dragover {
  width: 100%;
  height: 20rem;
  line-height: 20rem;
  background-color: #EEE;
  border-radius: 0.5rem;  
  text-align: center;
}
.btn {
  margin: 2rem 0;
  text-align: center;
}
</style>