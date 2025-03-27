import React, { forwardRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ListItem } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

export default function AppMenuItemComponent({
  onClick,
  link,
  divider,
  children,
}) {
  const location = useLocation();

  if (divider) {
    return <Divider />;
  }
  // If link is not set return the ordinary ListItem
  if (!link) {
    return (
      <ListItem
        button
        selected={location.pathname === link}
        children={children}
        onClick={onClick}
      />
    );
  }

  // Return a LitItem with a link component
  return (
    <ListItem
      button
      selected={location.pathname === link}
      children={children}
      component={forwardRef((props, ref) => (
        <NavLink {...props} ref={ref} />
      ))}
      to={link}
      onClick={onClick}
    />
  );
}
