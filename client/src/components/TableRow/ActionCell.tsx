import { IconButton } from "@mui/material";
import { Edit as EditIcon, Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";

interface ActionCellProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ActionCell({ isEditing, onEdit, onSave, onCancel }: ActionCellProps) {
  return isEditing ? (
    <>
      <IconButton
        size="small"
        onClick={e => { e.stopPropagation(); onSave(); }}
      >
        <CheckIcon fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={e => { e.stopPropagation(); onCancel(); }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  ) : (
    <IconButton
      size="small"
      onClick={e => { e.stopPropagation(); onEdit(); }}
    >
      <EditIcon fontSize="small" />
    </IconButton>
  );
}
