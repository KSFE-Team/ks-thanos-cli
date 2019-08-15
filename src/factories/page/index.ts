import { Import, BasciImport } from './types';
import Debug from '../../utils/debugger';
import { upperFirst, lowerFirst } from '../../utils/upperFirst';
import { BasicComponent } from '../component/basicComponent';
import { getImportsCode, getComponentsCode, addComponent } from './utils';
import Model from '../model/model';
import { Basic, ComponentConfig } from '../component/types';
import { ConnectDecorator } from '../decorator/connect';
import { FormDecorator } from '../decorator/form';

const debug = Debug(__filename);

export default class Page extends Basic {

    public name: string = '';
    public pageName: string = '';
    public className: string = '';

    public model: Model;

    private imports: Import = {
        'react': [{
            name: 'React',
            defaultImport: true
        }],
        'kredux': [{
            name: 'connect',
            defaultImport: false
        }, {
            name: 'actions',
            defaultImport: false
        }]
    };
    private decorators: (ConnectDecorator | FormDecorator)[] = [];
    private components: BasicComponent[] = [];
    private methods: string[] = [];
    private didMountStep: string[] = [];

    constructor(name: string) {
        super();
        this.name = name;
        this.pageName = lowerFirst(name);
        this.className = upperFirst(name);

        this.model = new Model({
            initialState: {},
            namespace: this.pageName
        });
    }

    public addImport(basicImport: BasciImport) {
        const { source } = basicImport;
        const existedImport = this.imports[source];
        const importModule = {
            name: basicImport.name,
            defaultImport: basicImport.defaultImport
        };
        if (existedImport) {
            existedImport.push(importModule);
        } else {
            this.imports[source] = [importModule];
        }
    }

    public addDecorator(decorator: ConnectDecorator | FormDecorator) {
        this.decorators.push(decorator);
    }

    public addComponent(component: BasicComponent) {
        const imports = component.getImports();
        imports.forEach((importItem) => {
            this.addImport(importItem);
            debug(`currentPage imports: ${JSON.stringify(this.imports)}`);
        });
        this.components.push(component);
    }

    public addComponents(components: ComponentConfig[] = []) {
        components.forEach((component) => {
            debug(`add component: ${JSON.stringify(component)}`);
            addComponent(this, this, component);
        });
    }

    public addMethod(methodCode: string) {
        this.methods.push(methodCode);
    }

    public addDidMountStep(stepCode: string) {
        this.didMountStep.push(stepCode);
    }

    public toCode() {
        const importsCode = getImportsCode(this.imports);
        const componentsCode = getComponentsCode(this.components);
        const decoratorCode = this.decorators.map((item) => item.toCode()).join('\n');
        const methodsCode = this.methods.join('\n');
        const didMountStepCode = this.didMountStep.join('\n');

        return `
${importsCode}

${decoratorCode}
export default class ${this.className} extends React.Component {
    ${methodsCode}
    componentDidMount() {
        ${didMountStepCode}
    }

    render() {
        return (
            <Fragment>
                ${componentsCode}
            </Fragment>
        );
    }
}
`;
    }
}
