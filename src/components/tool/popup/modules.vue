<template>
  <van-cell-group>
    <van-cell
      v-for="(item, index) in modules"
      :key="index"
      :title="item.name"
      :label="item.label"
      center
    >
      <template #right-icon>
        <van-switch
          v-model="item.checked"
          size="18"
          @click="switchModule(item)"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script lang="ts">
import { inject } from "vue";
import Game from "@/scripts/class/game";
import { Options, Vue, setup } from "vue-class-component";
import { Switch, Cell, CellGroup } from "vant";
import { Modules } from "@/scripts/class/debug/index";

interface ModulesItem {
  name: string;
  type: Modules;
  checked: boolean;
  label?: string;
}

@Options({
  components: {
    [Switch.name]: Switch,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
})
export default class ToolModules extends Vue {
  game = setup<Game>(() => inject("game") as Game);

  modules: ModulesItem[] = [
    {
      name: "墙体碰撞线",
      type: Modules.WallCollisionLine,
      checked: false,
      label: "显示碰撞检测的墙体多边形",
    },
  ];

  show = false;

  /**
   * 打开功能选择弹层
   */
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
      width: 200px;
      height: 100%;
    }
  }
}
</style>
