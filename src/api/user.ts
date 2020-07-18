import request, { ResponseData } from "@/utils/axios";
import { AxiosPromise } from "axios";
interface LoginArgInterface {
  username: string;
  password: string;
}
export interface RespData {
  nickname: string;
  qq?: string;
}

export const loginReq = <T>(
  body: LoginArgInterface
): AxiosPromise<ResponseData> => {
  try {
    return request.http({
      url: "/user/login",
      method: "POST",
      data: body
    });
  } catch (err) {
    throw new Error(`loginReq:login=>[error]:${err.toString()}`);
  }
};
