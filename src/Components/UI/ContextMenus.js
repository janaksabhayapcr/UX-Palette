import React, { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

const Popup = ({ x, y, children, isOpnePopup }) => {
    return (
        <div
            className="side---popup"
            style={{
                display: isOpnePopup ? 'block' : 'none',
                position: 'absolute',
                left: x + 'px',
                top: y + 'px',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '4px',
            }}
        >
            {children}
        </div>
    );
};

const DropdownHtml = ({ children, dropdowns, element, key }) => {
    const loadDynamicDropdown = (subMenus) => {
        return (
            <>
                {subMenus.map((dropdown, subMenuIndex) => (
                    <>
                        {dropdown.children ? (
                            <>
                                <div className="submenu" key={subMenuIndex}>
                                    <a href="#" className={loadDynamicDropdown(dropdown.children) ? 'd-flex align-items-center justify-content-between' : 'd-block'}>
                                        {dropdown.label} {loadDynamicDropdown(dropdown.children) && <FontAwesome className="fa-solid fa-angle-right" />}
                                    </a>
                                    <div className="submenu-content">{loadDynamicDropdown(dropdown.children)}</div>
                                </div>
                            </>
                        ) : (
                            <>
                                <a
                                    key={subMenuIndex}
                                    href="#"
                                    onClick={() => {
                                        dropdown.onClick(element);
                                    }}
                                >
                                    {dropdown.label}
                                </a>
                            </>
                        )}
                    </>
                ))}
            </>
        );
    };

    return (
        <>
            <div className="dropdown" key={key}>
                <>{children}</>
                <div className="dropdown-content" style={{ left: "100%" }}>{loadDynamicDropdown(dropdowns)}</div>
            </div>
        </>
    );
};

export const useContextMenu = ({ parentElementSelector = null, callback = () => { } }) => {
    const [contextPopupPosition, setContextPopupPosition] = useState({ x: 0, y: 0 });
    const [isOpenContextPopup, setIsOpenContextPopup] = useState(false);

    const handleContextMenu = (e, sel) => {
        e.preventDefault();
        e.stopPropagation();

        let elementRect = e.currentTarget.getBoundingClientRect();
        const popupElement = document.querySelector('.side---popup');
        let top = elementRect.top;
        let left = elementRect.left;

        if (parentElementSelector) {
            const parentElement = document.querySelector(parentElementSelector);
            let parentRect = parentElement.getBoundingClientRect();
            top = elementRect.top - parentRect.top;
            left = e.clientX - e.currentTarget.getBoundingClientRect().left;
        }

        popupElement.style.display = 'block';
        let popupElementOffset = popupElement.getBoundingClientRect();
        setContextPopupPosition({ x: left + 15 + (popupElementOffset.width / 2), y: top })
        setIsOpenContextPopup(true)

        callback(sel);
    };

    useEffect(() => {
        const popupElement = document.querySelector('.side---popup');

        if (popupElement) {
            document.addEventListener('click', function (event) {
                if (!popupElement.contains(event.target)) {
                    if (isOpenContextPopup) {
                        setIsOpenContextPopup(false);
                    }
                }
            });
        }
    }, [isOpenContextPopup]);

    return {
        handleContextMenu,
        contextPopupPosition,
        isOpenContextPopup,
        setIsOpenContextPopup
    }
}

export default function ContextMenus({ menus, isOpnePopup = false, setIsOpenContextPopup, popupPosition }) {
    return (
        <>
            <Popup x={popupPosition.x} y={popupPosition.y} isOpnePopup={isOpnePopup}>
                <ListGroup as="ul">
                    {menus.map((menu, i) => (
                        <>
                            {menu.hasOwnProperty("children") ?
                                <DropdownHtml element={menu} dropdowns={menu.children} key={i}>
                                    <ListGroup.Item
                                        as="li"
                                        key={i}
                                        onClick={() => {
                                            setIsOpenContextPopup(false)
                                            menu.onClick()
                                        }}
                                    >
                                        {menu.label}
                                    </ListGroup.Item>
                                </DropdownHtml>
                                : (
                                    <ListGroup.Item
                                        as="li"
                                        key={i}
                                        onClick={() => {
                                            setIsOpenContextPopup(false)
                                            menu.onClick()
                                        }}
                                    >
                                        {menu.label}
                                    </ListGroup.Item>
                                )}
                        </>
                    ))}
                </ListGroup>
            </Popup>
        </>
    )
}
