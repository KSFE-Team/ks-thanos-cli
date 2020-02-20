import React from 'react';
import './index.scss';

export default class Loading extends React.Component {
    render() {
        return (
            <div className="overlay overlay-active">
                <span className="preloader"/>
            </div>
        );
    }
}
