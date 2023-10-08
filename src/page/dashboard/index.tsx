import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Divider } from "antd";
import { useNavigate } from "react-router-dom";
import CreateModal from "./components/create-modal";
import { useState } from "react";

const Dashboard = () => {
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="h-full max-w-5xl m-auto">
      <header className="py-[36px] flex justify-between items-center">
        <div className="text-[24px] font-medium">我的应用</div>
        <Button type="primary" className="bg-[#1677ff]" onClick={handleShowModal}>
          创建应用
        </Button>
      </header>
      <Divider />

      <main className="pt-[36px]">
        <Card
          style={{ width: 300 }}
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
        >
          <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title="Card title" description="This is the description" />
        </Card>
      </main>
      {showModal && <CreateModal visible={showModal} close={closeModal} />}
    </div>
  );
};

export default Dashboard;
