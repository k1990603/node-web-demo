<!--
 * @Author: eisha
 * @Description: 
 * @FilePath: \sports-rules-admin\src\components\table\md_list_table.vue
-->
<template>
  <div>
    <div class="row q-my-sm fw800">历史文档参照</div>
    <q-markup-table class="text-center" style="
    max-height: 300px;
">
      <thead>
        <tr>
          <th class=" ">序号</th>
          <th class=" ">名称</th>
          <th class=" ">作者</th>
          <th class=" ">更新时间</th>
          <th class="">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in historty_list" :key="index">
          <td class="">{{ index + 1 }}</td>
          <td class="">
            <div class="ellipsis-line"> <a @click="click_item(item)">{{ item.name}}</a></div>
          </td>
          <td class="">
            <div class="ellipsis-line">
              {{ item.author}}</div>
          </td>
          <td class="">
            {{ date.formatDate(item.updatedAt, "YYYY-MM-DD HH:mm:ss ") }}
          </td>
          <td class=" q-gutter-x-md row ">
            <q-select filled dense emit-value map-options style="width: 80px" :options="options_state" v-model="item.state" @update:model-value="
                check_state(item, 'state')
              " />
            <q-btn color="primary" glossy @click="click_edit(item)" label="原基础上新建" />
            <q-btn color="primary" label="下载" @click="handle_download_md_file(item.path,item.name)" />
            <!-- <q-btn color="deep-orange" v-if="$config.show_delete" label="删除" @click="handle_delete_md_file(item)" /> -->
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
import { date } from "quasar";
const API_BASEURL = process.env.API_BASEURL;
import { api_mddocpool as api_namespace, api_file } from "src/api/index";
import { table_crud_mixin } from "src/mixin/index";
export default {
  mixins: [table_crud_mixin],
  setup () {
    return {};
  },
  data () {
    return {
      api_namespace,
      date,
    };
  },
  props: {
    //历史记录
    historty_list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    /**
    * @description 编辑
    * @param
    * @return
    */
    click_edit (item) {
      this.$emit("click_edit", item);
    },
    //查看详情
    click_item (item) {
      this.$emit("show_md_detail", item);
    },
    //判断状态
    check_state (item) {
      let state_open = this.historty_list.find(val => { if (val.state == 1 && val.id != item.id) return item })
      if (item.state == 1 && state_open) {
        this.$q.notify({
          timeout: 900,
          type: "negative",
          message: "在当前语种下请先关闭其他历史md文档，再开启此md文档",
        });
        item.state = -1
        return
      }
      this.handle_update_record_by_key(item, 'state')
    },

    async handle_delete_md_file (item) {
      await this.handle_delete_record(item)
      this.$emit("init_table");

    },
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
  },
};
</script>

<style lang="scss" scoped>
.ellipsis-line {
  overflow: hidden;
  width: 100px;
  text-overflow: ellipsis; //文本溢出显示省略号
  white-space: nowrap; //文本不会换行
}
::v-deep .q-table tbody td {
  height: 55px;
}
</style>
