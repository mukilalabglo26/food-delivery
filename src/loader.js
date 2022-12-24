import React from "react";

import { CircularProgress } from "@mui/material";

function Loader(props) {
  return (
    <div>
      {props.load ? <center>
        <CircularProgress sx={{ marginTop: 10 }} /></center>
        : <></>}
    </div>
  )
}
export default Loader;