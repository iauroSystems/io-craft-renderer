import { CircularProgress } from "@mui/material";

export interface ILoaderProps {
  status: boolean;
  size?: number;
}

const Loader = (props: ILoaderProps) => {
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      {props && props.status && (
        <CircularProgress color={"primary"} size={props.size || 40} />
      )}
    </div>
  );
};

export default Loader;
