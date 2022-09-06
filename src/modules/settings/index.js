import React from 'react';
import { render } from 'react-dom';
import App from '$Components/settings/App';

const settings = document.createElement('div');
settings.id = 'te-settings';
document.body.appendChild(settings);

render(<App />, settings);