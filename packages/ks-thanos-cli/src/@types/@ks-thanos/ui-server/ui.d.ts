declare module '@ks-thanos/ui-server/output/ui' {
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
            port: number;
        });
        init(): undefined;
        start(): undefined;
    }
}
