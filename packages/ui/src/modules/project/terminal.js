import { Terminal } from 'xterm';

class KSTerminal {
    getInstance() {
        if (!this.instance) {
            this.instance = new Terminal({
                allowTransparency: true,
                theme: {
                    background: '#00000077'
                }
            });
        }

        return this.instance;
    }
}

export default KSTerminal.prototype.getInstance();
