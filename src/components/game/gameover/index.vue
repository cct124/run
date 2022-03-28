<template>
  <Mask class="gameover flex-center flex-column" v-if="mask">
    <h1>GAME OVER !!</h1>
    <van-button
      class="restart"
      color="#7232dd"
      type="primary"
      @click="$emit('restart')"
    >
      重新开始
    </van-button>
  </Mask>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Button } from "vant";
import Mask from "../mask/index.vue";

@Options({
  components: {
    [Button.name]: Button,
    Mask,
  },
})
export default class Gameover extends Vue {
  mask = false;
  open(): void {
    this.mask = true;
  }

  close(): void {
    this.mask = false;
  }
}
</script>
<style lang="scss" scoped>
.gameover {
  h1 {
    color: #e4e4e4;
    filter: drop-shadow(3px 8px 0px black);
  }
}
</style>
