import { Checkbox as MUICheckbox, type CheckboxProps } from "@mui/material";

export function Checkbox(props: CheckboxProps) {
  return (
    <MUICheckbox
      sx={{
        color: "#FC6B4B",
        "&.Mui-checked": {
          color: "#FC6B4B",
        },
        "&.MuiCheckbox-indeterminate": {
          color: "#FC6B4B",
        },
        ...props.sx,
      }}
      {...props}
    />
  );
}
