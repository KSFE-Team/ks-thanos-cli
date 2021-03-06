import React from 'react';
import { actions } from 'kredux';
import { Col, Typography, Spin, Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ButtonProps } from 'antd/es/button';
import moment from 'moment';
import { goto } from 'Src/utils';
import HighlightedText from './HighlightedText';
import ImageLoad from './ImageLoad';
import ImagePreview from './ImagePreview';
import styles from './index.module.scss';

export interface BlockItemData {
    id: string;
    url: string;
    previewUrl?: string;
    img: string;
    pageName?: string;
    templateName?: string;
    updateTime?: string;
}
export interface BlockItemProps {
    loading?: boolean;
    item: BlockItemData;
    type: string;
    style?: any;
    editorAble?: boolean;
    deleteAble?: boolean;
    addProjectAble?: boolean;
    onClick?(data: BlockItemData): void;
    onAddProject?(): void;
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

const BlockItem = ({
    item,
    type,
    onClick,
    style = {},
    editorAble = true,
    deleteAble = true,
    addProjectAble = true,
    onAddProject,
}: BlockItemProps) => {
    const handleDelete = (record: any) => {
        const name = type === 'page' ? `页面${record.pageName}` : `模版${record.templateName}`;
        Modal.confirm({
            title: `确认删除${name}？`,
            onOk: () => {
                if (type === 'page') {
                    actions.existingPage.deletePageItem({
                        pageName: record.pageName,
                    });
                }
                if (type === 'template') {
                    actions.myTemplate.deleteTemplateItem({
                        templateName: record.templateName,
                    });
                }
            },
        });
    };
    return (
        <Col
            onClick={() => {
                if (onClick) {
                    onClick(item);
                }
            }}
            key={item.url}
            className={styles.col}
            style={{ ...style }}
        >
            <div id={item.url} className={styles.templateCard}>
                <Spin tip="添加中..." spinning={false}>
                    <div className={styles.demo}>
                        <div className={styles.addProject}>
                            {addProjectAble && (
                                <ToolTipAddButton
                                    type="primary"
                                    onClick={() => {
                                        if (onAddProject) {
                                            onAddProject();
                                        }
                                        actions.workspace.setReducers({
                                            thanosModalVisible: true,
                                            initPageName: item.pageName,
                                        });
                                    }}
                                >
                                    添加到项目
                                </ToolTipAddButton>
                            )}

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
                    <div style={{ textAlign: 'right', flex: '1', lineHeight: '50px' }}>
                        {editorAble && (
                            <Button
                                icon={<EditOutlined />}
                                // className="ant-btn ant-btn-primary addBtn--hFmha"
                                style={{ marginRight: '5px', borderColor: '#30303d', width: '40px' }}
                                onClick={() => {
                                    const name = type === 'page' ? item.pageName : item.templateName;
                                    goto.push(`/editor/${name}?pageOrTemp=${type}&id=${item.id}`);
                                }}
                            />
                        )}
                        {deleteAble && (
                            <Button
                                style={{ borderColor: '#30303d', width: '40px' }}
                                icon={<DeleteOutlined />}
                                onClick={() => {
                                    handleDelete(item);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default BlockItem;
