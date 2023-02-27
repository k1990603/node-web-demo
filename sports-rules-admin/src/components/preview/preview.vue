<!--
 * @Date           : 2022-04-05 15:18:04
 * @LastEditTime: 2022-09-18 11:11:48
 * @Description    :
-->
<template>
  <q-card class="my-card  mw70vw q-px-md w70vw" id="content-view">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">预览</div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <!--显示一个多个md-->
      <q-card v-if="!normal_md" style="
    overflow: auto;
    max-height: 620px;
">
        <q-tabs v-model="activetab" dense class="text-black" active-color="primary" indicator-color="primary" align="left" narrow-indicator>
          <q-tab v-for="(item, index) in new_lan" :key="'tab'+index" :name="index">
            <span>{{item.name_zh}}</span>
            <span>{{item.name_en}}</span>
          </q-tab>
        </q-tabs>

        <div class="text-h3" v-if="new_lan.length==0">无文档可显示</div>
        <q-separator v-else />
        <q-tab-panels v-model=" activetab" animated>
          <q-tab-panel v-for="(item, index) in new_lan" :key="'tabpanels'+index" :name="index">

            <div>
              <div class="text-center fz30 fw600 my30 ">
                <div>{{     detail_obj.name_zh }}</div>
                <div>{{     detail_obj.name_en }}</div>
              </div>
              <!-- 主题 -->
              <Markdown :source="md_str" class="wy" />

            </div>
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
      <!--显示一个md-->
      <q-card v-else style="
    overflow: auto;
    max-height: 620px;
">
        <div class=" overflow-hidden">
          <div class="text-center fz30 fw600 my30">
            <div>{{     detail_obj.name_zh }}</div>
            <div>{{     detail_obj.name_en }}</div>
          </div>
          <!-- 主题 -->
          <Markdown :source="md_str" class="wy" />

        </div>
      </q-card>
    </q-card-section>
    <q-separator />
  </q-card>
</template>
<script>
import { mapGetters } from "vuex";
const API_BASEURL = process.env.API_BASEURL;
import { api_file } from "src/api/index";
import Markdown from 'vue3-markdown-it';
import { api_mddocpool } from "src/api/index";
export default {
  components: {
    Markdown
  },
  data () {
    return {
      new_lan: [],
      mdobj_history: [],
      activetab: 0,
      md_path: "",
      md_str: "#",
      info_obj: {},
      timer_a: 0,
    };
  },
  props: {
    all_lan: [],
    normal_md: {},
    detail_obj: {},
    handle_info: {
      type: Function,
      default: Promise.resolve(),
    },
  },
  created () {
    this.new_lan = this.all_lan
    this.get_info();
  },
  watch: {
    activetab (val) {
      this.handle_tab_click(val)
    }
  },
  destroyed () {
    clearTimeout(this.timer_a);
  },
  methods: {
    /**
    * @description 获取历史上传
    * @param
    * @return
    */
    async get_history () {
      let lan = this.new_lan[this.activetab].value
      let res = await api_mddocpool.handle_read({ pageSize: 1000, currentPage: 1, document: this.detail_obj.id });
      let { code, msg, data } = res.data;
      let lan_list = []
      data.docs.forEach(item => {
        if (item.state == 1) {
          this.mdobj_history[item.language] = item
        }
      }, this);
      let keys_lan = Object.keys(this.mdobj_history)
      let val = this.new_lan.filter(lan => {
        if (keys_lan.includes(lan.value)) {
          return lan
        }
      })
      this.new_lan = val
      this.handle_tab_click();
    },
    async get_info () {
      if (!this.normal_md) {
        this.get_history()
      } else {
        this.md_path = this.normal_md.path;
        this.md_path && this.handle_get_md_content();
      }
      this.$forceUpdate();
    },
    handle_tab_click () {
      this.md_str = ""
      let name = this.new_lan[this.activetab].value
      if (!this.mdobj_history) return
      this.md_path = this.mdobj_history[name] && this.mdobj_history[name].path;
      this.md_path && this.handle_get_md_content();
    },
    async handle_get_md_content () {
      // this.md_path
      let url = API_BASEURL + '/' + this.md_path;
      console.log(url);

      let res = await api_file.handle_read_md_file({}, url);
      let { code, data } = res;
      this.md_str = data;
      this.jump_a()
    },
    /**处理页面内跳转
     * @description
     * @param
     * @return
     */
    jump_a () {
      let lan = this.normal_md && this.normal_md.language || this.new_lan[this.activetab] && this.new_lan[this.activetab].value
      let this_ = this;
      this.timer_a = setTimeout(() => {
        let content_view = document.getElementById("content-view");
        let list_a = content_view.getElementsByTagName("a");
        if (list_a.length != 0) {
          Array.from(list_a).forEach((item) => {
            let href_title_old = item.href.substr(
              item.href.indexOf("#") + 1,
              item.href.length
            );
            if (lan == "en_gb") {
              href_title_old = href_title_old.toLowerCase();
              href_title_old = href_title_old.split("%2f").join("%2F")
            }
            item.setAttribute("data-href", href_title_old);
            item.setAttribute("href", "javascript:void(0)");
            item.onclick = function () {
              let href_title_old = item.getAttribute("data-href");
              let h_title = document.getElementById(href_title_old);
              console.warn(h_title,href_title_old);
              h_title.scrollIntoView(true);
            };
          });
        }
      }, 5);
    },
  },
};
</script>

<style lang="scss" scoped></style>
