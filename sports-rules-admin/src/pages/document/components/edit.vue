<!--
 * @Date           : 2022-04-10 22:06:50
 * @LastEditTime: 2022-09-11 16:32:23
 * @Description    :   mw70vw
-->
<template>
  <q-card class="my-card" flat style="
    max-height: 620px;
    overflow: auto;
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
        <div class="w120 form-item-label">语总开关</div>
        <div class="q-gutter-sm col">
          <q-checkbox v-model="editing_obj.mulit_language[item.value]" :disable="item.value=='zh_cn'" v-for=" (item, index) in all_lan" :true-value="1" :false-value="-1" :key="'checkbox'+index" :label="item.name" color="black" />
        </div>

      </div>

      <div class="row">
        <div class="w120 form-item-label">MD文档</div>
        <div class="col">
          <q-card>
            <q-tabs v-model="tabs" dense class="text-black" active-color="primary" indicator-color="primary" align="left" narrow-indicator>
              <q-tab v-for="(item, index) in all_lan" :key="'tab'+index" :name="index">
                <span>{{item.name_zh}}</span>
                <span>{{item.name_en}}</span>
              </q-tab>
            </q-tabs>

            <q-separator />
            <q-tab-panels v-model=" tabs" animated>
              <q-tab-panel v-for="(item, index) in all_lan" :key="'tabpanels'+index" :name="index">
                <div>
                  <di class="row">
                    <q-btn color="primary" class="absolute  h40" style="    height: 40px;" @click="click_edit_md()">
                      新建md文件</q-btn>
                    <span style="margin-left:125px">
                      <UploadComponentMd :key_str="'md_'+item.value" :detail_obj="detail_obj_" :file_path="editing_obj ['md_'+item.value]" @emit-file-path="handle_file_emit_upload_file_path" />
                    </span>
                  </di>

                  <div>
                    <MdListTable :historty_list="mdobj_history[item.value]" @show_md_detail="show_md_detail" @click_edit="click_edit_md" @init_table="init_table" />
                  </div>

                </div>
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
        </div>

      </div>

      <div class="row">
        <div class="w120 form-item-label">备注</div>
        <q-input class="col" filled dense v-model="editing_obj.mark" type="text" counter maxlength="100" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">状态</div>
        <q-select class="col" filled dense emit-value map-options :options="options_state" v-model="editing_obj.state" />
      </div>

    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn color="deep-orange" glossy @click="handle_close_dialog" label="取消" />
    </q-card-actions>

    <!-- 预览弹窗 -->
    <q-dialog v-model="show_dialog_preview" persistent>
      <ArticlePreview :detail_obj="editing_obj" :all_lan="all_lan" :handle_info="api_fn_info" :normal_md="normal_md" />
    </q-dialog>
    <!-- 编辑弹窗 -->
    <q-dialog v-model="show_dialog_md_edit" persistent>
      <ArticleEdit :detail_obj="normal_md" @emit-edit="close_edit_md" />
    </q-dialog>
  </q-card>
