import { Import } from 'Src/factories/page/types';
import { ComponentConfig } from '../component/basic/index';

export abstract class BasicElement {
    /**
     * 生成代码
     */
    abstract toCode(): string
    /**
     * 获取元素 import
     */
    abstract getImports(): Import[]
}

export abstract class BasicContainer extends BasicElement {
    /**
     * 添加组件
     */
    abstract addComponent(
        component: ComponentConfig // 组件配置
    ): void
}
