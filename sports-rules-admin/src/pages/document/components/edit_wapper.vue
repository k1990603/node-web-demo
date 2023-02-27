<!--
 * @Date           : 2022-04-03 21:49:58
 * @LastEditTime: 2022-08-08 17:09:52
 * @Description    :  
-->

<template>
  <q-card class="my-card  mw70vw q-px-md w70vw">
    <q-card-section class="no-padding">
      <div class="row">
        <q-tabs v-model="tab" class="text-teal">
          <q-tab name="edit">{{ detail_obj.id ? "编辑" : "新建" }}数据</q-tab>
          <q-tab name="updateRecord" v-if="detail_obj.id">添加更新记录</q-tab>
        </q-tabs>
        <q-space />
        <q-btn flat round icon="close" @click="handle_close_dialog" />
      </div>
    </q-card-section>
    <q-separator class="q-my-md" />
    <div>
      <q-card-section v-if="tab == 'edit'" class="no-padding">
        <EditComponent :detail_obj_="detail_obj" @emit-related-id="handle_close_dialog" />
      </q-card-section>
      <q-card-section v-if="tab == 'updateRecord'" class="no-padding">
        <EditUpdateRecord :detail_obj="{}" isinner :document="related_id" @emit-related-id="handle_close_dialog" />
      </q-card-section>

    </div>

  </q-card>
</template>
<script>


import EditComponent from "./edit.vue";
import EditUpdateRecord from "src/pages/updateRecord/components/edit.vue";
export default {
  components: {
    EditComponent,
    EditUpdateRecord,
  },
  emits: ["emit-close"],
  data () {
    return {
      tab: "edit",
      //关联ID
      related_id: "",
    };
  },
  props: {
    detail_obj: {},
  },
  created () {
    if (this.detail_obj.id) {
      this.related_id = this.detail_obj.id;
    }
  },
  methods: {
    /**
     * 接收 关联ID
     * @param {*} id
     */
    handle_recive_related_id (id) {
      this.related_id = id;
    },
    /**
     * 关闭弹窗
     */
    handle_close_dialog () {
      this.$emit("emit-close");
    },
  },
};
</script>
<style lang="scss" scoped></style>
