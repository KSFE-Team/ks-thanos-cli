import React, { Component } from 'react';
import { Icon } from 'antd';
import './style.scss';

interface TextWithImgProps {
    text: string,
    src: string,
    onClick: () => void;
    className: string;
}

export default class ScreenShot extends Component<TextWithImgProps> {

    render() {
        const { text, src, className = '' } = this.props;
        return (
            <div
                className={`${className} temp-item-container temp-item-screenshots-container`}
                onClick={() => {
                    const { onClick } = this.props;
                    onClick && onClick();
                }}
            >
                <div className='temp-item-title'>{text}</div>
                <div className='file-info'>
                    <div className='file-mask'></div>
                    <div className='file-action'>
                        <Icon type='eye' onClick={() => {
                            const img = new Image();
                            img.src = src;
                            img.style.width = '100vw';
                            img.style.margin = '-8px';
                            const newWin = window.open('', '_blank') || window;
                            newWin.document.write(img.outerHTML);
                            newWin.document.title = '预览图';
                            newWin.document.close();
                        }}/>
                    </div>
                    <img
                        className='temp-item-screenshots'
                        src={src}
                    />
                </div>
            </div>
        );
    }
}
