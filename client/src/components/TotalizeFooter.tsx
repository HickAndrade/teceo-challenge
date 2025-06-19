import { Box, Typography, useTheme } from "@mui/material";
import { Button } from "./ui/Button";

interface TotalizerFooterProps {
  totalConcluidos: number;
  totalErros: number;
  totalGeral: number;
  numSelecionados: number;
  onExport: () => void;
  onBulk: () => void;
}

export function TotalizerFooter({
  totalConcluidos,
  totalErros,
  totalGeral,
  numSelecionados,
  onExport,
  onBulk,
}: TotalizerFooterProps) {
    const theme = useTheme();
  return (
    <Box
       display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          bgcolor: theme.palette.teceoSecondary.dark,
          color: "teceo.contrastText",
          py: "18px",
          px: "20px",
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          boxShadow: 2,
        }}
    >
      <Box display="flex" gap={3} alignItems="center">
        <Typography color="success.main" sx={{ fontWeight: 400 }}>
          {totalConcluidos} itens concluídos
        </Typography>
        <Typography color="error.main" sx={{ fontWeight: 400 }}>
          {totalErros} itens com Erro
        </Typography>
        <Typography sx={{ color: "teceo.contrastText", fontWeight: 400 }}>
          {totalGeral} itens
        </Typography>
      </Box>
      <Box>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mr: 2, color: "teceo.contrastText", borderColor: "teceo.contrastText" }}
          disabled={numSelecionados === 0}
          onClick={onExport}
        >
          Exportar
        </Button>
        <Button
          variant="contained"
          disabled={numSelecionados === 0}
          onClick={onBulk}
        >
          {numSelecionados === 0
            ? "Nenhum item selecionado"
            : `(${numSelecionados}) ${numSelecionados === 1 ? "Item" : "Itens"} selecionado${numSelecionados === 1 ? "" : "s"}`}
        </Button>
      </Box>
    </Box>
  );
}
