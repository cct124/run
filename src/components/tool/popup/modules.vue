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
          @click="$emit('switch', item)"
        />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script lang="ts">
import { Options, Vue, prop } from "vue-class-component";
import { Switch, Cell, CellGroup } from "vant";
import { ModulesItem } from "./index.vue";
@Options({
  components: {
    [Switch.name]: Switch,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
})
export default class Tools extends Vue.with(
  class {
    modules = prop<ModulesItem[]>({ required: true });
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
