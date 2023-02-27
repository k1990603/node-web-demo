<!--
 * @Date           : 2022-04-05 19:25:14
 * @LastEditTime: 2022-08-06 13:54:31
 * @Description    :
-->
<!--
 * @Date           : 2022-04-03 21:49:58
 * @LastEditTime   : 2022-04-05 19:17:48
 * @Description    :
-->
<template>
  <q-card class="my-card mw50vw q-px-md w50vw">
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
      <div class="row">
        <div class="w120 form-item-label">中文名字</div>
        <q-input class="col" filled dense v-model="editing_obj.name_zh" maxlength="40" :disable="!!editing_obj.id"/>
      </div>

      <div class="row">
        <div class="w120 form-item-label">英文名字</div>
        <q-input class="col" filled dense v-model="editing_obj.name_en" maxlength="40" :disable="!!editing_obj.id" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">键</div>
        <q-input class="col" filled dense :disable="!!editing_obj.id" v-model="editing_obj.value" maxlength="40" />
      </div>

      <div class="row" v-if="detail_obj_.id">
        <div class="w120 form-item-label">回落语言</div>
        <q-select class="col" filled dense emit-value map-options option-label="name" option-value="id" :options="all_lan" v-model="editing_obj.default_language" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">排序</div>
        <q-input class="col" filled dense type="number" v-model="editing_obj.order" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">状态</div>
        <q-checkbox :true-value="1" :false-value="0" dense type="textarea" v-model="editing_obj.state" />
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
import { ref } from "vue";
import { api_language } from "src/api/index.js";
import { window_size_mixin, table_crud_mixin } from "src/mixin/index";

export default {
  emits: ["emit-edit"],
  mixins: [window_size_mixin, table_crud_mixin],
  data () {
    return {
      //API 命名空间
      api_namespace: api_language,
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      //搜索表单
      search_form: {
      },
      show_pagination_area: true,
      temp_obj: {
        name_zh: "",
        name_en: "",
        order: 100,
        state: 0,
        value: "",
        default_language: 1,
      },
    };
  },

  props: {
    detail_obj_: {},
  },
  created () {
    if (this.detail_obj_.id) {
      this.editing_obj = Object.assign(
        this.$lodash.cloneDeep(this.temp_obj),
        this.$lodash.cloneDeep(this.detail_obj_)
      );
      this.searchalllan()
    } else {
      this.editing_obj = this.$lodash.cloneDeep(this.temp_obj);
    }
  },
  methods: {
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit () {
      let { id, name_zh, name_en, order, state, value, default_language } = this.editing_obj;
      let final_obj = {
        id,
        name_zh,
        name_en,
        order,
        state,
        value,
        default_language,
      };
      // this.$utils.remove_false_key(final_obj);
      this.$emit("emit-edit", final_obj);
    },
    /**
     * 取消  取消更改
     *
     */
    handle_cancel_edit () { },
  },
};
</script>
<style lang="scss" scoped></style>
