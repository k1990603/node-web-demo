import { mapGetters } from "vuex";
export default {
  data() {
    return {
      //滚动区域高度
      scroll_area_height: 600,
      //滚动区域头部上面区域高度
      scroll_area_top_ref_name: "tableHeader",
      //其他高度 ，除了滚动区域 和滚动区域 scroll_area_top_ref_name 区域之外的区域的高度
      other_height: 140,
    };
  },
  computed: {
    ...mapGetters(["get_window_size_change"]),
  },
  mounted() {
      //计算滚动区域高度 
    this.compute_scroll_area_height();
  },
  methods: {
    /**
     * 计算滚动区域高度
     */
    compute_scroll_area_height() {
       //滚动区域头部上面区域  DOM 
      let scroll_area_top_ref = this.$refs[this.scroll_area_top_ref_name];
       //滚动区域头部上面区域 高度 
      let scroll_area_top_clientHeight = scroll_area_top_ref
        ? scroll_area_top_ref.clientHeight
        : 0;
       //滚动区域高度 
      this.scroll_area_height =
        window.innerHeight - scroll_area_top_clientHeight - this.other_height;
    },
  },
  watch: {
      // 窗口大小改变
    get_window_size_change(newValue, oldValue) {
      this.compute_scroll_area_height();
    },
  },
};
