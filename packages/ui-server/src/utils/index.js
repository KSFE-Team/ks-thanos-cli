import { execSync } from 'child_process';
import chalk from 'chalk';
import figlet from 'figlet';
import open from 'open';
import net from 'net';
import path from 'path';
import { getStore, setStore } from './store';

export function openBrowser(url) {
    // If we're on OS X, the user hasn't specifically
    // requested a different browser, we can try opening
    // Chrome with AppleScript. This lets us reuse an
    // existing tab when possible instead of creating a new one.
    const shouldTryOpenChromeWithAppleScript =
        process.platform === 'darwin';

    if (shouldTryOpenChromeWithAppleScript) {
        try {
            // Try our best to reuse existing tab
            // on OS X Google Chrome with AppleScript
            execSync('ps cax | grep "Google Chrome"');
            execSync('osascript ../../assets/openChrome.applescript "' + encodeURI(url) + '"', {
                cwd: __dirname,
                stdio: 'ignore',
            });
            return true;
        } catch (err) {
            // Ignore errors.
        }
    }

    // Fallback to opn
    // (It will always open new tab)
    try {
        var options = { wait: false };
        open(url, options).catch(() => { }); // Prevent `unhandledRejection` error.
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * 装逼专用文字
 */
export function createSplash(str) {
    console.log(chalk.gray(figlet.textSync(str, {
        horizontalLayout: 'default',
        verticalLayout: 'default',
    })));
}

export function isUsedPort(port) {
    return new Promise((resolve, reject) => {
        let server = net.createServer().listen(port);
        server.on('listening', function() {
            server.close();
            resolve(true);
        });
        server.on('error', function(err) {
            if (err.code === 'EADDRINUSE') {
                reject(new Error(false));
            }
        });
    });
}

export const requireModule = (modulePath) => {
    const module = require(modulePath);
    const { __esModule: esModule, default: defaultExport } = module;
    return esModule ? defaultExport : module;
};

export const getConfig = (cwd) => {
    return requireModule(path.resolve(cwd, './ksconfig/config.js'));
};

export {
    getStore,
    setStore
};
