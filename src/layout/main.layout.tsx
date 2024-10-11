import { TopBar } from "@/components/";
import ResponsiveDrawer from "@/components/navigation/drawer/drawer.component";
import { Outlet } from "react-router-dom";
import classes from "./styles.module.scss";
import { useEffect, useState } from "react";

const MainLayout = () => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const openMenuBar = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  useEffect(() => {
    const ws = new WebSocket(
      "wss://crm-beauty-salon-94a93ffd62e6.herokuapp.com/ws/notifications/",
    );
    let startTime = Date.now();

    ws.onopen = () => {
      console.log("Connected to the WebSocket server");
      startTime = Date.now();
      return new Promise((resolve) => {
        ws.onmessage = (event) => {
          const data = event.data;
          if (data.message) {
            resolve(data.message);
          }
        };
        ws.send("get_notification");
      });
    };

    ws.onmessage = (event) => {
      const endTime = Date.now();
      const data = event.data;
      if (data.message) {
        console.log("Received message:", data.message);
        console.log("Message received at:", endTime);
        console.log("Round-trip latency (ms):", endTime - startTime);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(ws);

    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message: "get_notification" }));
    } else {
      console.error("WebSocket is not open. Cannot send message.");
    }
  };

  const handleCloseModal = () => {
    setIsOpenMenu(false);
  };

  return (
    <div className={classes["layout"]}>
      <div className={classes["layout__sidebar"]}>
        <ResponsiveDrawer handleClose={handleCloseModal} isOpen={isOpenMenu} />
      </div>
      <div className={classes["layout__main"]}>
        <TopBar mobileOpen={isOpenMenu} openMenuBar={openMenuBar} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
