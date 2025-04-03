import { useState } from "react";
import { TextField, IconButton } from "@material-ui/core";
import { LockOpen, Lock } from "@material-ui/icons";

const PasswordEditComponent = ({ value, onChange }) => {
  const [localPassword, setLocalPassword] = useState(value || "");
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setLocalPassword(newPassword);
    onChange(newPassword);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        value={localPassword}
        onChange={handlePasswordChange}
        type={showPassword ? "text" : "password"}
        variant="outlined"
        fullWidth
      />
      <IconButton onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <LockOpen /> : <Lock />}
      </IconButton>
    </div>
  );
};

export default PasswordEditComponent;
