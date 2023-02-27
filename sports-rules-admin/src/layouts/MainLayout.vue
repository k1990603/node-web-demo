<!--
 * @Date           : 2022-03-10 18:36:58
 * @FilePath: \sports-rules-admin\src\layouts\MainLayout.vue
 * @Description    :
-->
<template>
  <q-layout view="hHh Lpr lFf">
    <q-resize-observer @resize="onResize" />
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round @click="toggleLeftDrawer" icon="menu" aria-label="Menu" />
        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>
        <q-space />

        <q-btn v-for="(item, index) in env_options" :key="index" class="q-mr-md bg-white text-black" @click="package_by_env(item.value)">{{item.label}}打包
        </q-btn>
        <a href="https://typora.io/" target="_blank" class="q-mr-lg" rel="noopener noreferrer">typora 专业md文档编辑器下载</a>
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round dense flat color="white" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'" @click="$q.fullscreen.toggle()" v-if="$q.screen.gt.sm">
          </q-btn>

          <!-- <q-btn round dense flat color="white" icon="notifications">
            <q-badge color="red" text-color="white" floating> 5 </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <messages></messages>
                <q-card class="text-center no-shadow no-border">
                  <q-btn
                    label="View All"
                    style="max-width: 120px !important"
                    flat
                    dense
                    class="text-indigo-8"
                  ></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn> -->
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="img/boy-avatar.png" />
            </q-avatar>
            <q-menu>
              <q-list style="min-width: 100px">

                <!-- <q-card class="text-center no-shadow no-border"> -->
                <div class="text-center">
                  <q-btn label="登出" style="max-width: 120px !important" flat dense @click="handle_logout" class="text-indigo-8 q-mx-md"></q-btn>
                </div>

              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="200" class="bg-primary text-white">
      <q-list>
        <q-item v-for="(item1, index1) in menu_config" :key="index1" clickable @click="handle_menu_item_click(item1)" class="cursor-pointer" :active="current_route_name == item1.name" active-class="q-item-no-link-highlighting">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item1.label }}</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import Messages from "./Messages";

import { defineComponent, ref } from "vue";
import { api_packingrecords } from "src/api/index";

import menuConfig from "src/config/menu.js";
import { mapActions } from "vuex";
export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    Messages,
  },
  data () {
    return {
      title: process.env.title,
    };
  },

  setup () {
    const leftDrawerOpen = ref(false);
    const menu_config = ref(menuConfig);

    return {
      env: ref(""),
      env_options: ref([
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
      ]),
      leftDrawerOpen,
      menu_config,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  watch: {
    env () {
      this.package_by_env()
    }
  },
  computed: {
    current_route_name () {
      return this.$route.name;
    },
  },
  methods: {
    ...mapActions([
      "set_window_size", //also supports payload `this.nameOfAction(amount)`
    ]),
    /**
    * @description 全量打包
    * @param
    * @return
    */
    async package_by_env (env) {
      //---------打包逻辑
      //---------记录日志
      let res = await api_packingrecords.handle_create({ env });
      let { code, msg, data } = res.data;
      if (code == "1001") {
        this.$q.notify({
          timeout: 900,
          message: '等十分钟后 去客户端查看是否成功！',
          color: 'secondary'
        });
      }else{
        this.$q.notify({
          timeout: 900,
          type: "negative",
          message: msg,
        });
      }
    },
    handle_menu_item_click (item) {
      console.log('item-----', item);
      this.$router.push({
        name: item.name,
      });
    },
    onResize (size) {
      console.log(size);
      this.set_window_size(size);
    },
    handle_logout () {
      this.$q.sessionStorage.remove("token")
      this.$router.push({ path: "/" })
    }
  },
});
</script>
