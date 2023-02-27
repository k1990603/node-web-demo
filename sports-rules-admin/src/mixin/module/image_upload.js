// <template>
//   <div class="q-mx-md">
//     <div class="row q-ma-md">
//       <q-input
//         @update:model-value="
//           (val) => {
//             files = val;
//           }
//         "
//         multiple
//         filled
//         type="file"
//       >
//         <template v-slot:before>
//           <div>文件上传</div>
//         </template>
//         <template v-slot:after>
//           <div>
//             <q-btn color="primary" @click="handle_upload()"> 点击上传</q-btn>
//           </div>
//         </template>
//       </q-input>
//     </div>
//   <div class="row q-gutter-md justify-start">
//      <div v-for="(item,index) in image_preview_arr" :key="index" style="width:100px;height:100px">
//           <img  :src="item" alt="" style="max-width:100px;max-height:100px">
//      </div>
//   </div>
//     <div></div>
//   </div>
// </template>
import { api_file } from "src/api/index";
export default {
  setup() {
    return {};
  },
  data() {
    return {
      files: [],
      image_preview_arr: [],
    };
  },
  computed: {
    image_src() {},
  },
  watch: {
    files: {
      handler: function () {
        this.compute_image_src();
      },
      deep: true,
    },
  },
  methods: {
    compute_image_src() {
      let arr = [];
      console.log(" this.files-----------", this.files);
      for (let i = 0; i < this.files.length; i++) {
        let str = window.URL.createObjectURL(this.files[i]);
        arr.push(str);
      }
      console.log("arr---,", arr);
      this.image_preview_arr = arr;
    },
    async handle_upload() {
      console.log("this.files----", this.files);
      if (this.files.length < 0) {
        return false;
      }
      let form = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        form.append("files[]", this.files[i]);
      }
      form.set("other", 1);
      let { data } = await api_file.handle_upload(form);
      form = null;
    },
  },
};
