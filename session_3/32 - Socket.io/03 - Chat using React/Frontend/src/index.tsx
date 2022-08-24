import React from 'react';
import ReactDOM from 'react-dom';
import Chat from "./Components/Chat/Chat";
import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <Chat />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
