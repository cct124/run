<template>
  <div id="tool" class="tool">
    <Control class="pad-10 w-100vw bx flex-jcfe-aic"></Control>
    <ToolPopup></ToolPopup>
  </div>
</template>

<script lang="ts">
import Game from "@/scripts/class/game";
import Control from "./control/index.vue";
import ToolPopup from "./popup/index.vue";
import { Options, Vue, prop } from "vue-class-component";
import { computed } from "vue";

@Options({
  components: {
    Control,
    ToolPopup,
  },
  provide() {
    return {
      game: computed(() => this.game),
    };
  },
})
export default class Tool extends Vue.with(
  class {
    game = prop<Game>({ required: true });
  }
) {}
</script>
<style lang="scss" scoped>
.tool {
  z-index: 1;
  position: absolute;
  width: 100vw;
  height: 100vh;

  .control {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
