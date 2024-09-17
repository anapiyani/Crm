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
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Factive_idle_hours.png?alt=media&token=35e32d8e-91b9-430a-b5be-802aa72e3d33",
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Femployee_analysis_revenue.png?alt=media&token=dde0fc2a-f63d-4e16-872a-2b8a19aec57b",
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Fcorr_matrix.png?alt=media&token=d9dbea75-705f-427a-9032-2209e33bca65",
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Fsalary_distribution.png?alt=media&token=7acef011-cc3e-4b56-8972-1053f8d60d1f",
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Favg_bill_visits_count.png?alt=media&token=f951e363-f15a-4ac2-a039-23077e3451d6",
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Favg_bill.png?alt=media&token=540ea595-dbed-47f8-b171-c22bef1517e0",
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Favg_bill_kde.png?alt=media&token=c5bd5840-c6fb-4eeb-ae11-0fad29e92d98",
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Fclient_types.png?alt=media&token=ea284736-55b1-4b03-83d1-c4da72145585",
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Fclients_total.png?alt=media&token=5e63193e-d010-49df-b129-f0ea6c608ea4",

    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Fmaster_rating.png?alt=media&token=fe279d5e-fd36-4494-8893-d2c1d5303576",
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Fmonths_total_before_discounts.png?alt=media&token=2b0c577f-2db1-45e5-9838-62055b269262",
    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Fpairplot.png?alt=media&token=c47eb0bc-8857-4c80-a9c1-ce96bac8f23e",

    "https://firebasestorage.googleapis.com/v0/b/wonkai-addb2.appspot.com/o/superwise%2Ftotal_before_discounts.png?alt=media&token=a5f62f86-93f9-4280-9ef1-e684a96249f7",
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
              <img src={images[20]} onClick={() => openImageViewer(20)} />
            </div>
          }
        />
        <SearchFilterCard
          title={"Посещения"}
          children={
            <div className={classes["main__content__grid"]}>
              <img src={images[6]} onClick={() => openImageViewer(6)} />
              <img src={images[7]} onClick={() => openImageViewer(7)} />
              <img src={images[5]} onClick={() => openImageViewer(5)} />
              <img src={images[12]} onClick={() => openImageViewer(12)} />
              <img src={images[13]} onClick={() => openImageViewer(13)} />
              <img src={images[14]} onClick={() => openImageViewer(14)} />
            </div>
          }
        />
        <SearchFilterCard
          title={"Сотрудники"}
          children={
            <div className={classes["main__content__grid"]}>
              <img src={images[8]} onClick={() => openImageViewer(8)} />
              <img src={images[9]} onClick={() => openImageViewer(9)} />
              <img src={images[10]} onClick={() => openImageViewer(10)} />
              <img src={images[11]} onClick={() => openImageViewer(11)} />
              <img src={images[17]} onClick={() => openImageViewer(17)} />
            </div>
          }
        />
        <SearchFilterCard
          title={"Клиенты"}
          children={
            <div className={classes["main__content__grid"]}>
              <img src={images[15]} onClick={() => openImageViewer(15)} />
              <img src={images[16]} onClick={() => openImageViewer(16)} />
            </div>
          }
        />
        <SearchFilterCard
          title={"Общее"}
          children={
            <div className={classes["main__content__grid"]}>
              <img src={images[19]} onClick={() => openImageViewer(19)} />
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
              backgroundColor: "rgba(255, 255, 255, 0.8)",
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
