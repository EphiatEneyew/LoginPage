import React from 'react';
 
import ReactDOM from 'react-dom/client';
import {  AuthoContextProvider} from  './store/auth-context'

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthoContextProvider><App /></AuthoContextProvider >);
