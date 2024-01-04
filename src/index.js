import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import styles
import './index.css';
import 'react-notifications/lib/notifications.css';

// Import NotificationContainer component for notifications
import {NotificationContainer} from 'react-notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App/>
    <NotificationContainer/>
  </>
);

