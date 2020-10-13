import React from 'react';
import { Button } from 'antd';
import { clearData } from '../../utils';

interface Props {
    initState: object,
    that: object,
    type?: string,
}

export default class ClearButton extends React.Component<Props> {

    render() {
        const { that, initState, type } = this.props;
        return (
            <Button type="primary" onClick={() => { clearData(that, initState, type); }}>
                清除配置
            </Button>
        );
    }
}
