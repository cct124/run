<template>
  <div class="container relative" ref="container">
    <Score v-if="init" :score="score"></Score>
    <Play v-if="!init" @play="play"></Play>
    <Gameover v-if="gameover" @restart="restart"></Gameover>
    <Tool :game="game" v-if="init && game.debug"></Tool>
    <canvas class="canvas" ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Game, { GameChannel } from "@/scripts/class/game";
import Tool from "@/components/tool/index.vue";
import Play from "@/components/game/play/index.vue";
import Score from "@/components/game/score/index.vue";
import Gameover from "@/components/game/gameover/index.vue";
import { Adaptation } from "@/scripts/utils/adaptation";
import { config, ENV } from "../config";

@Options({
  components: {
    Tool,
    Play,
    Gameover,
    Score,
  },
})
export default class GameComponent extends Vue {
  game: Game | undefined;
  init = false;
  gameover = false;

  score = 0;

  mounted(): void {
    if (this.$route.query.env === ENV.beta) {
      config.debug = true;
      this.initGame();
    }
  }

  initGame(): void {
    const container = this.$refs.container as HTMLElement;
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    this.game = new Game({
      view: canvas,
      width: container.offsetWidth,
      height: container.offsetHeight,
      assets: config.assets,
    });
    this.game.listen(GameChannel.init, () => {
      this.init = true;
    });
    this.game.listen(GameChannel.gameover, () => {
      this.gameover = true;
    });
    this.game.listen(GameChannel.scoreChange, ({ target }) => {
      this.score = target.score;
    });
  }

  private play() {
    this.initGame();
  }

  /**
   * 适配
   */
  private adaptation(container: HTMLElement, target: HTMLElement) {
    console.log(container.offsetWidth, container.offsetHeight);

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

  private restart() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.game!.restart();
    this.gameover = false;
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
