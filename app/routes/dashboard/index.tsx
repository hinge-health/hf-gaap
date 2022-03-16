import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box
} from '@mui/material';
import { json, Link, useLoaderData } from 'remix';

export const loader = async () => {
  // TODO: Fetch our actual data or mock with actual shape...

  return json({
    invoices: [
      { id: 0, amount: 100 },
      { id: 1, amount: 200 },
      { id: 2, amount: 300 }
    ],
    claims: [
      { id: 0, amount: 400 },
      { id: 1, amount: 500 },
      { id: 2, amount: 600 }
    ]
  });
};

const Dashboard = () => {
  const data = useLoaderData();

  return (
    <div>
      <Box component='section' p={2}>
        <Typography variant='h6' component='h2'>
          Invoices
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.invoices.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.amount}</TableCell>
                <TableCell>
                  <Link to={`invoice/${c.id}`}>Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box component='section' p={2}>
        <Typography variant='h6' component='h2'>
          Claims
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.claims.map(c => (
              <TableRow key={c.id}>
                <TableCell>{c.amount}</TableCell>
                <TableCell>
                  <Link to={`claim/${c.id}`}>Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </div>
  );
};

export default Dashboard;
