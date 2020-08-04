//测试在vue项目中使用vue-socket.io，
//对应项目在D:\DemoAndSources\websocket\vuesocketio\vuewssoc
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", function (req, res) {
  res.send("<h1>你好web秀</h1>");
});

io.on("connection", function (socket) {
  //接收数据
  socket.on("login", function (obj) {
    console.log("login:", obj.username);
    // 发送数据
    socket.emit("relogin", {
      msg: `你好${obj.username}`,
      code: 200,
    });
  });
  socket.on("emit_method", function (obj) {
    console.log("emit_method:", obj);
    // 发送数据
    // socket.emit("relogin", {
    //   msg: `你好${obj.username}`,
    //   code: 200,
    // });
  });

  socket.emit("customEmit", function (obj) {
    console.log("customEmit:", obj.username);
    // 发送数据
    // socket.emit("relogin", {
    //   msg: `你好${obj.username}`,
    //   code: 200,
    // });
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});

// 作者：javanx
// 链接：https://juejin.im/post/6844903935656853512
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
