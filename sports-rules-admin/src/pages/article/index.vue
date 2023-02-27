<!--
 * @Date           : 2022-03-28 12:50:29
 * @LastEditTime   : 2022-04-10 21:21:50
 * @Description    :
-->
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="文章模块" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm" v-if="show_search_form_area">
        <q-input
          outlined
          v-model="search_form.name"
          label="标题"
          dense
          class="w200 q-mr-md"
        >
        </q-input>
        <q-select
          class="w200 q-mr-md"
          outlined
          dense
          emit-value
          label="类型"
          map-options
          :options="options_type"
          v-model="search_form.type"
        />
        <q-space />
        <q-btn
          color="secondary"
          glossy
          class="q-mr-md"
          v-if="show_create_btn"
          @click="hadle_click_create"
          label="新建"
        />
        <q-btn
          color="primary"
          glossy
          class="q-mr-md"
          @click="hadle_click_search"
          label="搜索"
        />
        <q-btn
          color="deep-orange"
          glossy
          @click="hadle_reset_search_form"
          label="重置"
        />
      </div>
    </div>
    <q-table
      class="sticky-header-table"
      :rows="table_data"
      :columns="columns"
      row-key="name"
      table-header-class="bg-grey-4   text-weight-bolder"
      hide-pagination
      hide-bottom
      v-model:pagination="pagination"
      :style="`max-height:${scroll_area_height}px`"
    >
      <template v-slot:body-cell-snippet="props">
        <q-td :props="props">
          <div v-if="props.row.type == 1" class="ellipsis w200">
            {{ props.row.moment_content }}
          </div>
          <div v-else class="ellipsis w200">
            {{ props.row.title }}
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <div>
            {{ compute_show_type(props.row) }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <ShowBadge :value="props.row.status" :options="options_state" />
        </q-td>
      </template>

      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <q-btn
            color="primary"
            class="q-mr-md"
            glossy
            @click="handle_preview_record(props.row)"
            label="预览"
          />
          <q-btn
            color="primary"
            class="q-mr-md"
            glossy
            @click="handle_edit_record(props.row)"
            label="编辑"
          />
          <q-btn
            color="deep-orange"
            glossy
            @click="handle_disable_record(props.row)"
            label="禁用"
          />
        </q-td>
      </template>
    </q-table>
    <!-- 底部翻页器 -->
    <div class="q-mt-md row justify-center" v-if="show_pagination_area">
      <a-pagination
        v-model:current="currentPage"
        :page-size-options="pageSizeOptions"
        :total="total"
        show-size-changer
        show-quick-jumper
        :page-size="pageSize"
        :show-total="(total) => `总共 ${total} 条`"
        @change="onChange"
        @showSizeChange="onShowSizeChange"
      >
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
    <q-dialog v-model="show_dialog_edit" style="width: 800px">
      <ArticleEdit :init_obj="detail_obj" />
    </q-dialog>
    <!-- 预览弹窗 -->
    <q-dialog v-model="show_dialog_preview">
      <ArticlePreview />
    </q-dialog>
  </div>
</template>
<script>
import { columns } from "./config/index";
import { api_article, api_file } from "src/api/index.js";
import {
  window_size_mixin,
  table_crud_mixin,
  image_upload_mixin,
} from "src/mixin/index";
import ArticleEdit from "src/components/article/edit.vue";
import ArticlePreview from "src/components/preview/preview.vue";
import ShowBadge from "src/components/badge/badge.vue";

export default {
  components: {
    ArticleEdit,
    ArticlePreview,
    ShowBadge,
  },
  mixins: [window_size_mixin, table_crud_mixin, image_upload_mixin],
  data() {
    return {
       //API 命名空间
      api_namespace:api_article,
      //列表 表格项配置
      columns,

      //编辑弹窗内的数据
      detail_obj: {
        name: "",
        status: -1,
        order: 0,
      },
      //搜索表单
      search_form: {
        name: "",
        type: "",
      },


      options_state: [
        {
          label: "开启",
          value: 1,
        },
        {
          label: "关闭",
          value: -1,
        },
        {
          label: "禁用",
          value: -2,
        },
      ],
      //文章类型
      //类型   1 momentArticle  时刻文章  2 videoArticle   视频文章  3   commonArticle 常规文章
      options_type: [
        {
          label: "时刻文章",
          value: 1,
        },
        {
          label: "视频文章",
          value: 2,
        },
        {
          label: "常规文章",
          value: 3,
        },
      ],

      //预览弹窗
      show_dialog_preview: false,
    };
  },
  methods: {
    compute_show_type(record) {
      let obj = this.options_type.find((x) => x.value == record.type);
      return obj.label;
    },
    handle_preview_record(record) {},
  },
};
</script>
