import React, { FC, useState } from "react";
import {
  useCreateServiceBasic,
  useDeleteHierarchy,
  useMoveHierarchy,
} from "@/service/hierarchy/hierarchy.hook";
import { IService, IServiceCategory } from "@/ts/service.interface";
import { IMoveHierarchy } from "@/ts/hierarchy.inteface";
import { useDragAndDrop } from "@/components/treeItem/hooks/useDragAndDrop";
import NiceModal from "@ebay/nice-modal-react";
import { TreeItemProps, TreeViewProps } from "./types";
import { ServiceItem } from "./ServiceItem";
import { TreeItemContent } from "./TreeItemContent";
import { ActionMenu } from "./ActionMenu";
import classes from "./styles.module.scss";
import EditCategoryModal from "@/modals/service-catalog/edit-category.modal.tsx";
import CreateCategoryModal from "@/modals/service-catalog/create-category.modal.tsx";
import AddRoleModal from "@/modals/service-catalog/add-role.modal.tsx";
import { Divider } from "@mui/material";

const TreeItem: FC<TreeItemProps> = ({
  category,
  selectedServiceId,
  selectedCategoryId,
  searchResults,
  onSelectCategory,
  onSelectService,
  onDropItem,
  isOver,
  onHover,
}) => {
  const { isOpen, toggle, isDragging, isOverCurrent, drag, drop } =
    useDragAndDrop({
      id: category.id,
      type: "category",
      onDropItem,
      onHover: (isHovering) => onHover(isHovering, category),
    });

  const isHighlighted = searchResults?.hierarchical_items.some(
    (item) =>
      item.id === category.id &&
      item.level === category.level &&
      item.name === category.name
  );

  return (
    <div
      className={classes.tree}
      ref={drop}
      style={{ backgroundColor: isOver ? "#f0f0f0" : "transparent" }}
    >
      <TreeItemContent
        category={category}
        isOpen={isOpen}
        toggle={toggle}
        isHighlighted={isHighlighted}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={onSelectCategory}
        drag={drag}
        isDragging={isDragging}
        isOverCurrent={isOverCurrent}
      />
      {isOpen && (
        <div className={classes.tree__open}>
          {category.children.map((child) => (
            <TreeItem
              key={child.id}
              category={child}
              selectedServiceId={selectedServiceId}
              selectedCategoryId={selectedCategoryId}
              searchResults={searchResults}
              onSelectCategory={onSelectCategory}
              onSelectService={onSelectService}
              onDropItem={onDropItem}
              isOver={isOver}
              onHover={onHover}
            />
          ))}
          {category.services.length > 0 && (
            <ul>
              {category.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  isSelected={service.id === selectedServiceId}
                  onSelect={onSelectService}
                  isHighlighted={searchResults?.services?.some(
                    (s) => s.id === service.id
                  )}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

const TreeView: FC<TreeViewProps> = ({
  categories,
  onServiceSelect,
  searchResults,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<IServiceCategory | null>(null);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [hoveredCategory, setHoveredCategory] =
    useState<IServiceCategory | null>(null);

  const moveHierarchyItems = useMoveHierarchy();
  const deleteHierarchyItems = useDeleteHierarchy();
  const addService = useCreateServiceBasic();

  const handleSelectService = (service: IService) => {
    setSelectedServiceId(service.id);
    setSelectedCategoryId(null);
    onServiceSelect(service);
  };

  const handleSelectCategory = (category: IServiceCategory) => {
    setSelectedCategoryId(category);
    setSelectedServiceId(null);
  };

  const handleDropItem = (
    itemId: number,
    itemType: string,
    targetId: number
  ) => {
    if (isDropping) {
      console.log("Drop event ignored because another drop is in progress.");
      return;
    }

    setIsDropping(true);
    const typeItem = [
      "section",
      "service_type",
      "group",
      "category",
      "subcategory",
    ].includes(itemType)
      ? "hierarchical_item"
      : "service";

    const temp: IMoveHierarchy = {
      item: itemId,
      type: typeItem,
      to: targetId,
    };

    moveHierarchyItems.mutate(temp, {
      onSuccess: () => setIsDropping(false),
      onError: () => setIsDropping(false),
    });
  };

  const handleHover = (hovered: boolean, category: IServiceCategory) => {
    setHoveredCategory(hovered ? category : null);
  };

  return (
    <div className={classes.windows}>
      <div className={classes.window__header}>
        <p>Выберите услугу</p>
        <ActionMenu
          selectedCategoryId={selectedCategoryId}
          onAddHierarchy={(levelName) => {
            NiceModal.show(CreateCategoryModal, {
              level: levelName,
              parent: selectedCategoryId?.id,
            });
          }}
          onAddService={() =>
            addService.mutate({
              parent: selectedCategoryId!.id,
              name: "New Service",
            })
          }
          onEditCategory={() => {
            NiceModal.show(EditCategoryModal, {
              category: selectedCategoryId ? selectedCategoryId : undefined,
            });
          }}
          onAddRole={() => {
            NiceModal.show(AddRoleModal, {
              categoryId: selectedCategoryId
                ? selectedCategoryId.id
                : undefined,
            });
          }}
          onDeleteCategory={() => {
            deleteHierarchyItems.mutate(selectedCategoryId!.id);
          }}
        />
      </div>
      <Divider />
      <div className={classes.window__content}>
        {categories.map((category) => (
          <TreeItem
            key={category.id}
            category={category}
            selectedServiceId={selectedServiceId}
            selectedCategoryId={selectedCategoryId}
            searchResults={searchResults}
            onSelectCategory={handleSelectCategory}
            onSelectService={handleSelectService}
            onDropItem={handleDropItem}
            isOver={hoveredCategory?.id === category.id}
            onHover={handleHover}
          />
        ))}
      </div>
    </div>
  );
};

export default TreeView;
