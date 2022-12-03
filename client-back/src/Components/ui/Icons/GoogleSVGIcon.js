import React from "react";
import Icon from "@mdi/react";
import { mdiGoogle } from "@mdi/js";

export default function GoogleSVGIcon() {
  return (
    <Icon
      path={mdiGoogle}
      title='google icon'
      size={1}
      horizontal
      vertical
      rotate={180}
      color='red'
      //   spin
    />
  );
}
