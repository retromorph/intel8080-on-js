let RAM = require("./ram.js");
let executor = require("./executor");

module.exports = {
    tick: 100,
    timer: 0b00000000,
    session: undefined,
    init(os, tick) {
        this.tick = (!tick) ? this.tick : tick;

        executor.init(this.interrupter);
        RAM.init();

        session = setInterval(() => {
            //console.log(RAM.get(this.timer).toString() === "00000000");
            executor.execute(RAM.get(this.timer).toString());
            this.timer = (this.timer + 1) % 0b11111111;

        }, this.tick);
    },

    interrupter() {
        clearInterval(session);
        console.log("Process terminated");
    }

};
