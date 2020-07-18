import { Vue, Component } from "vue-property-decorator";
import { loginReq, RespData } from "@/api/user";
import { ResponseData } from "@/utils/axios";
import Cookies from "js-cookie";
@Component
export default class LoginPage extends Vue {
  userName = "";
  password = "";
  resData = {} as ResponseData;
  ml = {
    marginLeft: "10px"
  };
  async login() {
    try {
      const { data } = await loginReq({
        username: this.userName,
        password: this.password
      });
      this.resData = data;
      if (parseInt(data.status, 10) === 0) {
        Cookies.set("token", "lvanboy");
      }
    } catch (err) {
      console.error(`${err.toString()}`);
      alert(`${err.toString()}`);
    }
  }

  protected render() {
    return (
      <div>
        <input v-model={this.userName} />
        <input v-model={this.password} type="password" style={{ ...this.ml }} />
        <button
          on-click={this.login}
          style={{ ...this.ml, color: "lightblue" }}
        >
          确定
        </button>
        {<p>{this.resData.msg}</p>}
      </div>
    );
  }
}
