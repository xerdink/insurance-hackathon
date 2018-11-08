import React, { Component } from "react";
import Phoenix from "./contracts/Phoenix.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import ShadowImage from "react-shadow-image";
import { Button } from "rebass";
import Lottie from "react-lottie";

import CoinImage from "./coin.png";
import "./App.css";
import * as animationData from "./loading.json";

class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const Contract = truffleContract(Phoenix);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      this.setState({ web3, accounts, contract: instance });

      // Smart contract held amount
      console.log(await web3.eth.getBalance(instance.address));
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  }

  _makeInsurance = async () => {
    await this.state.contract
      .makeInsurance({ from: this.state.accounts[0], 
        value: this.state.web3.utils.toWei("1", "ether") });
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };

    if (!this.state.web3) {
      return (
        <div className="container">
          <div className="loading">
            <Lottie
              options={defaultOptions}
              height={400}
              width={400}
            />
          </div>
        </div>
      );
    }

    return (
      <div className="content">
        <ShadowImage
          src={CoinImage}
          alt="Coin"
          style={{ display: "inline-block" }}
          ShadowProps={{
            style: {
              top: 16,
              right: 16,
              bottom: 16,
              filter: "blur(32px)",
              transform: "scale(0.96)"
            }
          }}
        />
        <div style={{ display: "inline-block", textAlign: "center" }}>
          <p style={{ fontSize: "170%", marginLeft: "70px" }}>
            <strong>You are about to finish your insurance!</strong>
          </p>
          <p style={{ fontSize: "140%", marginLeft: "70px" }}>
            You will be prompted by MetaMask <br /> to confirm transaction.{" "}
            <br />
            In order not to be scammed, <br />
            please ensure that link contains `Phoenix`.
          </p>
          <Button
            bg="blue"
            onClick={this._makeInsurance}
            borderRadius={30}
            width={[1, 1 / 3]}
          >
            Finish!
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
