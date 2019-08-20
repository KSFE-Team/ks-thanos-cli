import { Import } from 'Src/factories/page/types';

export abstract class BaseElement {
    /**
     * 生成代码
     */
    abstract toCode(): string
    /**
     * 获取元素 import
     */
    abstract getImports(): Import[]
}
