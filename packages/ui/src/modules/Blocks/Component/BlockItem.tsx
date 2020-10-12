import React, { Component } from 'react';
import { Col, Typography, Spin, Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import moment from 'moment';
import styles from './index.module.scss';
import HighlightedText from './HighlightedText';
import ImageLoad from './ImageLoad';
import ImagePreview from './ImagePreview';


export interface BlockItemProps {
    loading?: boolean;
    item: Object;
}

interface ToolTipAddButtonProps extends ButtonProps {
    disabledTitle?: string;
}

const ToolTipAddButton: React.FC<ToolTipAddButtonProps> = ({
    disabledTitle,
    disabled,
    children,
    ...reset
}) => {
    return (
        <Button className={styles.addBtn} type="primary" {...reset}>
            {children}
        </Button>
    );
};

class BlockItem extends Component {
    render() {
        const { item } = this.props;
        return (
            <Col key={item.url} className={styles.col}>
                <div
                    id={item.url}
                    className={styles.templateCard}
                >
                    <Spin tip="添加中..." spinning={false}>
                        <div className={styles.demo}>
                            <div className={styles.addProject}>
                                <ToolTipAddButton
                                    type="primary"
                                >
                                    添加到项目
                                </ToolTipAddButton>

                                <div className={`${styles.btnGroup} ${item.previewUrl ? styles.hasPreview : ''}`}>
                                    <ImagePreview img={item.img} cls={styles.previewBtn} />
                                </div>
                            </div>
                            <ImageLoad src={item.img} />
                        </div>
                    </Spin>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <HighlightedText text={item.pageName} />
                        </div>
                        {item.createTime && (
                            <Typography.Paragraph
                                className={styles.description}
                                ellipsis={{ rows: 2, expandable: false }}
                            >
                                <HighlightedText text={moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')} />
                            </Typography.Paragraph>
                        )}
                        <div className={styles.meats}>
                            <span className={styles.tags}>
                                <span className={styles.tagInCard}>
                                    <HighlightedText text={moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')} />
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </Col>
        )
    }

}
export default BlockItem;
