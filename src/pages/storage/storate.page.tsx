import TreeViewStorage from "@/components/treeItem/treeItemStorage/treeItemStorage";
import { getHierarchyStorage } from "@/service/hierarchy/hierarchy.service";
import { IMaterial } from "@/ts/storage.interface";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const StoragePage: React.FC = () => {
  const [material, setMaterial] = useState<IMaterial | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data, isPending, isError } = useQuery({
    queryKey: ["storageHierarchyData"],
    queryFn: () => getHierarchyStorage(),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const handialMaterialSelect = (material: IMaterial) => {
    setMaterial(material);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  };
  return (
    <div>
      <h1>Storage Page</h1>
      <DndProvider backend={HTML5Backend}>
        <TreeViewStorage
          categories={data || []}
          onMaterialSelect={handialMaterialSelect}
        />
      </DndProvider>
    </div>
  );
};

export default StoragePage;
