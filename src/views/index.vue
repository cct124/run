<template>
  <div class="container relative" ref="container">
    <Play v-if="!init" @play="play"></Play>
    <Gameover ref="gameover" @restart="restart"></Gameover>
    <Tool :game="game" v-if="init && game.debug"></Tool>
    <GameContainer ref="game_container">
      <Score v-if="init" :score="score"></Score>
      <canvas id="canvas" class="canvas" ref="canvas"></canvas>
    </GameContainer>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { computed } from "vue";
import { Options, Vue } from "vue-class-component";
import Game, { GameChannel } from "@/scripts/class/game";
import Tool from "@/components/tool/index.vue";
import Play from "@/components/game/play/index.vue";
import Score from "@/components/game/score/index.vue";
import Gameover from "@/components/game/gameover/index.vue";
import GameContainer from "@/components/game/container/index.vue";
// import { Adaptation } from "@/scripts/utils/adaptation";
import { config, ENV } from "../config";
// import * as PIXI from "pixi.js";
@Options({
  components: {
    Tool,
    Play,
    Gameover,
    Score,
    GameContainer,
  },

  provide() {
    return {
      gameContainer: computed(() => this.$refs.game_container),
    };
  },
})
export default class GameComponent extends Vue {
  game: Game | undefined;
  init = false;
  gameover = false;

  score = 0;

  mounted(): void {
    if (this.$route.query.env === ENV.beta) {
      // config.debug = true;
      this.initGame();
    }
    document.documentElement.addEventListener("fullscreenchange", () => {
      document.documentElement.requestFullscreen();
    });
  }

  initGame(): void {
    const container = this.$refs.container as HTMLElement;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.game = new Game({
      view: canvas,
      width: container.offsetWidth,
      height: container.offsetHeight,
      assets: config.assets,
    });
    this.game.listen(GameChannel.init, () => {
      this.init = true;
    });
    this.game.listen(GameChannel.gameover, ({ target }) => {
      (this.$refs.gameover as Gameover).open();
      target.app.stop();

      // 截图
      // let renderTexture = new (PIXI.RenderTexture as any).create({
      //   width: target.app.view.width,
      //   height: target.app.view.height,
      // });
      // target.app.renderer.render(target.app.stage, renderTexture);
      // 输出截图
      // console.log(target.app.renderer.plugins.extract.base64(renderTexture));
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
  // private adaptation(container: HTMLElement, target: HTMLElement) {
  //   // console.log(container.offsetWidth, container.offsetHeight);

  //   const adaptation = new Adaptation(
  //     {
  //       width: container.offsetWidth,
  //       height: container.offsetHeight,
  //     },
  //     {
  //       width: target.offsetWidth,
  //       height: target.offsetHeight,
  //     }
  //   );
  //   target.style.transform = `scale(${adaptation.trw})`;
  // }

  /**
   * 重置游戏
   */
  private restart() {
    this.game!.app.start();
    this.game!.restart();
    (this.$refs.gameover as Gameover).close();
    (this.$refs.game_container as GameContainer).reset();
  }

  private popstate() {
    // window.close();
    history.pushState(null, "", document.URL);
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
