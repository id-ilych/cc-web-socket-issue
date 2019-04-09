let counter = 0;
function nextId() {
    const res = `[${counter}]`;
    ++counter;
    return res;
}

cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        this.clearLog();
        this.test("ws://echo.websocket.org")
            .then(() => this.test("wss://echo.websocket.org"));
    },

    log: function (msg) {
        this.label.string += msg;
        this.label.string += "\n";
    },

    clearLog: function () {
        this.label.string = "";
    },

    test: function (url) {
        return new Promise((resolve, reject) => {
            const id = nextId();
            const ws = new WebSocket(url, [], "ssl_cert.pem");
            this.log(id + "new: " + url);
            ws.onopen = (ev) => {
                this.log(id + "open: " + JSON.stringify(ev));
                ws.send("ping");
            };
            ws.onmessage = (ev) => {
                this.log(id + "message: " + ev.data);
                ws.close();
                resolve();
            };
            ws.onclose = (ev) => {
                this.log(id + "close: " + JSON.stringify(ev));
                resolve();
            }
            ws.onerror = (ev) => {
                this.log(id + "error: " + JSON.stringify(ev));
                resolve();
            }
        });
    }
});
