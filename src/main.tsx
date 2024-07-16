import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NiceModal from "@ebay/nice-modal-react";
import store from "./store/store.ts";
import "@/scss/main.scss";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <NiceModal.Provider>
          <App />
        </NiceModal.Provider>
      </BrowserRouter>
    </Provider>
    <Toaster />
  </QueryClientProvider>
);
