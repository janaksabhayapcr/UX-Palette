import React from 'react';
import FontAwesome from 'react-fontawesome';
import ThemeButton from '../UI/Button';
import TextInput from '../UI/TextInput';
import { useNavigate, Link } from 'react-router-dom'
import pageRoutes from '../../configs/routes';

export default function SearchInput(props) {
  const {
    placeholder = "Search this site..."
  } = props

  return (
    <div className="d-flex align-items-center justify-content-end search--component ms-auto">
      <TextInput type="text" placeholder={placeholder} />
      {/* <ThemeButton size="sm" variant="transparent" onClick={() => console.log("first")}>
        <FontAwesome name="xbutton" className="fa-search" />
      </ThemeButton> */}
      <Link to={pageRoutes.site_search} className="search-input-icon">
        <FontAwesome name="xbutton" className="fa-search" />
      </Link>
    </div>
  );
}
