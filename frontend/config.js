import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? "https://yourliveeserverdomain.com"
  : "http://localhost:8000";
