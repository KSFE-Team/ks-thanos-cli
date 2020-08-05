declare module '@ks-thanos/utils' {
    export interface CONSTANTS {
        ENV_PRODUCTION: string;
        ENV_DEVELOPMENT: string;
    }

    export interface MESSAGE {
        success(message: string): string;
        info(message: string): string;
        warn(message: string): string;
        error(message: string): string;
    }
    export const constants: CONSTANTS; 
    export const message: MESSAGE;
}
