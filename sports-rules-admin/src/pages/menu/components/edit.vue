<!--
 * @Date           : 2022-04-03 21:49:58
 * @LastEditTime: 2022-08-27 16:09:04
 * @Description    :
-->
<template>
  <q-card class="my-card mw70vw q-px-md w70vw">
    <q-card-section class="no-padding">
      <div class="row">
        <div class="text-weight-bolder lh40">
          {{ editing_obj.id ? "编辑" : "新建" }}数据
        </div>
        <q-space />
        <q-btn flat round icon="close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-py-md q-gutter-y-md">
      <div>
        <div class="text-red text-center">所有文件类型必须有关联文档才能有对应内容</div>
      </div>
      <div class="row">
        <div class="w120 form-item-label">标题</div>
        <div class="col">
          <q-card>
            <q-tabs v-model="tabtitle" dense class="text-black" active-color="primary" indicator-color="primary" align="left" narrow-indicator>
              <q-tab v-for="(item, index) in all_lan" :key="'tab'+index" :name="index">
                <span v-if="item.value=='zh_cn'"><span class="text-red">*</span>{{item.name_zh}}</span>
                <span v-else>{{item.name_zh}}</span>
                <span>{{item.name_en}}</span>
              </q-tab>
            </q-tabs>
            <q-separator />

            <q-tab-panels v-model=" tabtitle" animated>
              <q-tab-panel v-for="(item, index) in all_lan" :key="'tabpanels'+index" :name="index">
                <div>
                  <q-input class="col" filled dense v-model.trim="editing_obj.mulit_language[item.value]" type="text" counter maxlength="40" />
                </div>
              </q-tab-panel>

            </q-tab-panels>
          </q-card>
        </div>

      </div>
      <div class="row">
        <div class="w120 form-item-label">备注</div>
        <q-input class="col" filled dense v-model.trim="editing_obj.mark" type="textarea" autogrow counter />
      </div>
      <div class="row">
        <div class="w120 form-item-label">类型</div>
        <q-select class="col" filled dense emit-value :disable="!!editing_obj.id" map-options :options="type_options" v-model="editing_obj.type" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">状态</div>
        <q-select class="col" filled dense emit-value map-options :options="options_state" v-model="editing_obj.state" />
      </div>
      <div class="row" v-if="editing_obj.type == 2">
        <div class="w120 form-item-label">关联文档</div>
        <q-select class="col" filled dense emit-value map-options use-input input-debounce="100" label="可以关键字过滤" @filter="filterFn" option-label="name" option-value="id" :options="related_doc_options" v-model="editing_obj.related_doc" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">排序</div>
        <q-input class="col" filled dense v-model="editing_obj.order" type="number" label="排序越小越靠前，建议间隔100进行输入" />
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
import { ref, toRaw, markRaw } from "vue";
import { api_file, api_menu } from "src/api/index";
import { table_crud_mixin } from "src/mixin/index";

import { mapGetters } from "vuex";

