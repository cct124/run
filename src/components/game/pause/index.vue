<template>
  <div class="pause flex-center flex-column w-100p h-100p"></div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Button } from "vant";

@Options({
  components: {
    [Button.name]: Button,
  },
})
export default class Pause extends Vue {}
</script>
<style lang="scss" scoped>
.pause {
  position: fixed;
  background-color: #3b5b66;
}
</style>
