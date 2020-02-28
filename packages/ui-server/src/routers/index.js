import { file, runCommand, thanos } from '../controllers';
import Router from 'koa-router';

const VERSION = 'v1';
const PROJECT = 'ks-thanos-ui-server';

const router = new Router({
    prefix: `/api/${PROJECT}/${VERSION}`
});
// router.get('/hello', controller);
router.get('/runCommand', runCommand);
router.get('/file', file);
router.get('/thanos', thanos);

export default router;
