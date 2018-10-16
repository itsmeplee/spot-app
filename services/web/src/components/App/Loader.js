import React, { Component } from 'react';
import { css } from 'react-emotion';
import { RotateLoader } from 'react-spinners';

class Loader extends Component {
  state = {
    override : css`
    display: block;
    border-color: red;
    `
  }

  render(){
    return (
      <div className="centeredOnPage">
        <RotateLoader
          className={this.state.override}
          sizeUnit={"px"}
          size={50}
          color={"#495057"}
          loading={true}
        />
      </div>
    )
  }
}

export default Loader;