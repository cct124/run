<template>
  <div class="play flex-center flex-column w-100p h-100p">
    <van-button class="play-game" type="primary" @click="play">
      PLAY
    </van-button>
    <!-- <div class="mar-t-10">
      <van-button
        class="fullscreen mar-r-10"
        plain
        type="primary"
        @click="fullscreen"
      >
        Fullscreen
      </van-button>
      <van-button class="landscape" plain type="success" @click="landscape">
        Landscape
      </van-button>
    </div> -->
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
export default class Play extends Vue {
  orieType = {
    landscape: "landscape",
    portrait: "portrait",
  };

  private landscape() {
    const oppositeOrientation = screen.orientation.type.startsWith("portrait")
      ? this.orieType.landscape
      : this.orieType.portrait;
    screen.orientation
      // eslint-disable-next-line no-undef
      .lock(oppositeOrientation as unknown as OrientationLockType)
      .then(() => {
        console.log(`Locked to ${oppositeOrientation}`);
        setTimeout(() => {
          if (screen.orientation.type.startsWith(this.orieType.landscape)) {
            this.$emit("play");
          }
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  private fullscreen() {
    document.documentElement.requestFullscreen();
  }

  private play() {
    this.fullscreen();
    this.landscape();
  }
}
</script>
<style lang="scss" scoped>
.play {
  background-color: #3b5b66;
}
</style>
