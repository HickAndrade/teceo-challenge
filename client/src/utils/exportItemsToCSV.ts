import Papa from "papaparse";

export function exportItemsToCSV(items: any[], filename = "itens.csv") {
  const csv = Papa.unparse(items);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
