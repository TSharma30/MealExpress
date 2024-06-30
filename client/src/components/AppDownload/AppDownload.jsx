import React from 'react';
import { assets } from '../../assets/assets';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
        <p>For Better Experience Download Tomato App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="Google Play Store" />
            <img src={assets.app_store} alt="Apple App Store" />
        </div>
    </div>
  )
}

export default AppDownload;
