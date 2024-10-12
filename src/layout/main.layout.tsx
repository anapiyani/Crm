import { TopBar } from "@/components/";
import ResponsiveDrawer from "@/components/navigation/drawer/drawer.component";
import { Outlet } from "react-router-dom";
import classes from "./styles.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";

export default function MainLayout() {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [chatMenuWidth, setChatMenuWidth] = useState(420);
  const chatMenuRef = useRef<HTMLDivElement>(null);
  const isResizingRef = useRef(false);

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

  const openChatMenu = () => {
    setIsOpenMenu(true);
  };

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizingRef.current) return;
    const newWidth = e.offsetX;
    if (newWidth >= 300 && newWidth <= 800) {
      setChatMenuWidth(newWidth);
    }
  }, []);

  const stopResizing = useCallback(() => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
  }, [handleMouseMove]);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", stopResizing);
    };
  }, [handleMouseMove, stopResizing]);

  return (
    <div className={classes["layout"]}>
      <div className={classes["layout__sidebar"]}>
        <ResponsiveDrawer
          openChatMenu={openChatMenu}
          handleClose={handleCloseModal}
          isOpen={isOpenMenu}
        />
      </div>
      <div className={classes["layout__main"]}>
        <TopBar mobileOpen={isOpenMenu} openMenuBar={openMenuBar} />
        <div className={classes["layout__content-wrapper"]}>
          {isOpenMenu && (
            <div
              ref={chatMenuRef}
              className={classes["layout__chat-menu"]}
              style={{ width: `${chatMenuWidth}px` }}
            >
              <div className={classes["layout__chat-menu-content"]}>
                smth hier alles nitch ready
              </div>
              <div
                className={classes["layout__chat-menu-resizer"]}
                onMouseDown={startResizing}
              />
            </div>
          )}
          <div className={classes["layout__content"]}>
            {isOpenMenu && (
              <div
                className={classes["layout__overlay"]}
                onClick={handleCloseModal}
              />
            )}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
