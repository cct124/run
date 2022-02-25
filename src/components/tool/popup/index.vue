<template>
  <div class="tool-popup">
    <van-icon name="setting-o" @click="setting" />
    <van-popup class="setting-popup" v-model:show="show" position="right">
      <ModulesComponents
        :modules="modules"
        @switch="switchModule"
      ></ModulesComponents>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { inject } from "vue";
import { Options, Vue, setup } from "vue-class-component";
import { Popup, Icon } from "vant";
import { Modules } from "@/scripts/class/debug/index";
import ModulesComponents from "./modules.vue";
import Game from "@/scripts/class/game";

export interface ModulesItem {
  name: string;
  type: Modules;
  checked: boolean;
  label?: string;
}

@Options({
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    ModulesComponents,
  },
})
export default class ToolPopup extends Vue {
  game = setup<Game>(() => inject("game") as Game);

  modules: ModulesItem[] = [
    {
      name: "开启Matter调试",
      type: Modules.MatterTool,
      checked: true,
      // label: "显示碰撞检测的墙体多边形",
    },
  ];

  show = false;

  open(): void {
    this.show = true;
  }

  private setting() {
    this.open();
  }

  private switchModule(item: ModulesItem) {
    if (this.game.debugModules) {
      if (item.checked) {
        this.game.debugModules.openModules(item.type);
      } else {
        this.game.debugModules.closeModules(item.type);
      }
    }
  }

  mounted(): void {
    for (const module of this.modules) {
      if (module.checked) this.switchModule(module);
    }
  }
}
</script>
<style lang="scss" scoped>
.tool-popup {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 30px;
  color: #ffffff;
  &::v-deep {
    .setting-popup {
      width: 250px;
      height: 100%;
    }
  }
}
</style>
