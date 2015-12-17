'use strict';

import React, {
  TouchableHighlight,
  Component,
  Text,
  PropTypes,
} from 'react-native';

import styles from './styles';

const propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

class Button extends Component {
  render() {
    return (
      <TouchableHighlight style={[styles.button, this.props.style]} onPress={this.props.onPress}>
        <Text style={styles.text}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

Button.propTypes = propTypes;

export default Button;
