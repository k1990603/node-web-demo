<!--
 * @Date           : 2022-03-28 12:50:29
 * @LastEditTime: 2022-09-18 10:43:37
 * @Description    :
-->
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs" v-if="!iscomponent">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="md文档更新记录模块" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm" v-if="show_search_form_area">
        <q-select label="关联文档" class="w200 q-mr-md" filled dense clearable emit-value map-options :options="get_all_documdent" option-label="name" option-value="id" v-model="search_form.document" />
        <q-select label="语言" class="w200 q-mr-md" filled dense emit-value clearable map-options :options="all_lan" option-label="name" option-value="value" v-model="search_form.language" />
        <q-select clearable label="状态" style="width:200px" filled dense emit-value map-options :options="options_state" v-model="search_form.state" />
        <q-space />
        <!-- <q-btn color="secondary" glossy class="q-mr-md" v-if="!iscomponent && show_create_btn" @click="hadle_click_create" label="新建" /> -->
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name" table-header-class="bg-grey-4   text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination" :style="`max-height:${scroll_area_height}px`">

      <template v-slot:body-cell-document="props">
        <q-td :props="props">
          <div>{{compute_related_doc(props.row).name || ''}}</div>

        </q-td>
      </template>
      <template v-slot:body-cell-language="props">
        <q-td :props="props">
          {{default_language[props.row.language]}}

        </q-td>
      </template>

      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <div class="row q-gutter-x-md justify-center" style="width: 400px">
            <q-select filled dense emit-value map-options style="width: 80px" disable :options="options_state" v-model="props.row.state" @update:model-value="
                handle_update_record_by_key(props.row, 'state')
              " />
            <q-btn color="primary" glossy @click="handle_preview_record(props.row)" label="预览" />
            <q-btn color="primary" glossy @click="handle_edit_record(props.row)" label="新建" />
            <q-btn color="primary" label="下载" @click="handle_download_md_file(props.row.path,props.row.name)" />

            <!-- <q-btn color="deep-orange" glossy v-if="$config.show_delete" @click="handle_delete_record(props.row)" label="删除" /> -->
          </div>
        </q-td>
      </template>
    </q-table>
    <!-- 底部翻页器 -->
    <div class="q-mt-md row justify-center" v-if="show_pagination_area">
      <a-pagination v-model:current="currentPage" :page-size-options="pageSizeOptions" :total="total" show-size-changer show-quick-jumper :page-size="pageSize" :show-total="(total) => `总共 ${total} 条`" @change="onChange" @showSizeChange="onShowSizeChange">
        <template #itemRender="{ type, originalElement }">
          <a v-if="type === 'prev'">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <component :is="originalElement" v-else></component>
        </template>
        <template #buildOptionText="props">
          <span>{{ props.value }}条/页</span>
        </template>
      </a-pagination>
    </div>
    <!-- 编辑弹窗 -->
    <q-dialog v-model="show_dialog_edit" persistent>
      <ArticleEdit :detail_obj="detail_obj" @emit-edit="handle_conform_edit" :get_all_documdent="get_all_documdent" :all_lan="all_lan" />
    </q-dialog>
    <!-- 预览弹窗 -->
    <q-dialog v-model="show_dialog_preview" persistent>
      <ArticlePreview :detail_obj="compute_related_doc(detail_obj)" :handle_info="api_fn_info" :normal_md="detail_obj" />
    </q-dialog>
  </div>
</template>
<script>
const API_BASEURL = process.env.API_BASEURL;
import { ref, toRaw, markRaw } from "vue";
import { columns } from "./config/index";
import { mapActions, mapGetters } from "vuex";
import { api_mddocpool, api_file } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import ArticleEdit from "./components/edit.vue";
import ArticlePreview from "src/components/preview/preview.vue";
import ShowBadge from "src/components/badge/badge.vue";
export default {
  components: {
    ArticleEdit,
    ShowBadge,
    ArticlePreview,
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data () {
    return {
      default_language: {},
      //API 命名空间
      api_namespace: api_mddocpool,
      //列表 表格项配置
      columns,

      //编辑弹窗内的数据
      detail_obj: {
        name: "",
        state: -1,
        order: 0,
      },
      //搜索表单
      search_form: {
        document: "",
        language: "",
        state: ""
      },

      //预览弹窗
      show_dialog_preview: false,
    };
  },
  watch: {
    table_data () {
      this.searchalllan()
    },
    all_lan (val) {
      this.all_lan.forEach(item => {
        this.default_language[item.value] = item.name
      }, this)
    }
  },
  props: {
    // 是否是子组件
    iscomponent: {
      type: Boolean,
      default: false,
    },
    document: "",
    related_faq: "",
  },
  created () {
    this.set_all_documdent();
  },
  computed: {
    ...mapGetters(["get_all_documdent"]),
  },
  methods: {
    ...mapActions([
      "set_all_documdent",
    ]),
    /**
     * 下载md 文档
     */
    async handle_download_md_file (file_path = "", name = "") {
      let url = API_BASEURL + "/" + file_path;
      let res = await api_file.handle_read_md_file({}, url);
      let { code, data } = res;
      let bloburl = window.URL.createObjectURL(new Blob([data]));
      console.log(data);
      let filename = file_path.substring(file_path.lastIndexOf("/"));
      let aLink = document.createElement("a");

      aLink.style.display = "none";
      aLink.setAttribute("target", "_blank");
      aLink.setAttribute("download", name);
      aLink.setAttribute("href", bloburl);

      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
    },
    handle_preview_record (record) {
      this.detail_obj = record;

      this.show_dialog_preview = true;
    },
    compute_related_doc (record) {
      let val = record.document

      if (!val) { return '' }

      let obj = this.get_all_documdent.find(x => x.id == val) || {}

      return obj



    },



    /**
     * 计算列表请求参数
     * @returns
     */
    compute_request_table_data_params () {
      let params = {
        ...this.search_form,
      };
      if (this.show_pagination_area) {
        //显示翻页器功能区
        params.currentPage = this.currentPage;
        params.pageSize = this.pageSize;
      }

      if (this.iscomponent) {
        if (this.document) {
          params.doc = this.document;
        }
      }

      return params;
    },
  },
};
</script>
