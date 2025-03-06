import { useParams } from 'react-router-dom';
import { Empty, Typography } from 'antd';
const ViewUnit = () => {
    const { id } = useParams();

    return (
        <Empty
            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
            description={
                <Typography.Text>
                    Nothing here yet for unit {id}
                </Typography.Text>
            }
        />
    );
};

export default ViewUnit;
