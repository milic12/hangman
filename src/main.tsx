import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ScoreDisplay from "./components/ScoreDisplay.tsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import Game from "./components/Game.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Router basename={import.meta.env.BASE_URL}>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>

          <Routes>
            <Route path="/game" element={<Game />} />
          </Routes>

          <Routes>
            <Route path="/score" element={<ScoreDisplay />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
