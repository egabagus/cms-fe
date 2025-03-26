import { Backdrop, CircularProgress } from "@mui/material";

interface loaderProps {
  open: boolean;
}

const Loader = ({ open }: loaderProps) => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 999 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
