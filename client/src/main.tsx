import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./index.scss";
import "antd/dist/antd.css";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "./MuiTheme";
import store from "./stores";

import "@rainbow-me/rainbowkit/styles.css";

import {
  ConnectButton,
  darkTheme,
  getDefaultWallets,
  midnightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  chain,
  configureChains,
  createClient,
  useAccount,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
const { chains, provider } = configureChains(
  [
    // chain.mainnet,
    // chain.polygon,
    // chain.optimism,
    // chain.arbitrum,
    chain.polygonMumbai,
  ],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#ff6303",
            accentColorForeground: "#000000",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "large",
          })}
          coolMode
        >
          <App />
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  </Provider>
);
