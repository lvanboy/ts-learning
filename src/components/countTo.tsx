import { CountUp } from "countup.js";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
@Component({
  name: "countTo"
})
export default class CountTo extends Vue {
  @Prop({ type: Number, default: 0 }) public readonly start!: number;
  @Prop(Number) public readonly end!: number;

  counter: CountUp | null = null;
  get eleId() {
    return `count_to_${(this as any)._uid}`;
  }
  protected render() {
    return (
      <div class="count-up-wraper" on-click={this.onClick}>
        <span id={this.eleId}></span>
      </div>
    );
  }
  protected mounted() {
    this.counter = new CountUp(this.eleId, this.end, {
      startVal: this.start,
      duration: 1.9
    });
    this.counter.start();
  }
  public update(endVal: number): void {
    this.counter?.update(endVal);
  }
  @Emit("on-click")
  onClick(event: Event) {
    return event;
  }
}
// @ is an alias to /src
