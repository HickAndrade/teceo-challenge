import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface StatusCellProps {
  status: string;
}

export function StatusCell({ status }: StatusCellProps) {
  return status === "success" ? (
    <span className="flex items-center font-semibold text-green-700 text-sm">
      <CheckCircleIcon className="mr-1" fontSize="small" />
      Concluída
    </span>
  ) : (
    <span className="flex items-center font-semibold text-red-700 text-sm">
      <ErrorIcon className="mr-1" fontSize="small" />
      Erro
    </span>
  );
}
