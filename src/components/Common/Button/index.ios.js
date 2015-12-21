'use strict';

import React, {
  TouchableHighlight,
  Component,
  Text,
  PropTypes,
  View,
} from 'react-native';

import styles from './styles';

const propTypes = {
  style: View.propTypes.style,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.style]}
        onPress={!this.props.disabled ? this.props.onPress : null}
      >
        <Text style={styles.text}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

Button.propTypes = propTypes;

export default Button;
