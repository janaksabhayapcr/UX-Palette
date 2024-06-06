import React, { useMemo } from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function MenuList({ options, children }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {children[0]({ openMenu: handleClick })}
            <Menu
                disableAutoFocusItem={true}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {children[1]}
            </Menu>
        </>
    )
}
