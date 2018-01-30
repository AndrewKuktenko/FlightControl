import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
    Button,
  TouchableOpacity,
  Dimensions,
  View,
} from 'react-native';

import { WebBrowser } from 'expo';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button'
import { BindActionCreators } from 'redux';
import { connect } from 'react-redux';
 
import { MonoText } from '../components/StyledText';

const {width, height} = Dimensions.get('window');

const MAP_TYPES = {
    STANDARD: 'standard',
    SATELLITE: 'satellite',
    HYBRID: 'hybrid',
    TERRAIN: 'terrain',
    NONE: 'none',
};

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;
let markerId = 0;

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Map',
    };

    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: LATITUDE,
                longitude: LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            polylines: [],
            editing: null,
            markers: [],
            mapType: this.props.mapType
        };
    }

    finish() {
        const { polylines, editing } = this.state;
        this.setState({
            polylines: [...polylines, editing],
            editing: null,
        });
    }

    clearPolyline() {
        this.setState({polylines: []});
        this.setState({markers: []});
        this.setState({editing: null});
    }

    onPress(e) {
        
        const { editing } = this.state;
        if (!editing) {
            this.setState({
                editing: {
                    id: id++,
                    coordinates: [e.nativeEvent.coordinate],
                },
                markers: [
                    ...this.state.markers,
                    {
                        coordinate: e.nativeEvent.coordinate,
                        key: `Marker${markerId++}`,
                    },
                ],
            });
        } else {
            this.setState({
                editing: {
                    ...editing,
                    coordinates: [
                        ...editing.coordinates,
                        e.nativeEvent.coordinate,
                    ],
                },
                markers: [
                    ...this.state.markers,
                    {
                        coordinate: e.nativeEvent.coordinate,
                        key: `Marker${markerId++}`,
                    },
                ],
            });
        }
    }


    render() {
        return (
            <View style={styles.container}>
              <MapView
                  mapType={this.props.mapType}
                  provider={this.props.provider}
                  style={styles.map}
                  initialRegion={this.state.region}
                  onPress={e => this.onPress(e)}
              >
                  {this.state.polylines.map(polyline => (
                      <MapView.Polyline
                          key={polyline.id}
                          coordinates={polyline.coordinates}
                          strokeColor="#000"
                          fillColor="rgba(255,0,0,0.5)"
                          strokeWidth={1}
                      />
                  ))
                  }
                  {this.state.markers.map(marker => (
                      <MapView.Marker
                          title={marker.key}
                          key={marker.key}
                          coordinate={marker.coordinate}
                      />
                  ))}
                  {this.state.editing &&

                  <MapView.Polyline
                      key="editingPolyline"
                      coordinates={this.state.editing.coordinates}
                      strokeColor="#F00"
                      fillColor="rgba(255,0,0,0.5)"
                      strokeWidth={1}
                  />
                  }
              </MapView>
              <View style={styles.buttonContainer}>
                  {this.state.editing && (
                      <TouchableOpacity
                          onPress={() => this.finish()}
                          style={[styles.bubble, styles.button]}
                      >
                        <Text>Finish</Text>
                      </TouchableOpacity>
                  )}
                  <TouchableOpacity
                      onPress={() => this.clearPolyline()}
                      style={[styles.bubble, styles.button]}
                  >
                      <Text>Clear</Text>
                  </TouchableOpacity>
              </View>
            </View>
        );
    }
    

};

function mapStateToProps (state) {
    return {
        mapType: state.states.mapType
    }
};

export default connect(mapStateToProps)(HomeScreen);




const styles = StyleSheet.create({
    radio: {
        width: 120,
        paddingHorizontal: 12,
        alignItems: 'flex-start',
        marginHorizontal: 10,
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    latlng: {
        width: 200,
        alignItems: 'stretch',
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
