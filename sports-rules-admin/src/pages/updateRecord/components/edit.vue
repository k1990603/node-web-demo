<!--
 * @Date           : 2022-04-03 21:49:58
 * @LastEditTime: 2022-08-08 17:09:19
 * @Description    :  
-->
<template>
  <q-card class="my-card   " flat style="
    overflow: auto;
    max-height: 620px;
">

    <q-card-section class="q-py-md q-gutter-y-md">
      <div>
        <RuleComponent />
      </div>
      <div class="row">
        <div class="w120 form-item-label">
          标题中文 <span class="text-red">*</span>
        </div>
        <q-input class="col" filled dense v-model.trim="editing_obj.name_zh" type="text" counter maxlength="40" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">标题英文</div>
        <q-input class="col" filled dense v-model="editing_obj.name_en" type="text" counter maxlength="40" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">
          内容中文 <span class="text-red">*</span>
        </div>
        <q-editor class="col" filled dense v-model="editing_obj.content_zh" min-height="5rem" ref="content_zh_input" />
        <UploadComponent key_str="content_zh" @emit-html-str="handle_file_emit_upload_html_str" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">内容英文</div>
        <q-editor class="col" filled dense v-model="editing_obj.content_en" min-height="5rem" @update:model-value="handle_content_en_update" />
        <UploadComponent key_str="content_en" @emit-html-str="handle_file_emit_upload_html_str" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">相关人员</div>

        <q-input class="col" filled dense v-model="editing_obj.document_staff" type="text" counter maxlength="40" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">状态</div>
        <q-select class="col" filled dense emit-value map-options :options="options_state" v-model="editing_obj.state" />
      </div>
      <div class="row" v-if="document">
        <div class="w120 form-item-label">关联文档ID</div>
        <div class="row lh40">{{ document }}</div>
      </div>
      <div class="row">
        <div class="w120 form-item-label">置顶</div>
        <q-checkbox v-model="editing_obj.is_top" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn v-close-popup color="deep-orange" glossy @click="handle_cancel_edit" label="取消" />
    </q-card-actions>
  </q-card>
</template>
<script>
import { ref } from "vue";
import { api_updateRecord as api_namespace } from "src/api/index";

import { edit_component_mixin } from "src/mixin/index";
export default {
  mixins: [edit_component_mixin],
  data () {
    return {
      //API 命名空间
      api_namespace,
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        name_zh: "",
        name_en: "",
        content_zh: "",
        content_en: "",
        state: -1,
        is_top: false,
        document_staff: "",
      },


    };
  },
  props: {
    detail_obj: {},
    document: "",
    isinner: {
      type: Boolean,
      default: false,
    },
  },


  methods: {

    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit () {
      let {
        id,
        name_zh,
        name_en,
        content_zh,
        content_en,
        state,
        is_top,
        document_staff,
      } = this.editing_obj;
      let final_obj = {
        id,
        name_zh,
        name_en,
        content_zh,
        content_en,
        state,
        is_top,
        document_staff,
        document: this.document,
      };
      if (!name_zh || !content_zh) {
        this.$q.notify({
          timeout: 900,
          type: "negative",
          message: "中文标题和中文内容必填",
        });
      }

      // this.$utils.remove_false_key(final_obj);

      console.log("this.editing_obj-----22---", final_obj);

      this.handle_conform_edit_process(final_obj);
    },

    handle_close_dialog () {
      this.$emit("emit-related-id");
    },

  },
};
</script>
<style lang="scss" scoped></style>
