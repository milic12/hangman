import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserName } from "../redux/features/gameSlice";

const NameDialog = () => {
  const [open, setOpen] = React.useState<boolean>(true);
  const [inputUser, setInputUser] = React.useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(setUserName(inputUser));
    setOpen(false);
    navigate("/game");
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Add your player name:</DialogTitle>
        <DialogContent className="w-full md:w-[500px]">
          <DialogContentText id="alert-dialog-description">
            <input
              type="text"
              value={inputUser}
              onChange={(e) => setInputUser(e.target.value)}
              placeholder="Enter your name here"
              className="w-full mt-4 px-4 py-3 rounded-lg border border-neutral-200 outline-none transition-all duration-200 bg-neutral-50 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 hover:border-neutral-300"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <button onClick={handleClose} autoFocus className="mt-4">
            Accept
          </button> */}
          <button
            disabled={inputUser === ""}
            onClick={handleClose}
            autoFocus
            className={`px-6 py-2 rounded-lg text-white font-medium shadow-md transition-all 
              ${
                inputUser === ""
                  ? "!bg-gray-400 cursor-not-allowed"
                  : "!bg-blue-900 hover:!bg-blue-700 focus:ring-2 focus:ring-blue-400"
              }
              focus:outline-none`}
          >
            Accept
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default NameDialog;
