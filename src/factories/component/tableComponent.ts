import { BasicComponent } from './basicComponent';
import Debug from '../../utils/debugger';
import { ActionStructure, Action } from '../action/action';

const debug = Debug(__filename);

interface TableColumn {
    title: string;
    dataIndex: string;
    actions?: ActionStructure[];
}

export class TableComponent extends BasicComponent {

    addProps(key: string, value: any) {
        let finalValue = value;
        if (key === 'columns') {
            const columns = value as TableColumn[];
            finalValue = columns.map((column) => {
                let newColumn: any = column;
                if (column.actions) {
                    const actions = column.actions;
                    newColumn.actions = actions.map((action) => {
                        const actionInstance = new Action(action);
                        return actionInstance.toCode();
                    });
                }
                return newColumn;
            });
        }
        this.props[key] = finalValue;
    }

    toCode() {
        const propsCode = [];
        for (let propKey in this.props) {
            const propValue = this.props[propKey];
            const propValueStr = JSON.stringify(propValue);
            debug(`Component propKey ———— ${propKey}: ${propValueStr}`);
            propsCode.push(
                `${propKey}={${propValueStr}}`
            );
        }
        return `<${this.className} ${propsCode.join(' ')}/>`;
    }
}