</template>
<script>
import { ref, toRaw, markRaw } from "vue";
import { api_document as api_namespace, api_mddocpool } from "src/api/index";
import { edit_component_mixin } from "src/mixin/index";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import { mapActions, mapGetters } from "vuex";
import ArticleEdit from "src/pages/mddocpool/components/edit.vue";
import ArticlePreview from "src/components/preview/preview.vue";
export default {
  mixins: [edit_component_mixin, table_crud_mixin],
  components: {
    ArticlePreview, ArticleEdit
  },

  data () {
    return {
      show_dialog_md_edit: false,
      show_dialog_preview: false,
      mdobj_history: [],
      mdobj: [],
      tabs: 0,
      show_dialog: false,
      detail: {},
      //API 命名空间
      api_namespace,
      tab: "edit",
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        mulit_language: {},
        name_zh: "",
        name_en: "",
        state: -1,
        mark: ""
      },
    };
  },
  computed: {
    ...mapGetters(["get_user"]),

  },
  props: {
    detail_obj_: {},
  },
  watch: {
    tabs () {
      this.get_history()
    },

    all_lan () {
      this.get_info()
      if (this.detail_obj_.id) {
        this.all_lan.forEach(item => {
          this.editing_obj['md_' + item.value] = ""
        })
        this.get_history()
      }
    }
  },
  created () {
    this.searchalllan()
  },
  methods: {
    handle_file_emit_upload_file_path (obj) {
      this.editing_obj[obj.key] = obj.path;
      this.handle_md_update_({
        name: obj.path.filename,
        path: obj.path.filepath,
        document: this.detail_obj_.id,
        language: this.all_lan[this.tabs].value
      })

    },
    async close_edit_md (val) {
      this.show_dialog_md_edit = false;
      let res;
      this.editing_obj["md_" + this.all_lan[this.tabs].value] = {
        filename: val.name,
        filepath: val.path,
      }
      this.handle_md_update_(val)

    },
    click_edit_md (val) {
      this.show_dialog_md_edit = true
      if (!val) {
        val = {
          language: this.all_lan[this.tabs].value,
          document: this.detail_obj_.id,
          state: -1,
          // author: this.get_user.name,
        }
      }
      this.normal_md = val
    },
    show_md_detail (val) {
      this.show_dialog_preview = true
      this.normal_md = val
    },
    /**
    * @description 获取历史上传
    * @param
    * @return
    */
    async get_history () {
      if (this.detail_obj_.id && this.all_lan[this.tabs]) {
        let lan = this.all_lan[this.tabs].value
        let res = await api_mddocpool.handle_read({ pageSize: 1000, currentPage: 1, document: this.detail_obj_.id, language: lan });
        let { code, msg, data } = res.data;
        this.mdobj_history[lan] = data.docs
      }
    },
    init_table () {
      this.get_history()
    },
    close_dialog (val) {
      this.show_dialog = false;
      this.editing_obj = val
    },
    /**
     * 获取详情
     */
    async get_info () {
      if (this.detail_obj_.id) {

        let params = {
          id: this.detail_obj_.id,
        };
        let res = await this.api_fn_info(params);
        let { code, msg, data } = res.data;
        this.editing_obj = this.$lodash.cloneDeep(data);
        let obj = data.mulit_language && eval("(" + data.mulit_language + ")")
        this.editing_obj.mulit_language = obj ? obj : {}
        this.all_lan.forEach(item => {
          if (!this.editing_obj.mulit_language[item.value]) {
            this.editing_obj.mulit_language[item.value] = -1
            if (item.value == "zh_cn") {
              mulit_language[item.value] = 1
            }
          }
        })
      } else {
        this.editing_obj = { ...this.temp_obj }
        let mulit_language = {}
        this.all_lan.forEach(item => {
          mulit_language[item.value] = -1
          if (item.value == "zh_cn") {
            mulit_language[item.value] = 1
          }
        })
        this.editing_obj.mulit_language = mulit_language
      }


      this.$forceUpdate();
    },
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit () {
      let {
        id,
        mark,
        name_zh,
        name_en,
        state,
        mulit_language,
      } = this.editing_obj;
      let final_obj = {
        id,
        mark,
        name_zh,
        name_en,
        state,
        mulit_language,
      };
      this.mdobj = []
      this.all_lan.forEach(item => {
        let md = this.editing_obj['md_' + item.value]
        if (md && md != "") {
          this.mdobj.push({
            language: item.value,
            name: md.filename,
            path: md.filepath,
            state: -1,
            // author: this.get_user.name,
          })
        }
      })
      if (!final_obj.name_zh) {
        this.$q.notify({
          timeout: 900,
          type: "negative",
          message: "中文标题必填",
        });
        return
      }
      this.handle_conform_edit_process(final_obj);
    },
    handle_close_dialog () {
      this.$emit("emit-related-id");
    },
    /**
     * 新增   确定
     *
     */
    async handle_conform_create (obj) {
      let params = obj || {
        ...this.detail_obj_,
      };
      let res = await this.api_fn_create(params);
      let { code, msg, data } = res.data;
      if (data.id) {
        this.handle_md_update(data.id)
      }
    },
    async handle_md_update_ (val) {
      if (this.detail_obj_.id) {
        let this_ = this;
        api_mddocpool.handle_create({ ...val }).then(res => {
          let { code, msg, data } = res.data;
          this_.get_history()
          if (code != "1001") {
            this_.$q.notify({
          timeout: 900,
              type: "negative",
              message: msg,
            });
            return;
          }
        });

      }
    },
    async handle_md_update (id) {
      let this_ = this
      this.mdobj.map(item => {
        api_mddocpool.handle_create({ ...item, document: id }).then(res => {
          this_.get_history()
        });
      })

    },
    before_close_dialog () {
      // this.get_info()
    },
  },
};
</script>
<style lang="scss" scoped></style>
