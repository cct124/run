<template>
  <div class="gameover w-100vw h-100vh flex-center flex-column">
    <h1>GAME OVER</h1>
    <van-button
      class="restart"
      color="#7232dd"
      type="primary"
      @click="$emit('restart')"
    >
      重新开始
    </van-button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Button } from "vant";

@Options({
  components: {
    [Button.name]: Button,
  },
})
export default class Gameover extends Vue {}
</script>
<style lang="scss" scoped>
.gameover {
  z-index: 2;
  h1 {
    color: #e4e4e4;
    filter: drop-shadow(3px 8px 0px black);
  }
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(6, 45, 59, 0.8);
}
</style>
