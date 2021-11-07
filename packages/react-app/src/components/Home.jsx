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
        <Step
          title="Login with Metamask."
          // description="Connect your Ethereum-enabled wallet to use Uniramp."
        />
        <Step
          title="Find, share, and create liquidity pools."
          // description="Uniramp helps you discover the most advantageous liquidity pools."
        />
        <Step
          title="Learn and earn rewards."
          // description="Uniramp has a suite of free information to onboard you to core Uniswap concepts."
        />
      </Steps>

      <div className="home-button-section">
        <Button type="primary" size="large" onClick={login}>
          Get started
        </Button>
      </div>
    </div>
  );
}

Home.propTypes = {};

export default Home;
