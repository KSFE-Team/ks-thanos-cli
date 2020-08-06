import controller, { file, runNpmCommand, runCommand, thanos, thanosSync } from '../controllers';
import Router from 'koa-router';

const VERSION = 'v1';
const PROJECT = 'ks-thanos-ui-server';

const router = new Router({
    prefix: `/api/${PROJECT}/${VERSION}`
});
router.get('/hello', controller);
router.get('/runNpmCommand', runNpmCommand);
router.get('/runCommand', runCommand);
router.get('/file', file);
router.get('/thanos', thanos);
router.get('/thanosSync', thanosSync);

export default router;
