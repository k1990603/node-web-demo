<!--
 * @Date           : 2022-04-05 15:18:04
 * @LastEditTime: 2022-08-08 17:04:29
 * @Description    :
-->
<template>
  <q-card class="my-card mw70vw q-px-md w70vw">
    <q-card-section class="no-padding ">
      <div class="row ">
        <div class="text-weight-bolder lh40">预览</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md" style="
    overflow: auto;
    max-height: 620px;    margin-top: 10px;
">
      <div class="row q-gutter-x-md">
        <q-btn glossy @click="handle_tab_click(1)" label="中文内容" :color="activetab == '1' ? 'primary' : 'secondary'" />
        <q-btn glossy @click="handle_tab_click(2)" label="英文内容" :color="activetab == '2' ? 'primary' : 'secondary'" />
        <!-- <q-btn glossy @click="handle_tab_click(3)" label="中文MD文档" :color="activetab == '3' ? 'primary' : 'secondary'" />
        <q-btn glossy @click="handle_tab_click(4)" label="英文MD文档" :color="activetab == '4' ? 'primary' : 'secondary'" /> -->
      </div>
      <q-separator />
      <div class="pb30">
        <div class="text-center fz30 fw600 my30">
          {{ name_str }}
        </div>
        <div></div>
        <div v-if="show_html" v-html="html_str"></div>
      </div>
    </q-card-section>
    <q-separator />
  </q-card>
</template>
<script>
import { mapGetters } from "vuex";
const API_BASEURL = process.env.API_BASEURL;
import { api_file } from "src/api/index";
import Markdown from 'vue3-markdown-it';
export default {
  components: {
    Markdown
  },
  data () {
    return {
      activetab: 1,
      show_html: true,
      show_md: false,
      md_path: "",
      html_str: "",
      name_str: "",
      md_str: "#",
      info_obj: {},
    };
  },
  props: {
    detail_obj: {},
    handle_info: {
      type: Function,
      default: Promise.resolve(),
    },
  },
  created () {
    this.get_info();
  },
  methods: {
    async get_info () {
      let params = {
        id: this.detail_obj.id,
      };
      let res = await this.handle_info(params);
      let { code, msg, data } = res.data;
      // console.log(data);
      this.info_obj = {
        ...data,
        content_zh: this.$utils.replace_content_to_show(data.content_zh),
        content_en: this.$utils.replace_content_to_show(data.content_en),
      };
      this.handle_tab_click(1);
      this.$forceUpdate();
    },
    handle_tab_click (tab) {
      this.activetab = tab;
      let lan = {
        1: "zh",
        2: "en"
      }
      this.show_md = false;
      this.md_path = "";
      this.show_html = true;
      this.html_str = this.info_obj["content_" + lan[tab]];
      this.name_str = this.info_obj["name_" + lan[tab]];
      this.md_path && this.handle_get_md_content();
    },
    async handle_get_md_content () {
      // this.md_path
      let url = API_BASEURL + this.md_path;
      console.log(url);

      let res = await api_file.handle_read_md_file({}, url);
      let { code, data } = res;
      // console.log(data);
      this.md_str = data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
