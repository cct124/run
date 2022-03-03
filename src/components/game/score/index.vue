<template>
  <div class="score">
    <div class="number fs-15">得分：{{ score }}</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, prop } from "vue-class-component";
import { Button } from "vant";

@Options({
  components: {
    [Button.name]: Button,
  },
})
export default class Score extends Vue.with(
  class {
    score = prop<number>({ required: true });
  }
) {}
</script>
<style lang="scss" scoped>
.score {
  position: fixed;
  padding: 10px;
  .number {
    color: #ffffff;
  }
}
</style>
