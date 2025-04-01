import "./App.css";
import React, { useContext, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { queryClient, setQueryDefaults } from "./service/QueryClient";
import { QueryClientProvider } from "react-query";
// import UserContext from "./context/UserContext";
import AppRoutes from "./routes/Routes";
import DateFnsUtils from '@date-io/date-fns';
import { Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { CartProvider } from "./context/CartContext";

const customTheme = {
  overrides: {
    MuiTableRow: {
      head: {
          background: "#007BFF",
        color: "white",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: "white",
        fontSize: "1.2em",
        "&:hover": {
          color: "#424242 !important",
        },
        "&.MuiTableSortLabel-active": {
          color: "#121212",
        },
        "& *": {
          color: "#2f2f2f !important",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#007BFF", // Blue
      mainGradient:
        "linear-gradient(90deg, rgba(0, 91, 187, 1) 0%, rgba(0, 123, 255, 1) 28%, rgba(91, 192, 222, 1) 58%, rgba(255, 255, 255, 1) 100%)",
    },
    secondary: {
      main: "#FFFFFF", // White
    },
    text: {
      dark: "#121212",
    },
    type: "light",
  },
  toolbarHeight: 50,
  
};

setQueryDefaults();

function App() {
  const [theme, setTheme] = useState(customTheme);
  return (
    <AuthProvider>
      <CartProvider>
        <QueryClientProvider client={queryClient}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={createTheme(theme)}>
            <CssBaseline />
            <Routes>{AppRoutes}</Routes>
          </ThemeProvider>
          </MuiPickersUtilsProvider>
        </QueryClientProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
