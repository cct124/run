<template>
  <div ref="game" id="game_container" class="game-container w-100p h-100p">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import gsap from "gsap";

@Options({})
export default class GameContainer extends Vue {
  gameContainer: HTMLElement | undefined;
  mounted(): void {
    this.gameContainer = this.$refs.game as HTMLElement;
  }
  /**
   * 模糊页面
   */
  blur(): void {
    if (this.gameContainer) {
      gsap.to(this.gameContainer, {
        filter: "blur(4px)",
        duration: 1,
      });
    }
  }
  /**
   * 重置样式页面
   */
  reset(): void {
    if (this.gameContainer) {
      this.gameContainer.style.filter = "blur(0px)";
    }
  }
}
</script>
<style lang="scss" scoped></style>
