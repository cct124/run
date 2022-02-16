<template>
  <div class="tool">
    <div class="move flex-center" @click="move">
      {{ mousedown ? "〓" : "▶" }}
    </div>
  </div>
</template>

<script lang="ts">
import Game from "@/scripts/class/game";
import { Options, Vue, prop } from "vue-class-component";

@Options({})
export default class Tool extends Vue.with(
  class {
    game = prop<Game>({ required: true });
  }
) {
  mounted(): void {
    this.game.app.ticker.add(() => {
      if (this.game.scroller && this.mousedown)
        this.game.scroller.moveViewportXBy(10);
    });
  }

  mousedown = false;
  private move() {
    this.mousedown = !this.mousedown;
    if (this.game.scroller) this.game.scroller.move = this.mousedown;
  }
}
</script>
<style lang="scss" scoped>
.tool {
  z-index: 1;
  .move {
    width: 60px;
    height: 30px;
    background-color: #ccc;
    position: absolute;
    right: 10px;
    bottom: 10px;
    user-select: none;
  }
}
</style>
