import React, { useState } from "react";
import ModalWindow from "@/components/modal-window/modal-window";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import classes from "@/modals/home/styles.module.scss";
import EventTabs from "@/modals/home/event-details/components/event-tabs";
import { eventTabs } from "./data";
import Grid from "@mui/material/Unstable_Grid2";
import TableVertical from "@/components/tables/tableVertical/vertical-info-card";
import TableHorizontal from "@/components/tables/table-horizontal/horizontal-info-card";
import {
  mainTableData,
  additionalInfoTableData,
  discountsTableData,
  financeTableData,
  contactsTableData,
  commentsTableData,
} from "@/pages/clients/client-card/data";

const EventDetailsModal = () => {
  const modal = useModal();
  const [currentTab, setCurrentTab] = useState(eventTabs[0].to);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const renderContent = () => {
    switch (currentTab) {
      case "/tab1":
        return (
          <div>
            <h1>hello</h1>
          </div>
        );
      case "/tab2":
        return (
          <div>
            <Grid
              container
              sx={{
                flexDirection: { xs: "column" },
                mt: "1.6rem",
              }}
              xs={9}
              md={12}
              rowSpacing={3}
            >
              <Grid container columnSpacing={3}>
                <Grid xs={6}>
                  <TableVertical
                    data={mainTableData}
                    title="Главное"
                    includeDropdown
                  />
                </Grid>
                <Grid xs={6}>
                  <TableVertical
                    data={additionalInfoTableData}
                    title="Доп. информация"
                  />
                </Grid>
              </Grid>

              <Grid container columnSpacing={3}>
                <Grid xs={6}>
                  <TableVertical data={discountsTableData} title="Скидки" />
                </Grid>
                <Grid xs={6}>
                  <TableVertical data={financeTableData} title="Финансы" />
                </Grid>
              </Grid>

              <Grid container columnSpacing={3}>
                <Grid xs={6}>
                  <TableHorizontal data={contactsTableData} title="Контакты" />
                </Grid>
                <Grid xs={6}>
                  <TableHorizontal
                    data={commentsTableData}
                    title="Комментарии"
                    hasTableHead={false}
                    showEyeIcon
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        );
      case "/tab3":
        return <div>Content for Tab 3</div>;
      case "/tab4":
        return <div>Content for Tab 4</div>;
      default:
        return <div>Default Content</div>;
    }
  };

  return (
    <ModalWindow
      title={"Event Details"}
      open={modal.visible}
      handleClose={() => modal.hide()}
      className={classes["u-p-0"]}
    >
      <div>
        <EventTabs
          tabsData={eventTabs}
          currentTab={currentTab}
          onTabChange={handleTabChange}
        />
        {renderContent()}
      </div>
    </ModalWindow>
  );
};

export default NiceModal.create(EventDetailsModal);
