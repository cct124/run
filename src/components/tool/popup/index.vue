<template>
  <div class="tool-popup">
    <van-icon name="setting-o" @click="setting" />
    <van-popup class="setting-popup" v-model:show="show" position="right">
      <Modules></Modules>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Popup, Icon } from "vant";
import Modules from "./modules.vue";
@Options({
  components: {
    [Popup.name]: Popup,
    [Icon.name]: Icon,
    Modules,
  },
})
export default class ToolPopup extends Vue {
  show = false;

  open(): void {
    this.show = true;
  }

  private setting() {
    this.open();
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
