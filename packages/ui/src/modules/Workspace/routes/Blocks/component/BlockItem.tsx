import React from 'react';
import { Col, Typography, Spin, Button } from 'antd';
import { ButtonProps } from 'antd/es/button';
import moment from 'moment';
import { goto } from 'Src/utils';
import HighlightedText from './HighlightedText';
import ImageLoad from './ImageLoad';
import ImagePreview from './ImagePreview';
import styles from './index.module.scss';

export interface BlockItemProps {
    loading?: boolean;
    item: {
        id: string;
        url: string;
        previewUrl?: string;
        img: string;
        pageName?: string;
        templateName?: string;
        updateTime?: string;
    };
    type: string;
}

interface ToolTipAddButtonProps extends ButtonProps {
    disabledTitle?: string;
}

const ToolTipAddButton: React.FC<ToolTipAddButtonProps> = ({ disabledTitle, disabled, children, ...reset }) => {
    return (
        <Button className={styles.addBtn} type="primary" {...reset}>
            {children}
        </Button>
    );
};

const BlockItem = ({ item, type }: BlockItemProps) => {
    return (
        <Col key={item.url} className={styles.col}>
            <div id={item.url} className={styles.templateCard}>
                <Spin tip="添加中..." spinning={false}>
                    <div className={styles.demo}>
                        <div className={styles.addProject}>
                            <ToolTipAddButton type="primary">添加到项目</ToolTipAddButton>

                            <div className={`${styles.btnGroup} ${item.previewUrl ? styles.hasPreview : ''}`}>
                                <ImagePreview img={item.img} cls={styles.previewBtn} />
                            </div>
                        </div>
                        <ImageLoad src={item.img} />
                    </div>
                </Spin>
                <div className={styles.content}>
                    <div>
                        <div className={styles.title}>
                            <HighlightedText text={item.pageName || item.templateName} />
                        </div>
                        {item.updateTime && (
                            <Typography.Paragraph
                                className={styles.description}
                                ellipsis={{ rows: 2, expandable: false }}
                            >
                                <HighlightedText text={moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')} />
                            </Typography.Paragraph>
                        )}
                    </div>
                    <div style={{ flex: '1', textAlign: 'right', lineHeight: '55px' }}>
                        <Button
                            type="primary"
                            className="ant-btn ant-btn-primary addBtn--hFmha"
                            style={{ marginBottom: '5px' }}
                            onClick={() => {
                                const name = type === 'page' ? item.pageName : item.templateName;
                                goto.push(`/editor/${name}?pageOrTemp=${type}&id=${item.id}`);
                            }}
                        >
                            编辑
                        </Button>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default BlockItem;
