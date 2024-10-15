import { IService, IServiceCategory } from "@/ts/service.interface";
import { ISearchResult, ISearchResultStorage } from "@/ts/hierarchy.inteface";

export type ServiceItemProps = {
  service: IService;
  isSelected: boolean;
  onSelect: (service: IService) => void;
  isHighlighted: boolean | undefined;
};

export type TreeItemProps = {
  category: IServiceCategory;
  selectedServiceId: number | null;
  selectedCategoryId: IServiceCategory | null;
  searchResults?: ISearchResult | ISearchResultStorage;
  onSelectCategory: (category: IServiceCategory) => void;
  onSelectService: (service: IService) => void;
  onDropItem: (itemId: number, itemType: string, targetId: number) => void;
  isOver: boolean;
  onHover: (hovered: boolean, category: IServiceCategory) => void;
};

export type TreeItemContentProps = {
  category: IServiceCategory;
  isOpen: boolean;
  toggle: () => void;
  isHighlighted: boolean;
  selectedCategoryId: IServiceCategory | null;
  onSelectCategory: (category: IServiceCategory) => void;
  drag: (element: HTMLElement | null) => void;
  isDragging: boolean;
  isOverCurrent: boolean;
};

export type TreeViewProps = {
  categories: IServiceCategory[];
  searchResults?: ISearchResult | ISearchResultStorage;
  onServiceSelect: (service: IService) => void;
};

export type ActionMenuProps = {
  selectedCategoryId: IServiceCategory | null;
  onAddHierarchy: (levelName: string) => void;
  onAddService: () => void;
  onEditCategory: () => void;
  onAddRole: () => void;
  onDeleteCategory: () => void;
};
