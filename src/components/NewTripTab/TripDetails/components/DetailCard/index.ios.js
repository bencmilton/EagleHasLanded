'use strict';

import React, {
  View,
  Component,
  Text,
  PropTypes,
} from 'react-native';

import Button from '../../../../Common/Button';
import styles from './styles';

const propTypes = {
  type: PropTypes.string.isRequired,
  location: PropTypes.object,
  date: PropTypes.object,
  selectLocation: PropTypes.func.isRequired,
  selectDate: PropTypes.func.isRequired,
};

class DetailCard extends Component {
  render() {
    const { type, location, date } = this.props;
    return (
      <View style={styles.card}>
        <Button
          text={`Set ${type} Location`}
          onPress={this.props.selectLocation}
        />
        <Text style={styles.text}>
          {location ? location.description : 'None'}
        </Text>
        <Button
          text={`Set ${type} Date/Time`}
          onPress={this.props.selectDate}
        />
        <Text style={styles.text}>
          {date.toLocaleDateString() + '\n' + date.toLocaleTimeString()}
        </Text>
      </View>
    );
  }
}

DetailCard.propTypes = propTypes;

export default DetailCard;
