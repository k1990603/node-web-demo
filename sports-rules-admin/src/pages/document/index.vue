<!--
 * @Date           : 2022-03-28 12:50:29
 * @LastEditTime: 2022-09-18 10:43:48
 * @Description    :
-->
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="文档资源池模块" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm" v-if="show_search_form_area">
        <q-input outlined v-model="search_form.name" dense label="标题" class="w200 q-mr-md">
        </q-input>
        <q-select label="语言" class="w200 q-mr-md" filled dense emit-value clearable map-options :options="all_lan" option-label="name" option-value="value" v-model="search_form.language" />
        <q-select clearable label="状态" style="width:200px" filled dense emit-value map-options :options="options_state" v-model="search_form.state" />
        <q-space />
        <q-btn color="secondary" glossy class="q-mr-md" v-if="show_create_btn" @click="hadle_click_create" label="新建" />
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name" table-header-class="bg-grey-4   text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination" :style="`max-height:${scroll_area_height}px`">

      <template v-slot:body-cell-mulit_language="props">
        <q-td :props="props">
          <span v-html="props.row.lanname"></span>

        </q-td>

      </template>

      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <div class="row q-gutter-x-md justify-center" style="width: 450px">
            <q-select filled dense emit-value map-options style="width: 80px" :options="options_state" v-model="props.row.state" @update:model-value="
                handle_update_record(props.row, 'state')
              " />
            <q-btn color="primary" glossy @click="handle_preview_record(props.row)" label="预览" />
            <q-btn color="primary" glossy @click="handle_edit_record(props.row)" label="编辑" />

            <q-btn color="primary" glossy @click="handle_show_update_record(props.row)" label="更新记录" />

            <!-- <q-btn color="deep-orange" glossy @click="handle_delete_record(props.row)" label="删除" v-if="$config.show_delete" /> -->
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
      <ArticlePreview :detail_obj="detail_obj" :all_lan="all_lan" :handle_info="api_fn_info" />
    </q-dialog>
    <!-- 更新记录弹窗 -->
    <q-dialog v-model="show_dialog_update_record" persistent>
      <q-card class="my-card mw80vw q-px-md w80vw">
        <q-card-section class="no-padding">
          <div class="row">
            <div class="lh40">更新记录</div>

            <q-space />
            <q-btn flat round icon="close" v-close-popup />
          </div>
        </q-card-section>
        <q-card-section class="no-padding">
          <UpdateRecord iscomponent :related_doc="detail_obj.id" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { columns } from "./config/index";
import { mapActions } from "vuex";
import { api_document } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import ArticleEdit from "./components/edit_wapper.vue";
import ArticlePreview from "src/components/preview/preview.vue";
import ShowBadge from "src/components/badge/badge.vue";
import UpdateRecord from "src/pages/updateRecord/index.vue";
export default {
  components: {
    ArticleEdit,
    ShowBadge,
    ArticlePreview,
    UpdateRecord,
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data () {
    return {
      pageSize: 20,
      //API 命名空间
      api_namespace: api_document,
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
      },

      //预览弹窗
      show_dialog_preview: false,
      //更新记录弹窗
      show_dialog_update_record: false,
    };
  },
  created () {
    // this.set_questionTopic();
    // this.set_all_faq();
    this.searchalllan()
  },
  watch: {
    all_lan () {
      this.set_lanname()
    },
    table_data (val) {
      this.set_lanname()
    }
  },
  methods: {
    ...mapActions([
      "set_questionTopic",
      "set_all_faq"
    ]),
    handle_update_record (row, key) {
      this.handle_update_record_by_key(row, key)
      this.hadle_click_search()

    },
    /**
    * @description 多语言组装
    * @param
    * @return
    */
    set_lanname () {
      this.table_data.map(item => {
        item.lanname = ""
        if (typeof item.mulit_language == "string") {

          let obj = item.mulit_language && eval("(" + item.mulit_language + ")")
          obj = obj ? obj : {}
          this.all_lan.forEach(lan => {
            if (obj[lan.value] == 1) {
              item.lanname += lan.name + " </br> "
            }
          })

        }
      })
    },
    /**
     * 显示预览 弹窗
     * @param {*} record
     */
    handle_preview_record (record) {
      this.detail_obj = record;

      this.show_dialog_preview = true;
    },
    /**
     * 显示更新记录 弹窗
     * @param {*} record
     */
    handle_show_update_record (record) {
      this.detail_obj = record;

      this.show_dialog_update_record = true;
    },
  },
};
</script>
