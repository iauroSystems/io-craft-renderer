// import './styles.css';
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomSnackbar({
  open = false,
  onClose,
  msg = '',
  duration = 6000,
  severity = 'info',
}: any) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}

export default React.memo(CustomSnackbar);

// export default function CustomSnackbar() {
//   const [open, setOpen] = React.useState(true);

//   return (
//     <CustomSnackbar
//       msg=""
//       open={open}
//       onClose={() => setOpen(false)}
//       duration={10000}
//     />
//   );
// }
