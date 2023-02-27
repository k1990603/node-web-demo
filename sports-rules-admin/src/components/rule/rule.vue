<!--
 * @Date           : 2022-04-11 12:49:05
 * @LastEditTime   : 2022-04-11 19:17:53
 * @Description    :
-->
<template>
  <div class="text-red text-left">
    <div class="text-red break-all">
      所有文档支持 富文本形式和 MD文档形式两种 ，
      根据需要自己选择。如果翻译多语言以及对页面要求不高的，建议采用
      MD文档维护。方便不同部门协同工作。
    </div>
    <div class="text-red">
      如果英文没有配置则使用中文的配置。注意因为图片一般偏大，建议点击插入图片进行上传图片。
      请勿直接复制粘贴图片。如果插入图片后期望移动图片位置，请鼠标选中图片，
      剪切到对应的位置。
    </div>

    <div class="text-red">
      文档 建议使用
      <a href="https://typora.io/" target="_blank" rel="noopener noreferrer"
        >typora
      </a>
      专业 md 文档编辑器 进行编辑复制粘贴，样式比较美观。
    </div>

  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  props: {
    show_update: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped></style>
