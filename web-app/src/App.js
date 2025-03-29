import "./App.css";
import { useContext, useState } from "react";
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
        background:
          "linear-gradient(90deg, rgba(191,16,0,1) 0%, rgba(209,9,9,1) 28%, rgba(227,99,35,1) 58%, rgba(255,250,37,1) 100%)",
        color: "white",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: "yellow",
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
      main: "#DB0007",
      mainGradient:
        "linear-gradient(90deg, rgba(191,16,0,1) 0%, rgba(209,9,9,1) 28%, rgba(227,99,35,1) 58%, rgba(255,250,37,1) 100%)",
    },
    secondary: {
      main: "#FFBC0D",
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
