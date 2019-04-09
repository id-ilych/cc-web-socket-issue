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
        const ws = new WebSocket("wss://echo.websocket.org");
        ws.onopen = (ev) => {
            this.log("open: " + JSON.stringify(ev));
            ws.send("ping");
        };
        ws.onmessage = (ev) => {
            this.log("message: " + ev.data);
        };
        ws.onclose = (ev) => {
            this.log("close: " + JSON.stringify(ev));
        }
        ws.onerror = (ev) => {
            this.log("error: " + JSON.stringify(ev));
        }
    },

    log: function (msg) {
        this.label.string += msg;
        this.label.string += "\n";
    }
});
