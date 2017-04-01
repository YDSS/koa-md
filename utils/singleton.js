/**
 * @file make a class to be singleton, delegate mode
 */
class Singleton {

    constructor(clz) {
        this.instance = null;

        return {
            getInstance(opt) {
                if (!this.instance) {
                    this.instance = new clz(opt);
                }

                return this.instance;
            }
        }
    }
}

module.exports = Singleton;
