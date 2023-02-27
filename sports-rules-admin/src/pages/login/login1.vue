<!--
 * @Date           : 2022-03-13 03:02:55
 * @FilePath: \sports-rules-admin\src\pages\login\login1.vue
 * @Description    :
-->
<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="img/profile.svg" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis"> 体育规则系统管理后台</div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="q-gutter-md">
              <q-input filled v-model="username" label="用户名" lazy-rules />

              <q-input type="password" filled v-model="password" label="密码" lazy-rules />

              <div class="text-center  ">
                <q-btn @click="login" label="登录" class="full-width" to="/" type="button" color="primary" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { api_admin } from "src/api/index";
import { mapActions } from "vuex";
import md5 from "md5";

export default defineComponent({
  setup () {
    return {
      username: ref(""),
      password: ref(""),
    };
  },
  methods: {
    ...mapActions([
      "set_user", //also supports payload `this.nameOfAction(amount)`
    ]),
    async login () {
      let params = {
        name: this.username,
        password: md5(this.password)
      };
      let res = await api_admin.handle_login(params);
      console.log("//管理员登录  res--", res);
      let { code, data, msg, success } = res.data;
      this.set_user(data)
      if (success) {
        this.$q.sessionStorage.set("token", data.token);

        this.$router.push({
          name: "user",
        });
      }
    },
  },
});
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);
}
</style>
