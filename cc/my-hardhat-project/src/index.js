import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Buffer } from 'buffer';
import process from 'process';

// Make Buffer available globally
window.Buffer = Buffer;
// Make process available globally
window.process = process;

// Get the root element
const rootElement = document.getElementById('root');

// Create a root
const root = ReactDOM.createRoot(rootElement);

// Render the App
root.render(<App />);
