<!--
 * @Date           : 2022-03-28 12:50:29
 * @LastEditTime: 2022-09-18 10:43:25
 * @Description    :
-->
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs" v-if="!iscomponent">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="更新记录模块" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm" v-if="show_search_form_area">
        <q-select label="关联文档" class="w200 q-mr-md" filled dense clearable emit-value map-options :options="get_all_documdent" option-label="name" option-value="id" v-model="search_form.document" />
        <q-input outlined v-model="search_form.name" label="标题" dense class="w200 q-mr-md">
        </q-input>
        <q-select clearable label="状态" style="width:200px" filled dense emit-value map-options :options="options_state" v-model="search_form.state" />
        <q-space />
        <q-btn color="secondary" glossy class="q-mr-md" v-if="!iscomponent && show_create_btn" @click="hadle_click_create" label="新建" />
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name" table-header-class="bg-grey-4   text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination" :style="`max-height:${scroll_area_height}px`">
      <template v-slot:body-cell-state="props">
        <q-td :props="props">
          <q-badge v-if="props.row.state == 1" color="blue"> 开启 </q-badge>
          <q-badge v-else-if="props.row.state == -1" color="grey">
            关闭
          </q-badge>
          <q-badge v-else-if="props.row.state == -2" color="red">
            禁用
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-page_address="props">
        <q-td :props="props">

          <div class="cursor-pointer text-blue" @click="$utils.copy_text(`http://api-doc-2.sportxxxw1box.com/#/main/detail?type=updateRecord&id=${props.row.id}`)"> 复制哈希链接 </div>

        </q-td>

      </template>

      <template v-slot:body-cell-document="props">
        <q-td :props="props">
          <div>{{compute_related_doc(props.row)}}</div>

        </q-td>
      </template>

      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <div class="row q-gutter-x-md justify-center" style="width: 350px">
            <q-select filled dense emit-value map-options style="width: 80px" :options="options_state" v-model="props.row.state" @update:model-value="
                handle_update_record_by_key(props.row, 'state')
              " />
            <q-btn color="primary" glossy @click="handle_preview_record(props.row)" label="预览" />
            <q-btn color="primary" glossy @click="handle_edit_record(props.row)" label="编辑" />

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
      <ArticleEdit :detail_obj="detail_obj" @emit-close="handle_close_dialog" />
    </q-dialog>
    <!-- 预览弹窗 -->
    <q-dialog v-model="show_dialog_preview" persistent>
      <ArticlePreview :detail_obj="detail_obj" :handle_info="api_fn_info" />
    </q-dialog>
  </div>
</template>
<script>
import { ref, toRaw, markRaw } from "vue";
import { columns } from "./config/index";
import { mapActions, mapGetters } from "vuex";
import { api_updateRecord } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import ArticleEdit from "./components/edit_wapper.vue";
import ArticlePreview from "./components/preview.vue";
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
      pageSize: 20,
      //API 命名空间
      api_namespace: api_updateRecord,
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
        name: "",
        state: ""
      },

      //预览弹窗
      show_dialog_preview: false,
    };
  },
  props: {
    // 是否是子组件
    iscomponent: {
      type: Boolean,
      default: false,
    },
    document: "",
    related_doc: "",
  },
  watch: {
    search_form () {
      this.hadle_click_search()
    }
  },
  created () {
    this.search_form = { ...this.search_form, document: this.related_doc }
    this.hadle_click_search()
    this.set_all_documdent();
  },
  computed: {
    ...mapGetters(["get_all_documdent"]),
  },
  methods: {
    ...mapActions([
      "set_all_documdent",
    ]),
    handle_preview_record (record) {
      this.detail_obj = record;

      this.show_dialog_preview = true;
    },
    compute_related_doc (record) {
      let val = record.document

      if (!val) { return '' }

      let obj = this.get_all_documdent.find(x => x.id == val) || {}

      return obj.name || ''



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
        } else {
          params.faq = this.related_faq;
        }
      }

      return params;
    },
  },
};
</script>
