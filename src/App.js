import React, { Component } from 'react';
import { Password, withPassword } from './components/Password';
import VALIDATIONS from './validations';
import './App.css';

const Input = props => <input {...props} />;
const ConnectedPassword = withPassword(VALIDATIONS)(Input);

// just for fun
const RANDOM_VALIDATIONS = VALIDATIONS.sort(() => 0.5 - Math.random());

class App extends Component {
  state = {};

  onValid = (exampleIndex, value) => {
    this.setState({
      [exampleIndex]: value
    });
  };

  onInvalid = (exampleIndex, value) => {
    this.setState({
      [exampleIndex]: null
    });
  };

  render() {
    const { example1, example2, example3 } = this.state;

    return (
      <main className="wrapper">
        <h2>React Password Component Demo</h2>
        <p>
          Built by <a href="https://andrewmart.in">Andrew Martin</a>
        </p>
        <div className="ant-layout-content">
          <div className="ant-row ant-form-item">
            <label className="ant-form-item-label">Password</label>
            <Password
              onValid={this.onValid.bind(this, 'example1')}
              onInvalid={this.onInvalid.bind(this, 'example1')}
              validation={VALIDATIONS}
            />
            {example1 && (
              <div className="info">
                The value <code>{example1}</code> has passed validation.
              </div>
            )}
          </div>
        </div>
        <div className="ant-layout-content">
          <div className="ant-row ant-form-item">
            <label className="ant-form-item-label">
              Password with limited, configureable validations. Random set chosen on page refresh.
            </label>
            <div className="info">
              {RANDOM_VALIDATIONS.slice(0, 3)
                .map(fn => fn(' 123 ')) // this will fail all existing validations, just to output their error msg
                .map(name => (
                  <div>{name}</div>
                ))}
            </div>
            <Password
              onValid={this.onValid.bind(this, 'example2')}
              onInvalid={this.onInvalid.bind(this, 'example2')}
              validation={RANDOM_VALIDATIONS.slice(0, 3)}
            />
            {example2 && (
              <div className="info">
                The value <code>{example2}</code> has passed validation.
              </div>
            )}
          </div>
        </div>
        <div className="ant-layout-content">
          <div className="ant-row ant-form-item">
            <label className="ant-form-item-label">Connected Password</label>
            <ConnectedPassword
              onValid={this.onValid.bind(this, 'example3')}
              onInvalid={this.onInvalid.bind(this, 'example3')}
            />
            {example3 && (
              <div className="info">
                The value <code>{example3}</code> has passed validation.
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default App;
