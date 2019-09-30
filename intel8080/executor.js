module.exports = {

    promises_arr: [],
    current_command: -1,

    commands: {
        ["00000000"]: {
            asm: "HLT", promises: 0, act() {
                this.interrupter();
                this.promises_arr = new Array(0);
                this.current_command = -1;
            }
        }
    },

    init(interrupter) {
        this.interrupter = interrupter;
    },

    execute(binary) {
        try {
            if (this.current_command === -1) {
                this.current_command = binary;
            }

            if (this.promises_arr.length === this.commands[this.current_command].promises) {
                this.commands[this.current_command].act.call(this);
            } else {
                this.promises_arr.push(binary);
            }
        } catch (e) {
            this.interrupter();
            console.log(e);
        }
    }
};
