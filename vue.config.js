// const path = require("path");
// const { promisify } = require("util");
// const fs = require("fs");
// const readFile = promisify(fs.readFile);
// const resolve = dir => {
//   return path.join(__dirname, dir);
// };
// const config = require("./src/config/index") 报错 cannot find module

// const {api:{devApiBaseUrl,proApiBaseUrl}} = config;
const isDev = process.env.NODE_ENV === "production" ? false : true;
const BaseUrl = isDev ? "./" : "/";
const defaultJson = {
  status: "-1",
  msg: "",
  data: []
};
function bodyParse(req) {
  return new Promise(resolve => {
    const data = [];
    req.on("data", chunk => {
      data.push(chunk);
    });

    req.on("end", () => {
      req.body = JSON.parse(data);
      resolve();
    });
  });
}
function mockLogin(req, res) {
  //mock登录
  const { username, password } = req.body;
  if (username === "lvanboy" && password === "admin..") {
    res.json({
      ...defaultJson,
      status: "0",
      msg: "登录成功",
      data: { nickname: "lvanboy" }
    });
  } else {
    res.json({
      ...defaultJson,
      msg: "登录失败"
    });
  }
}
function generDevConfig(config) {
  if (!config.devServer) {
    config.devServer = {};
  }
  config.devServer.before = app => {
    app.all("/api/user/*", async (req, res) => {
      await bodyParse(req);
      mockLogin(req, res);
      // const data = await readFile(resolve("/src/mocks/") + `${req.path}.json`)
      // res.json(JSON.parse(data));
    });
  };
}

module.exports = {
  publicPath: BaseUrl,
  lintOnSave: false,
  configureWebpack: config => {
    if (isDev) {
      generDevConfig(config);
    }
  }
};
