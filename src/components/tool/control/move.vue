<template>
  <van-button class="move events" type="primary" @click="move">
    <van-icon class="flex-center" name="pause" v-if="mousedown" />
    <van-icon class="flex-center" name="play" v-else />
    <span>run</span>
  </van-button>
</template>

<script lang="ts">
import Game from "@/scripts/class/game";
import { Button, Icon } from "vant";
import { Options, Vue, setup } from "vue-class-component";
import { inject } from "vue";

@Options({
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
  },
})
export default class MoveControl extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  game = setup<Game>(() => inject("game") as Game);

  mounted(): void {
    this.game.app.ticker.add(() => {
      if (this.game.scroller && this.mousedown)
        this.game.scroller.moveViewportXBy(5);
    });
  }

  mousedown = false;
  private move() {
    this.mousedown = !this.mousedown;
    this.game.move = this.mousedown;
  }
}
</script>
<style lang="scss" scoped>
.move {
  width: 90px;
  height: 30px;
  &::v-deep {
    .van-button__text {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
