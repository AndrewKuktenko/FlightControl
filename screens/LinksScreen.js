import React from 'react';
import { ScrollView, StyleSheet, Picker } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
const MAP_TYPES = {
    STANDARD: 'standard',
    SATELLITE: 'satellite',
    HYBRID: 'hybrid',
    TERRAIN: 'terrain',
    NONE: 'none',
};

var radio_props = [
    {label: MAP_TYPES.STANDARD, value: MAP_TYPES.STANDARD },
    {label: MAP_TYPES.SATELLITE, value: MAP_TYPES.SATELLITE }
];




export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Options',
  };

    onPress(value) {
        this.setState({value:value});
    }


  render() {
    return (
      <ScrollView style={styles.container}>
        <RadioForm
            radio_props={radio_props}
            initial={0}
            onPress={(value) => {this.onPress(value)}}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
