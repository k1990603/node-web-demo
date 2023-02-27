<!--
 * @Date           : 2022-04-03 21:49:58
 * @LastEditTime: 2022-08-08 10:55:10
 * @Description    :  
-->
<template>
  <q-card class="my-card  mw70vw q-px-md w70vw" style="max-height: 800px;">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">
          {{ detail_obj.id ? "编辑" : "新建" }}数据
        </div>

        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card class="my-card   " style="
    display: block;
    overflow: hidden;
">
      <q-card-section class="q-py-md q-gutter-y-md">

        <div class="row">
          <div class="w120 form-item-label">
            内容 <span class="text-red">*</span>
          </div>
          <v-md-editor v-model="md_str" height="400px"></v-md-editor>
        </div>
        <!-- <div class="row" v-if="false">
          <div class="w120 form-item-label">状态</div>
          <q-select class="col" filled dense emit-value map-options :options="options_state" v-model="editing_obj.state" />
        </div>
        <div class="row" v-if="false">
          <div class="w120 form-item-label">关联文档<span class="text-red">*</span></div>
          <q-select class="col" label="关联文档" filled dense emit-value map-options :options="get_all_documdent" option-label="name_zh" option-value="id" v-model="editing_obj.document" />
        </div>
        <div class="row" v-if="false">
          <div class="w120 form-item-label">语言<span class="text-red">*</span></div>
          <q-select class="col" label="语言" filled dense emit-value map-options :options="all_lan" option-label="name" option-value="value" v-model="editing_obj.language" />
        </div> -->
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn color="primary" @click="handle_conform_edit" label="确定" />
        <q-btn v-close-popup color="deep-orange" glossy @click="handle_cancel_edit" label="取消" />
      </q-card-actions>
    </q-card>
  </q-card>
</template>
<script>
const API_BASEURL = process.env.API_BASEURL;
import { ref } from "vue";
import { api_mddocpool as api_namespace, api_file } from "src/api/index";

import { edit_component_mixin } from "src/mixin/index";
import { mapActions, mapGetters } from "vuex";
export default {
  mixins: [edit_component_mixin],
  data () {
    return {
      //API 命名空间
      api_namespace,
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      md_str: '',
      temp_obj: {
        language: "",
        document: "",
        state: -1,
      },


    };
  },
  props: {
    all_lan: [],
    get_all_documdent: [],
    detail_obj: {},
    document: "",
    isinner: {
      type: Boolean,
      default: false,
    },
  },
  created () {
    this.editing_obj = { ...this.detail_obj };
    if (this.detail_obj.id) {
      this.handle_get_md_content()

    }
  },
  computed: {
    ...mapGetters(["get_user"]),

  },


  methods: {
    async handle_get_md_content () {
      // this.md_path
      let url = API_BASEURL + '/' + this.detail_obj.path;
      let res = await api_file.handle_read_md_file({}, url);
      let { code, data } = res;
      this.md_str = data;
    },

    /**
     * 确定 提交更改
     *
     */
    async handle_conform_edit () {
      let {
        language,
        document,
        state,
        path,
      } = this.editing_obj;
      let final_obj = {
        language,
        document,
        state,
        // author: this.get_user.name,
      };
      if (!this.md_str) {
        this.$q.notify({
          timeout: 900,
          type: "negative",
          message: "内容为必选项必选项",
        });
        return
      }
      console.warn(final_obj, 11111111111111);
      this.$utils.remove_false_key(final_obj);

      console.log("this.editing_obj-----22---", final_obj, this.get_user);
      let res = await api_file.handle_writerandcreate({ content: this.md_str });
      let { code, data, msg } = res.data;
      if (data.data && data.data.filepath) {

        final_obj.path = data.data.filepath
        final_obj.name = data.data.filename
      }
      if (code == "1001") {
        this.$emit("emit-edit", final_obj);
      } else {
        this.$q.notify({
          timeout: 900,
          type: "negative",
          message: msg,
        });
      }

    },


  },
};
</script>
<style lang="scss" scoped></style>
