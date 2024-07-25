import React, { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LanOutlinedIcon from "@mui/icons-material/LanOutlined";
import FolderIcon from "@mui/icons-material/Folder";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import { IServiceCategory, IService } from "@/ts/service.interface";
import classes from "./styles.module.scss";

interface IServiceProps {
  service: IService;
  isSelected: boolean;
  onSelect: (service: IService) => void;
}

const ServiceItem: React.FC<IServiceProps> = ({
  service,
  isSelected,
  onSelect,
}) => {
  return (
    <li
      className={`${classes["tree__service"]} ${
        isSelected ? classes["selected"] : ""
      }`}
      style={{ listStyle: "none", gap: "1.6rem" }}
      onClick={() => onSelect(service)}
    >
      <ContentCutIcon style={{ color: "#388E3C", fontSize: "24px" }} />{" "}
      {service.name}
    </li>
  );
};

interface ICategoryProps {
  category: IServiceCategory;
  selectedServiceId: number | null;
  onSelectService: (service: IService, parent: string[]) => void;
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

const TreeItem: React.FC<ICategoryProps> = ({
  category,
  selectedServiceId,
  onSelectService,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [parent, setParent] = useState<string[]>([]);
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
            <TreeItem
              key={child.id}
              category={child}
              selectedServiceId={selectedServiceId}
              onSelectService={onSelectService}
            />
          ))}
          {category.services.length > 0 && (
            <ul>
              {category.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  isSelected={service.id === selectedServiceId}
                  onSelect={(service) => {
                    onSelectService(service, parent);
                  }}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

interface TreeViewProps {
  categories: IServiceCategory[];
  onServiceSelect: (service: IService, parent: string[]) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ categories, onServiceSelect }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );

  const handleSelectService = (service: IService, parent: string[]) => {
    setSelectedServiceId(service.id);
    onServiceSelect(service, parent);
  };

  return (
    <div>
      {categories.map((category) => (
        <TreeItem
          key={category.id}
          category={category}
          selectedServiceId={selectedServiceId}
          onSelectService={handleSelectService}
        />
      ))}
    </div>
  );
};

export default TreeView;
