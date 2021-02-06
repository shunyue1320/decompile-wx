<template>
  <div @ondrop="convertWxapkg" style="width: 100px; height: 100px; background: red;">拖拽到此执行Wxapkg</div>
</template>
<script>
import { ref } from 'vue'
import { shell, ipcRenderer } from 'electron'

export default {
  setup() {
    const content = shallowRef('')

    function convertWxapkg(event) {
      e.preventDefault();
      let fileName = e.dataTransfer.files[0].path;
      if (fileName.endsWith('.wxapkg')) {
        ipcRenderer.send('decompiler-start', )
        ipcRenderer.on('decompiler-success', (e, arg) => {
          content.value = arg.content
          shell.openItem(arg.path)
        })
      } else {
        alert("文件格式错误，应为 '.wxapkg' 结尾")
      }
    }
    return {
      content,
      convertWxapkg
    }
  }
}
</script>
