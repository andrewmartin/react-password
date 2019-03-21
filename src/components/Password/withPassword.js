import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withPassword = validation => Child => {
  return class WithPassword extends Component {
    static propTypes = {
      onValid: PropTypes.func.isRequired
    };

    static defaultProps = {
      onValid: () => null
    };

    state = {
      errors: []
    };

    onChange = ({ target: { value } }) => {
      const { onValid, onInvalid } = this.props;

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
      const { onValid, onInvalid, ...restProps } = this.props;
      const { errors } = this.state;

      const classNames = ['ant-input', errors.length && 'is-invalid'].filter(Boolean).join(' '); // would probably use `classnames` library here

      return (
        <>
          <Child className={classNames} onChange={this.onChange} {...restProps} />
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
  };
};
export default withPassword;
