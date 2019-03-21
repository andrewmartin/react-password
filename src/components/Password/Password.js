import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Password extends Component {
  static propTypes = {
    validation: PropTypes.array
  };

  state = {
    errors: []
  };

  onChange = ({ target: { value } }) => {
    const { validation, onValid, onInvalid } = this.props;

    this.setState({
      errors: []
    });

    if (!value) {
      return onInvalid(null);
    }

    const errors = validation.map(validFn => validFn(value)).filter(n => n);

    errors.length ? onInvalid(value) : onValid(value);

    this.setState({
      errors
    });
  };

  render() {
    const { errors } = this.state;

    const classNames = ['ant-input', errors.length && 'is-invalid'].filter(Boolean).join(' '); // would probably use `classnames` library here

    return (
      <>
        <input className={classNames} onChange={this.onChange} type="text" />
        {!!errors.length && (
          <div className="info has-error">
            {errors.map(msg => (
              <div key={msg} className="ant-form-explain">
                {msg}
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
}
