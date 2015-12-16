'use strict';

import React, {
  TouchableHighlight,
  Component,
  Text,
} from 'react-native';

import styles from './styles';

class Button extends Component {
  render() {
    return (
      <TouchableHighlight style={[styles.button, this.props.style]} onPress={this.props.onPress}>
        <Text style={styles.text}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    )
  }
}

export default Button;
