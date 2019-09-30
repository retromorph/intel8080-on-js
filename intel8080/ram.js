let RAMItem = function () {
    let priv = {
        val: 0b00000000
    };

    this.setBinary = (mask) => {
        priv.val |= mask;
    };

    this.set = (val) => {
        priv.val = val;
    };

    this.get = () => {
        return priv.val;
    };

    this.toString = () => {
        let result = "";
        for (let i = 0, mask = 0b00000001; i < 8; i++) {
            //console.log(((priv.val & mask) >> i+1));
            result += ((priv.val & mask) >> i).toString();
            mask <<= 1;
        }
        return result.split("").reverse().join("");
    }

};

module.exports = {
    init() {
        for (let i = 0b00000000; i < 0b11111111; i += 0b00000001) {
            this[i] = new RAMItem();
        }
    },

    get(address) {
        return this[address];
    }
}