export default {
  emits: ["emit-edit"],
  mixins: [table_crud_mixin],
  data () {
    return {
      //API 命名空间
      api_namespace: api_menu,
      tabtitle: 0,
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        state: -1,
        father_id: "",
        mark: "",
        type: 1,
        order: null,
        related_doc: "",
        mulit_language: {},
      },
      related_doc_options: [],
      children: [],
      options_state: [
        {
          label: "开启",
          value: 1,
        },
        {
          label: "关闭",
          value: -1,
        },
      ],
      type_options: [
        {
          label: "文件夹",
          value: 1,
        },
        {
          label: "文件",
          value: 2,
        },
      ],
      //中文内容 旁边的插入图片
      content_zn_files: null,
      //英文内容 旁边的插入图片
      content_en_files: null,
    };
  },
  props: {
    detail_obj_: {},
    current_folder: {},
  },
  computed: {
    ...mapGetters(["get_all_documdent"]),
  },
  created () {
    this.searchalllan()
    this.related_doc_options = markRaw(this.get_all_documdent)
    if (this.detail_obj_.id) {
      this.get_info();
    } else {
      this.editing_obj = this.$lodash.cloneDeep(this.temp_obj);
      this.children = [];
    }


  },
  methods: {
    async get_info () {
      let params = {
        id: this.detail_obj_.id,
      };
      let res = await api_menu.handle_info(params);
      let { code, msg, data } = res.data;
      let obj = eval("(" + data.mulit_language + ")")
      data.mulit_language = obj
      this.editing_obj = this.$lodash.cloneDeep(data);
      this.children = this.$lodash.cloneDeep(this.editing_obj.children || []);

      this.children.map((x, i) => {
        x["_index"] = i;
      });
      console.log("this.children----", this.children);
      this.$forceUpdate();
    },
    //英文文内容 文件 更新
    handle_content_en_files_update (value) {
      this.handle_content_files_update(value, "content_en");
    },
    //中文内容 文件 更新
    async handle_content_zn_files_update (value) {
      this.handle_content_files_update(value, "content_zn");
    },
    //通用内容 文件 更新
    async handle_content_files_update (value, key) {
      console.log(" //中文内容 文件 更新");
      console.log(value);
      let name = value.name;
      if (!name) {
        return false;
      }
      let data = await this.handle_upload([value]);
      console.log(data);
      let path = data[name];
      let str = ` <div class="text-center"><img src="http://127.0.0.1:17101${path}" style="zoom: 60%;" ></div>`;
      this.editing_obj[key] += str;
    },
    /**
     * 文件上传
     * @param {*} files
     */
    async handle_upload (files = []) {
      console.log("this.files----", this.files);
      let len = files.length;
      if (len == 0) {
        return false;
      }
      let form = new FormData();
      for (let i = 0; i < len; i++) {
        form.append("files[]", files[i]);
      }
      form.set("other", 1);
      let res = await api_file.handle_upload(form);
      form = null;
      console.log(res.data);
      let { code, data, msg, success } = res.data;
      if (success) {
        return data;
      } else {
        return "";
      }
    },
    /**
     * 中文 内容更改
     */
    handle_content_zn_update (value) {
      console.log(
        "this.$refs.content_zn_input.selectionStart-------",
        this.$refs.content_zn_input.selectionStart
      );
      console.log(value);
    },
    /**
     * 英文内容更改
     */
    handle_content_en_update (value) {
      console.log(value);
    },

    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit () {
      let {
        id,
        mulit_language,
        mark,
        state = -1,
        type = 1,
        order,
        related_doc,
      } = this.editing_obj;
      if (type == 1) {
        related_doc = "";
      }
      if (type == 2 && !related_doc) {
        state = -1
      }


      console.log(" this.editing_obj.related_doc-", this.editing_obj.related_doc);
      let final_obj = {
        id,
        mulit_language,
        mark,
        state,
        type,
        order,
        related_doc,
      };
      if (!final_obj.mulit_language || !final_obj.mulit_language.zh_cn) {
        this.$q.notify({
          timeout: 900,
          type: "negative",
          message: "中文标题必填",
        });
        return
      }
      final_obj.father_id = this.current_folder.id

      console.log("this.editing_obj-----11---", JSON.stringify(final_obj));

      this.$utils.remove_false_key(final_obj);

      console.log("this.editing_obj-----22---", final_obj);

      this.$emit("emit-edit", final_obj);
    },

    filterFn (val, update, abort) {
      let get_all_documdent = this.get_all_documdent
      update(() => {
        const needle = val.toLowerCase()
        let arr = get_all_documdent.filter(v => v.name_zh.toLowerCase().indexOf(needle) > -1)
        this.related_doc_options = markRaw(arr)
      })
    },

    /**
     * 取消  取消更改
     *
     */
    handle_cancel_edit () { },

    /**
     * 删除子节点
     */
    handle_delete_child_item (item) {
      console.log(item);
    },
    /**
     * 后面新增子节点
     */
    handle_add_child_item (item) {
      console.log(item);
    },
    /**
     * 更新 子节点
     */

    handle_update_child_item (item) {
      console.log(item);
    },
  },
};
</script>
<style lang="scss" scoped></style>
