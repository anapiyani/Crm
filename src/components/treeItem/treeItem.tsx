import React, { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanOutlinedIcon from "@mui/icons-material/LanOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { IServiceCategory, IService } from "@/ts/types";
import classes from "./styles.module.scss";

interface IServiceProps {
  service: IService;
}

const ServiceItem: React.FC<IServiceProps> = ({ service }) => {
  return (
    <li style={{ listStyle: "none" }}>
      <ContentCutIcon /> {service.name}
    </li>
  );
};

interface ICategoryProps {
  category: IServiceCategory;
}

const levelsIcon: Record<string, JSX.Element> = {
  department: <LanOutlinedIcon style={{ color: "#0B6BCB" }} />,
  section: <FolderIcon style={{ color: "#1E88E5" }} />,
  service_type: <FolderIcon style={{ color: "#1565C0" }} />,
  group: <FolderIcon style={{ color: "#7B1FA2" }} />,
  category: <FolderIcon style={{ color: "#EF6C00" }} />,
  subcategory: <FolderIcon style={{ color: "#FBC02D" }} />,
  services: <ContentCutIcon style={{ color: "#388E3C" }} />,
};

const TreeItem = ({ category }: ICategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div onClick={toggle} style={{ cursor: "pointer" }}>
        {levelsIcon[category.level]}
        {category.name}
        {(category.children.length > 0 || category.services.length > 0) && (
          <span>{isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
        )}
      </div>
      {isOpen && (
        <div style={{ paddingLeft: "20px" }}>
          {category.children.map((child) => (
            <TreeItem key={child.id} category={child} />
          ))}
          {category.services.length > 0 && (
            <ul>
              {category.services.map((service) => (
                <ServiceItem key={service.id} service={service} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default TreeItem;
