import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

type Props = {};
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => {
  return {
    '& .MuiDialogContent-root': {
      padding: 2,
    },
    '& .MuiDialogActions-root': {
      padding: 2,
    },
  };
});

export const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const CustomModal = (props: any) => {
  const [open, setOpen] = React.useState(props?.open);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Modal title
      </BootstrapDialogTitle>
      <DialogContent dividers></DialogContent>
    </BootstrapDialog>
  );
};

export default CustomModal;
