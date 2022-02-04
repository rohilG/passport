import React from "react";

const verifyTransaction = async function (attendee_addr, creator_addr) {};

class Verifier extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artistPublicKey: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    verifyTransaction(this.state.artistPublicKey);
    //alert("submitted: " + this.state.artistPublicKey);
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ artistPublicKey: event.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label for="fname">Artist Creator:</label>
        <br />
        <input
          type="text"
          value={this.state.artistPublicKey}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default Verifier;
