import React, { useState, useEffect } from 'react';
import './styles.css'; // You can create a separate CSS file for the styles

interface MenuItem {
  color: string;
  icon: string;
  click: () => void;
}

interface MenuItemWithPosition extends MenuItem {
  rotation: number;
  angle: number;
  show: boolean;
}

interface MenuProps {
  size: number;
  items: MenuItemWithPosition[];
  open: boolean;
}

const Menu: React.FC<MenuProps> = ({ size, items, open }) => (
  <div className={open ? 'menu-wrapper-open' : 'menu-wrapper-closed'}>
    <div className="menu-background">
      <MenuItems size={size} items={items} open={open} />
    </div>
  </div>
);

interface MenuItemsProps {
  size: number;
  items: MenuItemWithPosition[];
  open: boolean;
}

const MenuItems: React.FC<MenuItemsProps> = ({ size, items, open }) => (
  <div className={open ? 'button-bg animate-menu' : 'button-bg'}>
    {items.map((item) => (
      <div
        key={item.icon}
        className={item.show ? 'menu-item item-show' : 'menu-item item-hide'}
        style={{
          transform: `rotate(${item.rotation}deg) translate(${size / 2}em) rotate(${-item.rotation}deg)`,
          backgroundColor: item.color,
        }}
        onClick={item.click}
      >
        <i className={`fa ${item.icon}`} aria-hidden="true" />
      </div>
    ))}
  </div>
);

interface MenuToggleProps {
  toggle: () => void;
  open: boolean;
  animateButtons: () => void;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, open, animateButtons }) => (
  <button
    className={open ? 'menu-toggle toggle-open' : 'menu-toggle toggle-closed'}
    onClick={() => {
      toggle();
      setTimeout(animateButtons, 120);
    }}
  >
    <i className={open ? 'fa fa-times' : 'fa fa-bars'} aria-hidden="true" />
  </button>
);

interface MenuWrapperState {
  menuOpen: boolean;
  menuItems: MenuItemWithPosition[];
}

const MenuWrapper: React.FC = () => {
  const [state, setState] = useState<MenuWrapperState>({
    menuOpen: false,
    menuItems: [],
  });

  const itemClick = () => {
    console.log('clicked');
  };

  const menuData: MenuItem[] = [
    { color: '#b3462f', icon: 'fa-paper-plane', click: itemClick },
    { color: '#e78b38', icon: 'fa-pencil', click: itemClick },
    { color: '#353535', icon: 'fa-trash', click: itemClick },
    { color: '#303c54', icon: 'fa-tags', click: itemClick },
    { color: '#3a384e', icon: 'fa-search', click: itemClick },
    { color: '#78332c', icon: 'fa-users', click: itemClick },
    { color: '#78332c', icon: 'fa-users', click: itemClick },
  ];

  useEffect(() => {
    makeMenu(menuData);
  }, []);

  const makeMenu = (menuConfig: MenuItem[]) => {
    const angle = 360 / menuConfig.length;
    let rotation = 0;
    let menuItems: MenuItemWithPosition[] = [];
    menuConfig.forEach(({ color, icon, click }) => {
      menuItems.push({
        color,
        icon,
        click,
        rotation,
        angle,
        show: false,
      });
      rotation += angle;
    });
    setState({ ...state, menuItems });
  };

  const toggleMenu = () => {
    setState({ ...state, menuOpen: !state.menuOpen });
  };

  const animateButtons = () => {
    const length = state.menuItems.length;
    const stagger = (i: number) => {
      if (i < length) {
        setTimeout(() => {
          const items = state.menuItems;
          const showing = state.menuItems[i].show;
          setState({
            ...state,
            menuItems: [
              ...items.slice(0, i),
              { ...items[i], show: !showing },
              ...items.slice(i + 1),
            ],
          });
          stagger(i + 1);
        }, 60);
      }
    };
    stagger(0);
  };

  return (
    <div>
      <MenuToggle toggle={toggleMenu} open={state.menuOpen} animateButtons={animateButtons} />
      <Menu size={18} items={state.menuItems} open={state.menuOpen} />
    </div>
  );
};

export default MenuWrapper;
