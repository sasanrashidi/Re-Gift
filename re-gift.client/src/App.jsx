import React from 'react';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import './App.css';  // Eventuell styling

const App = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="content-container">
                <Home />
            </div>
        </div>
    );
};

export default App;