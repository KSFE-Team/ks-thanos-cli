declare module '@ks-thanos/ui-server/ui' {
    export default class ThanosUi {
        env: string;
        uiEnv: string;
        serverEnv: string;
        port: number;
        initPath: string;
        constructor(config: {
            env: string;
            uiEnv: string;
            serverEnv: string;
            uiPort: number;
            serverPort: number;
        });
        init(): undefined;
        start(): undefined;
    }
}
