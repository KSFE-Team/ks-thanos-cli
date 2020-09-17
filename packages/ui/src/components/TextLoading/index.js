import React from 'react';
import './index.scss';

export default class Loading extends React.Component {

    loadingText = 'loading';

    getLoadingText = () => {
        const testDtatas = this.loadingText.split('');
        return testDtatas.map((txt, idx) => {
            return <span
                className={'loading-text'}
                key={`${txt}_${idx}`}
                style={{animationDelay: `${idx * 50}ms`}}
            >{txt}</span>;
        });
    }

    render() {
        return (
            <div className="overlay overlay-active">
                {/* <span className="preloader"/> */}
                {this.getLoadingText()}
            </div>
        );
    }
}
