import controller, {
    file, runNpmCommand, runCommand,
    thanos, thanosSync, getProjectProcess
} from '../controllers';
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
router.get('/getProjectProcess', getProjectProcess);
export default router;
