import chalk from 'chalk';
import figlet from 'figlet';

/**
 * 通知信息
 */
export const infoText = chalk.blue;

/**
 * 错误信息
 */
export const errorText = chalk.red;

/**
 * 成功信息
 */
export const successText = chalk.green;

/**
 * 警告信息
 */
export const warningText = chalk.yellow;

/**
 * 装逼专用文字
 */
export function createSplash(str: string): string {
    return chalk.gray(figlet.textSync(str, {
        horizontalLayout: 'default',
        verticalLayout: 'default',
    }));
}
