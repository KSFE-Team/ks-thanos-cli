import { atom } from 'recoil';
import Page from '../components/Blocks/Page';

export const pageState = atom({
    key: 'pageState',
    default: [new Page()],
});
