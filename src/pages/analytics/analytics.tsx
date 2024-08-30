import SearchFilterCard from "@/components/search-filter-card/search-filter-card";
import classes from "./styles.module.scss";
import BreadcrumbsCustom from "@/components/navigation/breadcrumbs/breadcrumbs";
import { useCallback, useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import { Backdrop } from "@mui/material";

const AnalyticsPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const images = [
    "https://base.object.pscloud.io/average_transaction.png",
    "https://base.object.pscloud.io/discount_detailed_analysis.png",
    "https://base.object.pscloud.io/revenue_structure.png",
    "https://base.object.pscloud.io/top_services_revenue.png",
    "https://base.object.pscloud.io/total_before_after_discounts.png",
    "https://base.object.pscloud.io/visits_by_day.png",
    "https://base.object.pscloud.io/visits_by_hour.png",
    "https://base.object.pscloud.io/visits_by_month.png",
  ];

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };
  return (
    <div className={classes["main"]}>
      <BreadcrumbsCustom />
      <div className={classes["main__header"]}>
        <h1>Аналитика</h1>
      </div>
      <div className={classes["main__content"]}>
        <SearchFilterCard
          title={"Прибыль"}
          children={
            <div className={classes["main__content__grid"]}>
              <img src={images[0]} onClick={() => openImageViewer(0)} />
              <img src={images[2]} onClick={() => openImageViewer(2)} />
              <img src={images[3]} onClick={() => openImageViewer(3)} />
            </div>
          }
        />
        <SearchFilterCard
          title={"Скидки"}
          children={
            <div className={classes["main__content__grid"]}>
              <img
                style={{ width: "67%" }}
                src={images[1]}
                onClick={() => openImageViewer(1)}
              />
              <img src={images[4]} onClick={() => openImageViewer(4)} />
            </div>
          }
        />
        <SearchFilterCard
          title={"Посещения"}
          children={
            <div className={classes["main__content__grid"]}>
              <img src={images[6]} />
              <img src={images[7]} />
              <img src={images[5]} />
            </div>
          }
        />
      </div>
      {isViewerOpen && (
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isViewerOpen}
          onClick={closeImageViewer}
          onExited={closeImageViewer}
        >
          <ImageViewer
            src={images}
            backgroundStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            }}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          />
        </Backdrop>
      )}
    </div>
  );
};
export default AnalyticsPage;
