import { selectAppError, setAppErrorAC } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import { SyntheticEvent } from "react"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import { ERROR_SNACKBAR_SX } from "./ErrorSnackbar.styles"

export const ErrorSnackbar = () => {
  const error = useAppSelector(selectAppError)

  const dispatch = useAppDispatch()

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(setAppErrorAC({ error: null }))
  }

  return (
    <Snackbar
      open={error !== null}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={ERROR_SNACKBAR_SX.alert}
      >
        {error}
      </Alert>
    </Snackbar>
  )
}
