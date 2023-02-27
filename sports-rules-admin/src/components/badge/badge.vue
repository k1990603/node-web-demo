<!--
 * @Date           : 2022-04-03 22:01:57
 * @LastEditTime: 2022-08-06 14:25:43
 * @Description    :  
-->
<template>
  <div>

    <q-badge :color="compute_color()"> {{compute_label()}} </q-badge>
  </div>
</template>
<script>
export default {
  data () {
    return {};
  },
  computed: {
    find_obj () {
      return this.options.find((x) => x.value == this.value);
    },
  },
  props: {
    value: {
      type: Number,
      default: null,
    },
    options: {
      type: Array,
      default: () => [
        {
          label: "开启",
          value: 1,
        },
        {
          label: "关闭",
          value: -1,
        },
      ],
    },
  },
  methods: {
    compute_color () {
      if (this.find_obj.color) {
        return this.find_obj.color;
      }
      let color = "grey";
      let value = 1 * this.value
      switch (value) {
        case 1:
          color = "blue";
          break;
        case -1:
          color = "grey";
          break;
        case -2:
          color = "red";
          break;
        default:
          break;
      }
      return color;
    },
    compute_label () {
      let obj = this.options.find((x) => x.value == this.value)

      return obj.label

    }
  },
};
</script>
<style lang="scss" scoped></style>
