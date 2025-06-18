import { Button as MUIButton, CircularProgress, type ButtonProps as MUIButtonProps } from "@mui/material";
import React from "react";

type ButtonProps = {
  loading?: boolean;
  children: React.ReactNode;
} & MUIButtonProps;

export function Button({
  variant = "contained",
  loading = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <MUIButton
      variant={variant}
      color="primary"
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        children
      )}
    </MUIButton>
  );
}
