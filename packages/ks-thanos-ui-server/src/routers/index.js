import controller from '../controllers';
import Router from 'koa-router';

const VERSION = 'v1';
const PROJECT = 'ks-server';

const router = new Router({
    prefix: `/api/${PROJECT}/${VERSION}`
});

router.get('/hello', controller);

export default router;
