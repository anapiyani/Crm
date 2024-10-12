import { IKassaOperations, KassaOperationsItem } from "@/ts/kassa.interface.ts";

const useProcessedOperationsData = (
  operations?: IKassaOperations
): { label: string; value: string; isParent: boolean }[] => {
  const result: { label: string; value: string; isParent: boolean }[] = [];
  if (operations) {
    const traverse = (nodes: KassaOperationsItem[]) => {
      if (nodes) {
        nodes.forEach((node) => {
          if (node.children && node.children.length > 0) {
            result.push({
              label: node.name,
              value: node.id.toString(),
              isParent: true,
            });
            traverse(node.children);
          } else {
            result.push({
              label: node.name,
              value: node.id.toString(),
              isParent: false,
            });
          }
        });
      }
    };
    traverse(operations.results);
    return result;
  } else {
    return [];
  }
};

export default useProcessedOperationsData;
