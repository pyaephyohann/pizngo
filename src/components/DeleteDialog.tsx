import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  callBack: () => void;
}

const DeleteDialog = ({ open, setOpen, title, callBack }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ mt: "0.5rem" }}>{title}</DialogTitle>
      <DialogContent sx={{ my: "0.5rem" }}>
        This action cannot be undone
      </DialogContent>
      <DialogActions
        sx={{
          mb: "1rem",
          mr: "1rem",
        }}
      >
        <Button
          sx={{ mr: "2rem" }}
          onClick={() => setOpen(false)}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          color="error"
          onClick={() => {
            callBack();
            setOpen(false);
          }}
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
