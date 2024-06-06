import React from 'react';
import FontAwesome from 'react-fontawesome';
import { layoutConfig } from '../../configs';
import { Link } from 'react-router-dom';
import { isEmpty } from '../../Components/Utils/HelperFunctions';

export default function Navbar() {
  return (
    <div className="navbar--content">
      <ul className="main--menu">
        {layoutConfig.menus.map((menu, parentIndex) => (
          isEmpty(menu.childrens)
            ? (
              <li key={parentIndex} className="menu--link">
                <Link to={menu.path}>{menu.label}</Link>
              </li>
            ) : (
              <li className="menu--submenu-list">
                <p className="mb-0 d-flex align-items-center">
                  {menu.label} <FontAwesome name="xbutton" className="fa fa-angle-down ms-1 d-block" />
                </p>
                <ul className="sub-menu">
                  {menu.childrens.map((subMenu, subManuIndex) => (
                    <li key={subManuIndex} className={subMenu.path == window.location.pathname && 'active-manu'}>
                      <Link to={subMenu.path}>{subMenu.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            )
        ))}
      </ul>
    </div>
  );
}
