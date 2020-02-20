import { execSync } from 'child_process';
import chalk from 'chalk';
import figlet from 'figlet';
import open from 'open';

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
