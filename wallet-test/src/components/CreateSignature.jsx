import React, { Component } from "react";
import { ethers } from "ethers";

class CreateSignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateKey: null,
      address: null,
      message: "",
      signature: null,
    };
  }

  generatePrivateKey = () => {
    const wallet = ethers.Wallet.createRandom();
    this.setState(
      {
        privateKey: wallet.privateKey,
        address: wallet.address, // Set the address in state
      },
      () => {
        // Notify parent component (if onAddressChange prop is provided)
        if (this.props.onAddressChange) {
          this.props.onAddressChange(this.state.address);
        }
      }
    );
  };

  handleInputChange = (e) => {
    this.setState({ message: e.target.value });
  };

  signMessage = async () => {
    if (!this.state.privateKey || !this.state.message) {
      alert("Please generate a private key and enter a message.");
      return;
    }

    const wallet = new ethers.Wallet(this.state.privateKey);
    const signature = await wallet.signMessage(this.state.message);

    if (signature.length !== 132) {
      alert(
        "Invalid signature length. Ethereum-style signatures should be 65 bytes."
      );
      return;
    } else {
      alert("Signature is valid.");
    }

    const formattedSignature = ethers.hexlify(signature);
    this.setState({ signature: formattedSignature });
    if (this.props.onSignatureChange) {
      this.props.onSignatureChange(this.state.signature);
    }
  };

  formatSignature(signature) {
    return signature.startsWith("0x") ? signature.substring(2) : signature;
  }


  render() {
    return (
      <>
        <div>
          <button onClick={this.generatePrivateKey}>
            Generate Private Key
          </button>
          {this.state.privateKey && (
            <div>
              <p>Generated Private Key:</p>
              <p>{this.state.privateKey}</p>
            </div>
          )}
          {this.state.address && (
            <div>
              <p>Associated Address:</p>
              <p>{this.state.address}</p>
            </div>
          )}
          <div>
            <input
              type="text"
              placeholder="Enter message to sign"
              value={this.state.message}
              onChange={this.handleInputChange}
            />
            <button onClick={this.signMessage}>Sign Message</button>
          </div>
          {this.state.signature && (
            <div>
              <p>Ethereum-style Signature:</p>
              <p>{this.formatSignature(this.state.signature)}</p>
            </div>
          )}
        </div>
        
      </>
    );
  }
}

export default CreateSignature;
