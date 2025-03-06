import type React from 'react';
import { Dropdown, Menu } from 'antd';
import type { MenuProps } from 'antd';

type Props = {
    children: React.ReactNode;
    menuItems: MenuProps['items'];
    onContextMenu: (e: React.MouseEvent) => void;
    visible: boolean;
};

const ContextMenu = ({
    children,
    menuItems,
    onContextMenu,
    visible
}: Props) => {
    const menu = (
        <Menu
            items={menuItems}
            className='rounded-md border border-gray-200 shadow-md'
        />
    );

    return (
        <Dropdown overlay={menu} trigger={['contextMenu']} open={visible}>
            <div onContextMenu={onContextMenu}>{children}</div>
        </Dropdown>
    );
};

export default ContextMenu;
