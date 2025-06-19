import { TextField, Select, MenuItem } from "@mui/material";

interface EditableCellProps {
  field: any;
  value: any;
  onChange: (value: any) => void;
  options?: { value: string; label: string }[];
}

export function EditableCell({ field, value, onChange }: EditableCellProps) {
  if (field.type === "select") {
    return (
      <Select
        value={value}
        size="small"
        fullWidth
        onClick={e => e.stopPropagation()}
        onChange={e => onChange(e.target.value)}
        sx={{
          maxWidth: field.width,
          minWidth: 0,
          "& .MuiSelect-select": { p: "6px 16px" }
        }}
      >
        <MenuItem value="success">Concluída</MenuItem>
        <MenuItem value="error">Erro</MenuItem>
      </Select>
    );
  }

  return (
    <TextField
      value={value}
      type={field.type}
      size="small"
      fullWidth
      onClick={e => e.stopPropagation()}
      onChange={e =>
        onChange(field.type === "number" ? Number(e.target.value) : e.target.value)
      }
    />
  );
}
