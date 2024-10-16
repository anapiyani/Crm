import { useCallback } from "react";
import {
  IServicePriceCurrent,
  IServicePriceTree,
} from "@/ts/service.interface.ts";

export const useTraverseServicePrice = () => {
  const traverse = useCallback(
    (
      data: IServicePriceTree[]
    ): { items: IServicePriceCurrent[]; hasParameters: boolean } => {
      const result: IServicePriceCurrent[] = [];
      let foundParameters = false;

      data.forEach((item) => {
        const tableItem: IServicePriceCurrent = {
          title: item.name,
          isService: false,
          isDepartment: item.level === "department",
          children: [],
          type: item.level as
            | "department"
            | "section"
            | "category"
            | "subcategory"
            | "service",
        };

        if (item.children && item.children.length > 0) {
          const { items, hasParameters: childHasParameters } = traverse(
            item.children
          );
          tableItem.children = items;
          if (childHasParameters) {
            foundParameters = true;
          }
        }

        if (item.services && item.services.length > 0) {
          item.services.forEach((service) => {
            let serviceItem: IServicePriceCurrent = {
              title: service.service.name,
              isService: true,
              isDepartment: false,
              cost: service.min_price
                ? service.min_price
                : service.service.price_details[0]?.price,
              children: [],
              type: "service",
            };

            serviceItem.costFrom = service.min_price;
            serviceItem.costTo = service.min_price;

            service.service.price_details.forEach((priceDetail) => {
              switch (priceDetail.parameter_name) {
                case "Короткие от 10 см":
                  serviceItem.shortHair = priceDetail.price;
                  break;
                case "Средние 15-20 см":
                  serviceItem.mediumHair = priceDetail.price;
                  break;
                case "Длинные 30-40 см":
                  serviceItem.longHair = priceDetail.price;
                  break;
                case "Очень длинные 50-60 см":
                  serviceItem.veryLongHair = priceDetail.price;
                  break;
                default:
                  break;
              }
            });

            if (
              serviceItem.shortHair !== undefined ||
              serviceItem.mediumHair !== undefined ||
              serviceItem.longHair !== undefined ||
              serviceItem.veryLongHair !== undefined
            ) {
              foundParameters = true;
            }

            serviceItem.costFrom = Math.min(
              serviceItem.shortHair ?? 0,
              serviceItem.mediumHair ?? 0,
              serviceItem.longHair ?? 0,
              serviceItem.veryLongHair ?? 0
            );

            serviceItem.costTo = Math.max(
              serviceItem.shortHair ?? 0,
              serviceItem.mediumHair ?? 0,
              serviceItem.longHair ?? 0,
              serviceItem.veryLongHair ?? 0
            );

            tableItem.children.push(serviceItem);
          });
        }

        result.push(tableItem);
      });

      return { items: result, hasParameters: foundParameters };
    },
    []
  );

  return { traverse };
};
