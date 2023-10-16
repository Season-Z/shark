import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

const ProjectList: FC<{ projectList: any[] }> = (props) => {
  const { projectList } = props;

  return (
    <div className="flex justify-start items-center flex-wrap">
      {projectList
        ? projectList.map((v) => (
            <Link to={`/playground?projectId=${v.projectId}&projectName=${v.projectName}`}>
              <Card
                className="w-[300px] mx-[16px] cursor-pointer"
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<EditOutlined key="edit" />]}
              >
                <Card.Meta avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />} title={v.projectName} />
              </Card>
            </Link>
          ))
        : null}
    </div>
  );
};

export default ProjectList;
