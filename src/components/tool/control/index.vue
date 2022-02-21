<template>
  <div class="control">
    <MoveControl />
  </div>
</template>

<script lang="ts">
import MoveControl from "./move.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    MoveControl,
  },
})
export default class Control extends Vue {}
</script>
<style lang="scss" scoped></style>
