import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/system';
import generateRandomString from 'apps/view-page/src/utils/randomString';

/* eslint-disable-next-line */
export interface DatagridProps {
  rows: Array<any>;
  columns: Array<any>;
}

const StyledDataGrid = styled('div')(({ theme }) => {
  return {
    '&': {
      backgroundColor: theme.palette['background'].default,
    },
  };
});

export function Datagrid(props: DatagridProps) {
  const theme = useTheme();

  return (
    <StyledDataGrid>
      <div
        className="w-full h-full"
        style={{
          backgroundColor: theme.palette['background'].default,
          color: theme.palette['text'].primary,
        }}
      >
        <DataGrid
          style={{
            minHeight: 300,
            backgroundColor: theme.palette['background'].default,
            color: theme.palette['text'].primary,
            borderRadius: '0px',
          }}
          sx={{
            '& .MuiDataGrid-cell:hover': {
              color: theme.palette['text'].primary,
            },
          }}
          rows={props.rows}
          columns={props.columns}
          getRowId={(row) => generateRandomString()}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableColumnMenu
          disableColumnFilter
        />
      </div>
    </StyledDataGrid>
  );
}

export default Datagrid;
