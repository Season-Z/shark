import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Divider, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import CreateModal from "./components/create-modal";
import { useState } from "react";
import { useFetch } from "@/service/request";
import * as api from "@/service/api";
import ProjectList from "./components/project-list";

const Dashboard = () => {
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { loading, data } = useFetch({
    url: api.project,
    method: "get",
  });

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

      <main className="pt-[36px]">{loading ? <Spin spinning /> : <ProjectList projectList={data} />}</main>
      {showModal && <CreateModal visible={showModal} close={closeModal} />}
    </div>
  );
};

export default Dashboard;
