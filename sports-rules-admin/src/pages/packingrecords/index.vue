<!--
 * @Date           : 2022-03-28 12:50:29
 * @LastEditTime: 2022-09-06 17:14:27
 * @Description    :
-->
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" />
          <q-breadcrumbs-el label="打包记录模块" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm" v-if="show_search_form_area">

        <q-select clearable label="环境" style="width:200px" filled dense emit-value map-options :options='env_options' v-model="search_form.env" />
        <q-input outlined v-model="search_form.author" label="作者" dense class="w200 q-mr-md q-ml-md">
        </q-input>
        <q-space />
        <!-- <q-btn color="secondary" glossy class="q-mr-md" v-if="!iscomponent && show_create_btn" @click="hadle_click_create" label="新建" /> -->
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name" table-header-class="bg-grey-4   text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination" :style="`max-height:${scroll_area_height}px`">

      <template v-slot:body-cell-env="props">
        <q-td :props="props">
          <div>
            {{env_options_[props.row.env]}}</div>
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
  </div>
</template>
<script>
const API_BASEURL = process.env.API_BASEURL;
import { ref, toRaw, markRaw } from "vue";
import { columns } from "./config/index";
import { mapActions, mapGetters } from "vuex";
import { api_packingrecords, api_file } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";
import ShowBadge from "src/components/badge/badge.vue";
export default {
  components: {
    ShowBadge,
  },
  mixins: [window_size_mixin, table_crud_mixin],
  data () {
    return {
      //API 命名空间
      api_namespace: api_packingrecords,
      //列表 表格项配置
      columns,
      env_options: [
        {
          label: "测试",
          value: "ceshi",
        },
        {
          label: "试玩",
          value: "shiwan",
        },
        {
          label: "生产",
          value: "shengchan",
        },
        {
          label: "全量",
          value: "quanliang",
        },
      ],
      env_options_: { "ceshi": "测试", "shiwan": "试玩", "shengchan": "生产", "quanliang": "全量" },
      //搜索表单
      search_form: {
        env: "",
        author: "",
      },
    };
  },
  watch: {
  },
  props: {
  },
  created () {
  },
  computed: {
  },
  methods: {



  },
};
</script>
