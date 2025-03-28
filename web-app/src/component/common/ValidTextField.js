import { TextField } from "@material-ui/core";

export default function ValidTextField(props) {
  const { error } = props;

  return <TextField {...props} error={!!error} helperText={error?.message} />;
}