import { PageHeader } from "antd";
import React from "react";
import { APP_DESCRIPTION, APP_NAME } from "../constants";

import logo from "../assets/logo.png";

// displays a page header

export default function Header() {
  const title = (
    <span>
      <img src={logo} className="header-image" />
    </span>
  );

  return (
    <a href="https://github.com/cbonoz/unicode21" target="_blank" rel="noopener noreferrer">
      <PageHeader title={title} subTitle={APP_DESCRIPTION} style={{ cursor: "pointer" }} />
    </a>
  );
}
