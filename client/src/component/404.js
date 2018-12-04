import React, {Component} from 'react';
import persona404 from '../cssCode/style404.css'

export default class error404 extends Component {
    render(){
        return (
            <div className='div'>
                <center>
                    <h1>404</h1>
                    <h2>FALHOU</h2>
                    <pre>Have patience, come back later.</pre>
                    <footer className='footer'>UTFPR</footer>
                </center>
            </div>
        );
    }
};
