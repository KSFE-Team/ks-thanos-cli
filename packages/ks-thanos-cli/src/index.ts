const moduleAlias = require('module-alias');
moduleAlias.addAlias('Src', __dirname);
import { runSync } from 'Src/commands/sync';
import { runInit } from 'Src/commands/init';
import { runUi } from 'Src/commands/ui';
import { runMergeNginx } from 'Src/commands/mergeNginx';
import { runChangeEnv } from 'Src/commands/changeEnv';

export {
    runSync,
    runInit,
    runUi,
    runMergeNginx,
    runChangeEnv
};
