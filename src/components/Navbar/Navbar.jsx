import React from 'react';
import Logo from './../../assets/img/logo.png';
import './index.scss';

export default function LogoFirst() {
  return (
    <div>
        <div className="navbar_logo">
            <img src={Logo} alt="Logo" />
        </div>


    </div>
  )
}
