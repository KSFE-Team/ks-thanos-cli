export class Effect {

    name: string
    code: string

    constructor(config: {
        name: string;
        code: string;
    }) {
        const { name, code } = config;
        this.name = name;
        this.code = code;
    }
}