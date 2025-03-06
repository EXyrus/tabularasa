import type React from 'react';
import { useState } from 'react';
import { List } from 'antd';
import type { MenuProps } from 'antd';
import ContextMenu from './ContextMenu';

type ListItemProps = {
    item: {
        id: number;
        title: string;
    };
};

const ListItemWithContext: React.FC<ListItemProps> = ({ item }) => {
    const [visible, setVisible] = useState(false);

    const onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setVisible(true);
    };

    // const onMenuClick: MenuProps['onClick'] = (e) => {
    //   message.info(`Clicked on ${e.key} for item: ${item.title}`);
    //   setVisible(false);
    // };

    const menuItems: MenuProps['items'] = [
        {
            key: 'edit',
            label: 'Edit'
        },
        {
            key: 'delete',
            label: 'Delete'
        },
        {
            key: 'properties',
            label: 'Properties'
        }
    ];

    return (
        <ContextMenu
            menuItems={menuItems}
            onContextMenu={onContextMenu}
            visible={visible}
        >
            <List.Item
                className='cursor-context-menu'
                onClick={() => setVisible(false)}
            >
                {item.title}
            </List.Item>
        </ContextMenu>
    );
};

export default ListItemWithContext;
