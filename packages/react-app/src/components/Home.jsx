import React from "react";
import PropTypes from "prop-types";

import { Steps, Divider, Button } from "antd";

import { APP_DESCRIPTION } from "../constants";
import logo from "../assets/logo.png";

const { Step } = Steps;

function Home({ login }) {
  return (
    <div>
      <div className="logo-section">
        <img src={logo} className="home-logo" />
        <p>{APP_DESCRIPTION}</p>
      </div>
      <Steps progressDot current={2}>
        {/* <Step title="Waiting" description="This is a description." />
        <Step title="In Progress" description="This is a description." />
        <Step title="Finished" description="This is a description." /> */}
      </Steps>

      <Button type="primary" onClick={login}>
        Get started
      </Button>
    </div>
  );
}

Home.propTypes = {};

export default Home;
