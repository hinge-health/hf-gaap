import { GridRenderCellParams } from '@mui/x-data-grid';
import { Link } from '@mui/material';

const generateLink = (param: GridRenderCellParams) => {
  return <Link target='blank' href={`http://localhost:8082/tree?dag_id=${param.row.dagName}`}>Logs</Link>;
};

export const isSuccessful = (total: string): boolean => {
  const num = Number(total.replace(/[^0-9.-]+/g, ''));

  return num > 0;
};

export default generateLink;
