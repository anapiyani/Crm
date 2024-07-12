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
    <li
      className={classes["tree__service"]}
      style={{ listStyle: "none", gap: "1.6rem" }}
    >
      <ContentCutIcon style={{ color: "#388E3C", fontSize: "24px" }} />{" "}
      {service.name}
    </li>
  );
};

interface ICategoryProps {
  category: IServiceCategory;
}

const levelsIcon: Record<string, JSX.Element> = {
  department: (
    <LanOutlinedIcon
      style={{ color: "#0B6BCB", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  section: (
    <FolderIcon
      style={{ color: "#1E88E5", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  service_type: (
    <FolderIcon
      style={{ color: "#1565C0", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  group: (
    <FolderIcon
      style={{ color: "#7B1FA2", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  category: (
    <FolderIcon
      style={{ color: "#EF6C00", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
  subcategory: (
    <FolderIcon
      style={{ color: "#FBC02D", fontSize: "24px", marginRight: "1.6rem" }}
    />
  ),
};

const TreeItem = ({ category }: ICategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={classes["tree"]}>
      <div onClick={toggle} className={classes["tree__branch"]}>
        {levelsIcon[category.level]}
        {category.name}
        {(category.children.length > 0 || category.services.length > 0) && (
          <span style={{ paddingTop: "8px" }}>
            {isOpen ? (
              <ExpandLessIcon style={{ fontSize: "24px" }} />
            ) : (
              <ExpandMoreIcon style={{ fontSize: "24px" }} />
            )}
          </span>
        )}
      </div>
      {isOpen && (
        <div className={classes["tree__open"]}>
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
