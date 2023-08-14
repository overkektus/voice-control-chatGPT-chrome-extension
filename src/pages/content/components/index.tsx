import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import SettingsContextProvider from "./settingsConext";

refreshOnUpdate("pages/content");

const root = document.createElement("div");

const linkFont = document.createElement("link");
linkFont.rel = "stylesheet";
linkFont.href =
  "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap";

document.querySelector("head").append(linkFont);

document.querySelector("form").after(root);

createRoot(root).render(
  <SettingsContextProvider>
    <App />
  </SettingsContextProvider>
);
