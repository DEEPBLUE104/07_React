import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import HeatIndexTable from "./components/HeatIndexTable.jsx";

createRoot(document.getElementById("root")).render(<HeatIndexTable />);
