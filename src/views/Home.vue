<template>
  <div class="home">
    <count-to
      :start="100"
      :end="9999"
      ref="count"
      @on-click="handleClick"
    ></count-to>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CountTo from "@/components/countTo";
@Component({
  components: {
    CountTo
  }
})
export default class Home extends Vue {
  timer = 0;
  mounted() {
    this.timer = setInterval(() => {
      (this.$refs.count as CountTo).update(Math.random() * 10000);
    }, 2000);
  }
  destroyed() {
    clearInterval(this.timer);
  }
  handleClick(e: Event) {
    console.log("Event", e);
  }
}
</script>
