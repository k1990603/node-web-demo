<!--
 * @Date           : 2022-03-28 12:50:29
 * @LastEditTime: 2022-09-18 10:43:33
 * @Description    :
-->
<template>
  <div class="q-pa-md">
    <div ref="tableHeader">
      <!-- 导航栏 -->
      <div class="q-py-xs">
        <q-breadcrumbs>
          <q-breadcrumbs-el label="主页面" v-if="!is_child_component" />
          <q-breadcrumbs-el label="菜单配置模块" />
        </q-breadcrumbs>
      </div>
      <!-- 搜索区域 -->
      <div class="row q-my-sm" v-if="show_search_form_area">
        <q-select label="关联文档" class="w200 q-mr-md" filled dense clearable emit-value map-options :options="get_all_documdent" option-label="name" option-value="id" v-model="search_form.document" />
        <q-input outlined v-model="search_form.name" dense label="标题" class="w200 q-mr-md">
        </q-input>
        <q-select clearable label="状态" style="width:200px" filled dense emit-value map-options :options="options_state" v-model="search_form.state" />
        <q-space />
        <q-btn color="secondary" glossy class="q-mr-md" v-if="show_create_btn" @click="hadle_click_create" label="新建" />
        <q-btn color="primary" glossy class="q-mr-md" @click="hadle_click_search" label="搜索" />
        <q-btn color="deep-orange" glossy @click="hadle_reset_search_form" label="重置" />
      </div>
    </div>

    <div class="row q-my-md q-gutter-x-sm">
      <div>全路径:</div>

      <div v-for="(item, index) in current_path_arr" :key="index" @click="handle_path_item_click(item, index)" class="cursor-pointer text-blue">
        {{ item.name_zh }} <q-icon name="chevron_right"></q-icon>
      </div>
    </div>
    <q-table class="sticky-header-table" :rows="table_data" :columns="columns" row-key="name" table-header-class="bg-grey-4   text-weight-bolder" hide-pagination hide-bottom v-model:pagination="pagination" :style="`max-height:${scroll_area_height}px`">
      <template v-slot:body-cell-type="props">
        <q-td :props="props">
          <div v-if="props.row.type == 1" class="cursor-pointer text-blue" @click="handle_get_record_children(props.row)">
            <q-icon name="folder_open"></q-icon>
          </div>
          <div v-else>
            <q-icon name="text_snippet"></q-icon>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-name_zh="props">
        <q-td :props="props">
          <div v-if="props.row.type == 1" class="cursor-pointer text-blue" @click="handle_get_record_children(props.row)">
            {{ props.row.name_zh }}
          </div>
          <div v-else>{{ props.row.name_zh }}</div>
        </q-td>
      </template>
      <template v-slot:body-cell-name_en="props">
        <q-td :props="props">
          <div v-if="props.row.type == 1" class="cursor-pointer text-blue" @click="handle_get_record_children(props.row)">
            {{ props.row.name_en }}
          </div>
          <div v-else>{{ props.row.name_en }}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-state="props">
        <q-td :props="props">

          <ShowBadge :value="props.row.state" />
        </q-td>
      </template>
      <template v-slot:body-cell-related_doc="props">
        <q-td :props="props">

          <div> {{compute_show_related_doc_name(props.row)}}</div>
        </q-td>
      </template>

      <template v-slot:body-cell-handle="props">
        <q-td :props="props">
          <div class="row q-gutter-x-md justify-center" style="width:450px">
            <q-input filled dense style="width:100px" v-model="props.row.order" type="number" label="排序从小到大" @blur="handle_update_record_by_key(props.row,'order')" />

            <q-select filled dense emit-value map-options style="width:80px" :options="options_state" v-model="props.row.state" @update:model-value="handle_update_record_by_key(props.row,'state')" />

            <q-btn color="primary" glossy @click="handle_edit_record(props.row)" label="编辑" />

            <!-- <q-btn color="deep-orange" glossy @click="handle_delete_record(props.row)" label="删除" v-if="$config.show_delete" /> -->
          </div>
        </q-td>
      </template>
    </q-table>

    <!-- 编辑弹窗 -->
    <q-dialog v-model="show_dialog_edit" persistent>
      <ArticleEdit :detail_obj_="detail_obj" :current_folder="current_folder" @emit-edit="handle_conform_edit" />
    </q-dialog>
    <!-- 预览弹窗 -->
    <q-dialog v-model="show_dialog_preview" persistent>
      <ArticlePreview :detail_obj_="detail_obj" :handle_info="api_fn_info" />
    </q-dialog>
  </div>
</template>
<script>
import { columns } from "./config/index";
import { mapActions, mapGetters } from "vuex";
import { api_menu } from "src/api/index.js";
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
      //API 命名空间
      api_namespace: api_menu,
      //不显示翻页器
      show_pagination_area: false,
      //不自动请求列表
      init_table_when_created: false,
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

      // 当前目录
      current_folder: {},
      //预览弹窗
      show_dialog_preview: false,
      //当前全路径
      current_path_arr: [
        {
          name_en: "root",
          name_zh: "根节点",
          id: -1,
          type: 1
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["get_all_documdent"]),

  },
  created () {
    this.set_all_menu();
    this.set_all_documdent({ state: 1 });



    this.init_when_created()


  },
  methods: {
    ...mapActions([
      "set_all_menu",
      'set_all_documdent'
    ]),
    handle_preview_record (record) {
      this.detail_obj = record;

      this.show_dialog_preview = true;
    },


    init_when_created () {
      let current_path_arr = this.$q.sessionStorage.getItem('current_path_arr')

      if (current_path_arr) {
        this.current_path_arr = current_path_arr

      } else {
        this.current_path_arr = [
          {
            name_en: "root",
            name_zh: "根节点",
            id: -1,
            type: 1
          },
        ]
      }
      this.current_folder = this.current_path_arr[this.current_path_arr.length - 1]
      this.init_table_data({ id: this.current_folder.id || -1 });
    },


    /**
     * 列表项名字点击
     * @param {*} record
     */
    handle_get_record_children (record) {
      console.log('record-----------', record);
      console.log(record.id);
      if (record.type == 1) {
        this.current_path_arr.push(record);


        this.init_table_data({ id: record.id });
        this.current_folder = record
        this.$q.sessionStorage.set('current_path_arr', this.current_path_arr)
      }
    },

    /**
     * 获取子节点
     */
    async init_table_data (obj) {


      if (obj) { obj.deep = true }

      let params = obj || {
        ... this.search_form,
        id: this.current_folder.id,
        deep: true

      }

      let res = await api_menu.handle_children(params);
      let { code, msg, data } = res.data;
      this.table_data = data;
    },
    /**
     * 路径path 点击
     * @param {*} item
     * @param {*} index
     */
    handle_path_item_click (item, index) {
      console.log(item);

      this.current_path_arr = this.current_path_arr.slice(0, index)
      this.handle_get_record_children(item)
    },
    //计算显示的关联文档的标题
    compute_show_related_doc_name (record) {
      let { type, related_doc } = record
      if (type != 2) { return '' }
      console.log(this.get_all_documdent);

      let obj = this.get_all_documdent.find(x => x.id == related_doc)



      console.log(obj);
      return obj ? obj.name : ''

    },
  },

};
</script>
