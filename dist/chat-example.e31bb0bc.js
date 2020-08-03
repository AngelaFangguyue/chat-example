// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
// var app = require("express")();
// var http = require("http").createServer(app);
// var io = require("socket.io")(http);
// //app.get('/', (req, res) => {
// //  res.send('<h1>Hello world</h1>');
// //});
// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// //io.on('connection', (socket) => {
// //  console.log('a user connected');
// //});
// //io.on('connection', (socket) => {
// //  console.log('a user connected');
// //  socket.on('disconnect', () => {
// //    console.log('user disconnected');
// //  });
// //});
// // io.on('connection', (socket) => {
// // console.log('index.js里面chat message1》socket onmessage: ');
// //   socket.on('chat message', (msg) => {
// //     console.log('index.js里面chat message2》socket onmessage: ' + msg);
// //   });
// // });
// io.on("connection", function (socket) {
//   console.log("index.js里面chat message1》socket onmessage: ");
//   socket.on("chat message", function (msg) {
//     console.log(
//       "index.js里面chat message2》socket onmessage:.触发io.emit-chat message: ",
//       msg
//     );
//     io.emit("chat message1", msg);
//   });
// });
// http.listen(3000, () => {
//   console.log("listening on *:3000");
// });
////////////////////////////////////////////////
var socket = io(); // 列表list，输入框content，按钮sendBtn

var list = document.getElementById("list"),
    input = document.getElementById("input"),
    sendBtn = document.getElementById("sendBtn");
var userId = ""; // 发言的方法

function send() {
  console.log(socket.connected);
  var value = input.value;

  if (value) {
    // 发送消息给服务器
    socket.emit("message", value);
    input.value = "";
  } else {
    alert("输入的内容不能为空！");
  }
} // 回车发言的方法


function keySend(event) {
  var key = event.keyCode;

  if (key === 13) {
    send();
  }
} // 私聊的方法


function privateChat(event) {
  var target = event.target;
  var user = target.innerText;

  if (target.className === "user") {
    input.value = "@".concat(user, " ");
  }
} // 进入房间(群)


function join(room) {
  socket.emit("join", room);
} // 离开房间(群)


function leave(room) {
  socket.emit("leave", room);
} // 点击按钮进行发言


sendBtn.onclick = send; // 按回车进行发言

input.onkeydown = function (event) {
  keySend(event);
}; // 添加私聊


list.onclick = function (event) {
  privateChat(event);
}; // 监听进入房间后，将进入房间按钮隐藏


socket.on("joined", function (room) {
  document.getElementById("join-".concat(room)).style.display = "none";
  document.getElementById("leave-".concat(room)).style.display = "inline-block";
}); // 监听离开房间后，将离开房间按钮隐藏

socket.on("leaved", function (room) {
  document.getElementById("join-".concat(room)).style.display = "inline-block";
  document.getElementById("leave-".concat(room)).style.display = "none";
}); // 监听与服务端的连接

socket.on("connect", function () {
  console.log("连接成功");
  socket.emit("getHistory");
}); // 接收历史消息

socket.on("history", function (history) {
  // history拿到的是一个数组，所以用map映射成新数组，然后再join一下连接拼成字符串
  var html = history.map(function (data) {
    return "<li class=\"list-group-item\">\n                            <p style=\"color: #ccc;\"><span class=\"user\" style=\"color:".concat(data.color, "\">").concat(data.user, " </span>").concat(data.createAt, "</p>\n                            <p class=\"content\" style=\"background-color: ").concat(data.color, "\">").concat(data.content, "</p>\n                        </li>");
  }).join("");
  list.innerHTML = html + '<li style="margin: 16px 0;text-align: center">以上是历史消息</li>'; // 将聊天区域的滚动条设置到最新内容的位置

  list.scrollTop = list.scrollHeight;
}); // 接收服务端传过来的消息

socket.on("message", function (data) {
  console.log(data);
  console.log("userId", userId);
  var li = document.createElement("li");
  li.className = "list-group-item"; // 如果用户id与传过来的id相同就表示是自己

  li.style.textAlign = userId === data.id ? "right" : "left";
  li.innerHTML = "<p style=\"color: #ccc;\"><span class=\"user\" style=\"color:".concat(data.color, "\">").concat(data.user, " </span>").concat(data.createAt, "</p>\n                    <p class=\"content\" style=\"background-color: ").concat(data.color, "\">").concat(data.content, "</p>");
  list.appendChild(li); // 将聊天区域的滚动条设置到最新内容的位置

  list.scrollTop = list.scrollHeight;
}); // 获取对应的用户id

socket.on("getId", function (id) {
  userId = id;
});
},{}],"C:/Users/wb.fangguyue/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55245" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/wb.fangguyue/AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/chat-example.e31bb0bc.js.map