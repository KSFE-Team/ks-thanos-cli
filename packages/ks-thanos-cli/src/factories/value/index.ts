export interface ValueConfig {
    key: string;
    value: string;
    type: string;
}

export class Value implements ValueConfig {
    key: string
    value: string
    type: string

    constructor(config: ValueConfig) {
        this.key = config.key;
        this.value = config.value;
        this.type = config.type;
    }
}
