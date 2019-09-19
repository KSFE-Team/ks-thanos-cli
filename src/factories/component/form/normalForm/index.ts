import { getPropValue } from 'Src/utils/getPropValue';
import { FormItem } from 'Src/factories/component/formItem';
import { FormDelegate } from '../formDelegate/index';

export class NormalFormDelegate extends FormDelegate {
    getImports() {
        let imports = [
            {
                source: 'Src/utils/constants',
                name: 'FORM_LAYOUT',
                defaultImport: false
            },
            {
                source: 'antd',
                name: 'Row',
                defaultImport: false
            },
            {
                source: 'antd',
                name: 'Col',
                defaultImport: false
            },
            {
                source: 'antd',
                name: 'Icon',
                defaultImport: false
            }
        ];
        return imports;
    }

    initPageMethods() {
        const form = this.form;
        form.page.addMethod(`
            handleSubmit() {
                this.props.form.validateFieldsAndScroll({ force: true }, (err, fieldsValue) => {
                    if (err) {
                        return;
                    }
                    const { ${form.stateName} } = this.props.${form.page.pageName};
                    const postData = {
                        ...${form.stateName},
                        ...fieldsValue
                    };
                    const id = this.props.match.params.id;
                    if (id >= 0) {
                        actions.${form.page.pageName}.update${form.upperStateName}(postData);
                    } else {
                        actions.${form.page.pageName}.create${form.upperStateName}(postData);
                    }
                });
            }
        `);
    }

    initPageTitle() {
        const form = this.form;
        form.page.addPageTitleCode(`
            <div>
                <Row>
                    <Col span={8} style={{ lineHeight: '32px' }}>
                        ${form.page.pageChineseName}
                    </Col>
                    <Col span={16} style={{ textAlign: 'right' }}>
                        <Button
                            type='primary'
                            className='mar-l-4'
                            onClick={this.handleSubmit}
                        ><Icon type="form" />保存</Button>
                        <Button
                            className='mar-l-4'
                            onClick={() => {
                            }}><Icon type="rollback" />返回</Button>
                    </Col>
                </Row>
            </div>
        `);
    }

    toFormItemCode(item: FormItem) {
        const labelValue = getPropValue(item.config.label);
        return `<Form.Item
                label={${labelValue}}
                { ...FORM_LAYOUT }
            >
            {
                this.props.form.getFieldDecorator('${item.config.key}', ${item.getDecoratorConfigCode()})(
                    ${item.toCode()}
                )
            }
        </Form.Item>`;
    }

    toCode() {
        const form = this.form;
        const componentsCode = form.components.map(this.toFormItemCode);
        return `<Form>
        ${componentsCode.join('\n')}
    </Form>`;
    }
}
