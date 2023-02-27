<!--
 * @Date           : 2022-04-05 19:25:14
 * @LastEditTime: 2022-08-07 10:35:37
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
        <div class="w120 form-item-label">名字</div>
        <q-input class="col" filled dense :disable="!!editing_obj.id" v-model="editing_obj.name" maxlength="40" />
      </div>

      <div class="row" v-if="!editing_obj.id">
        <div class="w120 form-item-label">密码</div>
        <q-input class="col" filled dense :disable="!!editing_obj.id" v-model="editing_obj.password" maxlength="40" />
      </div>
      <div class="row">
        <div class="w120 form-item-label">管理员</div>
        <q-checkbox :true-value="1" :false-value="0" dense type="textarea" v-model="editing_obj.admin" />
      </div>

      <div class="row">
        <div class="w120 form-item-label">备注</div>
        <q-input class="col" filled dense v-model="editing_obj.mark" maxlength="300" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-actions align="right">
      <q-btn color="primary" @click="handle_randomstring" label="随机帐密" />
      <q-btn color="primary" @click="handle_conform_edit" label="确定" />
      <q-btn v-close-popup color="deep-orange" glossy @click="handle_cancel_edit" label="取消" />
    </q-card-actions>
  </q-card>
</template>
<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  emits: ["emit-edit"],
  data () {
    return {
      editorRef: ref(null),
      files: [],
      editing_obj: {},
      temp_obj: {
        name: "",
        password: "",
        admin: 0,
        mark: "",

      },
    };
  },
  props: {
    detail_obj: {},
  },
  computed: {
    ...mapGetters(["get_user"]),

  },
  created () {
    if (this.detail_obj.id) {
      this.editing_obj = { ...this.temp_obj, ...this.detail_obj }
    } else {
      this.editing_obj = this.$lodash.cloneDeep(this.temp_obj);
    }
  },
  methods: {
    /**
     * 随机账密
     */
    handle_randomstring () {
      this.editing_obj.name = this.$utils.randomstring(16);

      this.editing_obj.password = this.$utils.randomstring(16);
    },
    /**
     * 确定 提交更改
     *
     */
    handle_conform_edit () {
      let { id, name, password, admin, mark } = this.editing_obj;
      let final_obj = {
        id,
        name,
        admin,
        mark

      };
      if (!id) {
        final_obj.password = password
      }
      if (!name) {
        this.$q.notify({
          timeout: 900,
          type: "negative",
          message: "名字密码必填",
        });
      }
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
