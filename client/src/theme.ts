import { createTheme, type PaletteColorOptions } from "@mui/material";

declare module '@mui/material/styles' {
  interface Palette {
    teceo: Palette['primary'];
    teceoSecondary: Palette['primary'];
  }
  interface PaletteOptions {
    teceo?: PaletteColorOptions;
    teceoSecondary?: PaletteColorOptions;
  }
}

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      teceo: {
        main: mode === "dark" ? "#FFFFFF" : "#E8E8E8",
        dark: 'black'
      },
      teceoSecondary: {
        main: "#BBBBBB",
        dark: 'white'
      }
    },
     components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 8,
          },
          containedPrimary: {
            backgroundColor: "#FC6B4B",
            color: "#fff",
            border: "1.5px solid #FC6B4B",
            "&:hover": {
              backgroundColor: "#ff835f",
              borderColor: "#ff835f",
              color: "#fff",
            },
          },
          outlinedPrimary: {
            backgroundColor: "#fff",
            color: "#FC6B4B",
            border: "1.5px solid #FC6B4B",
            "&:hover": {
              backgroundColor: "#fff7f5",
              color: "#ff835f",
              borderColor: "#ff835f",
            },
          },
        },
      },
    },
  });
