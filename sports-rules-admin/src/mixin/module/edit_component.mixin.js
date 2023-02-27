/*
 * @Date           : 2022-04-10 21:34:02
 * @LastEditTime: 2022-08-06 16:09:16
 * @Description    :
 */
// API 异步 模板占位 方法
const temp_promise_fn = new Promise((resolve, reject) => {
  resolve({ data: { code: "", msg: "", data: "" } });
});
import UploadComponent from "src/components/upload/upload.vue";
import UploadComponentMd from "src/components/upload/upload_md.vue";

import RuleComponent from "src/components/rule/rule.vue";
import MdListTable from "src/components/table/md_list_table.vue";

import { mapGetters } from "vuex";
export default {
  emits: ["emit-close", "emit-related-id"],
  components: {
    UploadComponent,
    RuleComponent,
    UploadComponentMd,
    MdListTable,
  },
  data() {
    return {
      //API 命名空间
      api_namespace: {},
      questionTopic_options: [],
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
    };
  },
  props: {
    detail_obj: {},
  },

  computed: {
    ...mapGetters(["get_questionTopic"]),
    //增加 API
    api_fn_create: function () {
      return this.api_namespace.handle_create || temp_promise_fn;
    },
    //修改 API
    api_fn_update: function () {
      return this.api_namespace.handle_update || temp_promise_fn;
    },
    //详情 API
    api_fn_info: function () {
      return this.api_namespace.handle_info || temp_promise_fn;
    },
  },
  created() {
    if (this.detail_obj.id) {
      this.get_info();
    } else {
      this.editing_obj = { ...this.temp_obj };
    }

    this.questionTopic_options = JSON.parse(
      JSON.stringify(this.get_questionTopic)
    );
  },
  methods: {
    /**
     * 获取详情
     */
    async get_info() {
      let params = {
        id: this.detail_obj.id,
      };
      let res = await this.api_fn_info(params);
      let { code, msg, data } = res.data;
      console.log(data);
      this.editing_obj = this.$lodash.cloneDeep(data);
      this.$forceUpdate();
    },
    /**
     *编辑弹窗  确定
     *
     */
    async handle_conform_edit_process(obj) {
      console.log(obj);
      // return false
      let params = obj || {
        ...this.detail_obj,
      };
      if (params.id) {
        //修改   确定
        await this.handle_conform_update(params);
      } else {
        // 新增   确定
        await this.handle_conform_create(params);
      }
      this.before_close_dialog();
      this.show_dialog_edit = false;
      this.handle_close_dialog();
    },
    // 关闭弹窗前操作
    before_close_dialog() {},
    /**
     * 新增   确定
     *
     */
    async handle_conform_create(obj) {
      let params = obj || {
        ...this.detail_obj,
      };
      let res = await this.api_fn_create(params);
      let { code, msg, data } = res.data;
      this.$emit("emit-related-id", data.id);
    },
    /**
     * 修改   确定
     *
     */
    async handle_conform_update(obj) {
      let params = obj || {
        ...this.detail_obj,
      };
      let res = await this.api_fn_update(params);
      let { code, msg, data } = res.data;
    },
    /**
     * 中文 内容更改
     */
    handle_content_zn_update(value) {
      console.log(
        "this.$refs.content_zn_input.selectionStart-------",
        this.$refs.content_zn_input.selectionStart
      );
      console.log(value);
    },
    /**
     * 英文内容更改
     */
    handle_content_en_update(value) {
      console.log(value);
    },
    /**
     * 关闭弹窗
     */
    handle_close_dialog() {
      this.$emit("emit-close");
    },
    /**
     * 接收文件上传 生成的 html
     *
     */
    handle_file_emit_upload_html_str(obj) {
      this.editing_obj[obj.key] += obj.str;
    },
    /**
     * 接收文件上传 生成的地址
     *
     */
    handle_file_emit_upload_file_path(obj) {
      this.editing_obj[obj.key] = obj.path;
    },
  },
};
