<!--
 * @Date           : 2022-03-28 12:50:29
 * @LastEditTime   : 2022-03-29 16:36:45
 * @Description    :
-->
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="官网助手模块" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm" v-if="show_search_form_area">
        <q-input outlined v-model="search_form.name" dense class="w200 q-mr-md">
          <template v-slot:prepend> 名字 </template>
        </q-input>
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
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge v-if="props.row.status == 1" color="blue"> 开启 </q-badge>
          <q-badge v-else-if="props.row.status == -1" color="grey">
            关闭
          </q-badge>
          <q-badge v-else-if="props.row.status == -2" color="red">
           禁用
          </q-badge>

        </q-td>
      </template>

      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
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
    <q-dialog v-model="show_dialog_edit">
      <q-card class="my-card w600 q-px-md">
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
        <q-card-section class="q-py-md q-gutter-y-md">
          <div class="row">
            <div class="w120 form-item-label">名字</div>
            <q-input class="col" filled dense v-model="detail_obj.name" />
          </div>
          <div class="row">
            <div class="w120 form-item-label">状态</div>
            <q-select
              class="col"
              filled
              dense
              emit-value
              map-options
              :options="options_state"
              v-model="detail_obj.status"
            />

          </div>
  <div class="row">
            <div class="w120 form-item-label">排序</div>
            <q-input class="col" filled dense v-model="detail_obj.order" type="number" />
          </div>

        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn
            v-close-popup
            color="primary"
            @click="handle_conform_edit"
            label="确定"
          />
          <q-btn
            v-close-popup
            color="deep-orange"
            glossy
            @click="handle_cancel_edit"
            label="取消"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import { columns } from "./config/index";
import { api_assistant } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
export default {
  components: {},
  mixins: [window_size_mixin, table_crud_mixin],
  data() {
    return {
      //列表 表格项配置
      columns,

      //编辑弹窗内的数据
      detail_obj: {
        name: "",
        status: -1,
        order:0,
      },
      //搜索表单
      search_form: {
        name: "",
      },
      //增加 API
      api_fn_create: api_assistant.handle_create,
      //删除 API
      api_fn_delete: api_assistant.handle_delete,
      //修改 API
      api_fn_update: api_assistant.handle_update,
      //查询 API
      api_fn_read: api_assistant.handle_read,
      //禁用 API
      api_fn_disable:api_assistant.handle_disable,


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
    };
  },
};
</script>
