import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';

type ListItemProps<T> = {
    item: T;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    renderContent: (item: T) => React.ReactNode;
    renderAmount?: (item: T) => React.ReactNode;
};

const ListItem = <T extends { id: string }>({
    item,
    onEdit,
    onDelete,
    renderContent,
    renderAmount
}: ListItemProps<T>) => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Edit',
            onClick: () => onEdit(item.id)
        },
        {
            key: '2',
            label: 'Delete',
            onClick: () => onDelete(item.id)
        }
    ];

    return (
        <div className='list-item'>
            <div className='mt-5 flex items-center justify-between'>
                <div>{renderContent(item)}</div>
                <div className='flex items-center'>
                    {renderAmount && (
                        <div className='rounded-md bg-lightBlue px-2 py-1 text-12 text-green'>
                            {renderAmount(item)}
                        </div>
                    )}
                    <Dropdown
                        menu={{ items }}
                        trigger={['click']}
                        overlayClassName='dropdown-menu'
                    >
                        <BsThreeDotsVertical size={20} color='black' />
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default ListItem;
