<template>
  <div ref="mask" class="mask w-100p h-100p">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { inject } from "vue";
import GameContainer from "../container/index.vue";
import gsap from "gsap";

@Options({})
export default class Mask extends Vue {
  gameContainer = setup<GameContainer>(
    () => inject("gameContainer") as GameContainer
  );

  mask: HTMLElement | undefined;

  mounted(): void {
    this.mask = this.$refs.mask as HTMLElement;
    this.gameContainer.blur();
    this.mask.style.opacity = "0";
    gsap.to(this.mask, {
      opacity: 1,
      duration: 0.5,
    });
  }
}
</script>
<style lang="scss" scoped>
.mask {
  z-index: 2;

  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(6, 45, 59, 0.8);
}
</style>
