import { Component, type ErrorInfo, type ReactNode } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

type Props = {
  children: ReactNode
}

type State = {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error", error, info.componentStack)
  }

  private handleReload = () => {
    window.location.assign("/")
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <Box
        role="alert"
        sx={{
          minHeight: "50vh",
          display: "grid",
          placeItems: "center",
          gap: 2,
          px: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h1">
          Something went wrong
        </Typography>
        <Typography color="text.secondary">
          Please reload the page or return to the home screen.
        </Typography>
        <Button variant="contained" onClick={this.handleReload}>
          Go to home
        </Button>
      </Box>
    )
  }
}
