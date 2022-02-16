<template>
  <div class="container relative" ref="container">
    <Tool :game="game" v-if="init"></Tool>
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Game from "@/scripts/class/game";
import Tool from "@/components/Tool.vue";
import { Adaptation } from "@/scripts/utils/adaptation";
import { config } from "../config";

@Options({
  components: {
    Tool,
  },
})
export default class GameComponent extends Vue {
  game: Game | undefined;
  init = false;
  mounted(): void {
    const container = this.$refs.container as HTMLElement;
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    this.game = new Game({
      view: canvas,
      width: 667,
      height: 375,
      assets: config.assets,
    });
    this.adaptation(container, canvas);
    this.init = true;
  }

  /**
   * 适配
   */
  private adaptation(container: HTMLElement, target: HTMLElement) {
    const adaptation = new Adaptation(
      {
        width: container.offsetWidth,
        height: container.offsetHeight,
      },
      {
        width: target.offsetWidth,
        height: target.offsetHeight,
      }
    );
    target.style.transform = `scale(${adaptation.trw})`;
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  .tool {
    position: absolute;
    width: 100vw;
    height: 100vh;
  }
}
</style>
