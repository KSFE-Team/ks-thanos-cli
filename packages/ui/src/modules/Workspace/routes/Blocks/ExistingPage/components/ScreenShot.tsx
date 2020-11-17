import React, { Component } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import './style.scss';

interface TextWithImgProps {
    text: string;
    src: string;
    onClick: () => void;
    className: string;
}

// eslint-disable-next-line react/prefer-stateless-function
export default class ScreenShot extends Component<TextWithImgProps> {
    render() {
        const { text, src, className = '' } = this.props;
        return (
            <div
                className={`${className} temp-item-container temp-item-screenshots-container`}
                onClick={() => {
                    const { onClick } = this.props;
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    onClick && onClick();
                }}
            >
                <div className="temp-item-title">{text}</div>
                <div className="file-info">
                    <div className="file-mask" />
                    <div className="file-action">
                        <EyeOutlined
                            onClick={() => {
                                const img = new Image();
                                img.src = src;
                                img.style.width = '100vw';
                                img.style.margin = '-8px';
                                const newWin = window.open('', '_blank') || window;
                                newWin.document.write(img.outerHTML);
                                newWin.document.title = '预览图';
                                newWin.document.close();
                            }}
                        />
                    </div>
                    <img className="temp-item-screenshots" src={src} />
                </div>
            </div>
        );
    }
}

// export default (props: TextWithImgProps) => {
//     return (
//         <div
//             className={`${className} temp-item-container temp-item-screenshots-container`}
//             onClick={() => {
//                 const { onClick } = props;
//                 if (onClick) {
//                     onClick();
//                 }
//             }}
//         >
//             <div className="temp-item-title">{text}</div>
//             <div className="file-info">
//                 <div className="file-mask" />
//                 <div className="file-action">
//                     <Icon
//                         type="eye"
//                         onClick={() => {
//                             const img = new Image();
//                             img.src = src;
//                             img.style.width = '100vw';
//                             img.style.margin = '-8px';
//                             const newWin = window.open('', '_blank') || window;
//                             newWin.document.write(img.outerHTML);
//                             newWin.document.title = '预览图';
//                             newWin.document.close();
//                         }}
//                     />
//                 </div>
//                 <img className="temp-item-screenshots" src={src} />
//             </div>
//         </div>
//     );
// };
