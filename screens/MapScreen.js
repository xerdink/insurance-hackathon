import React from 'react';
import { View, Text } from 'react-native';
import MapViewPre from '../components/map/MapViewPre';
import MapViewPro from '../components/map/MapViewPro';
import { mapConstants } from '../Constants';
import { connect } from 'react-redux'
import { isTicketRegistered } from '../redux/action';

const {
  topHorizontalMargin,
  homeMargin,
  gradientColor,
  screenWidth,
  screenHeight,
  iconSize,
  radiusBorder,
  topMargin,
  gradientColorButton
} = mapConstants;

class MapScreen extends React.Component {

  componentWillMount() {
    console.log(this.props.isRegistered);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.isRegistered === false ?
          <MapViewPre {...this.props} />
          :
          <MapViewPro {...this.props} />
        }
      </View>
    )
  }
}

const styles = {
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: screenHeight / 5.5,
    width: screenWidth,
    borderBottomLeftRadius: 280,
    borderBottomRightRadius: 280,
    borderRadius: 30,
    alignSelf: 'center',
    shadowColor: 'black',
    shadowRadius: 4,
    shadowOffset: { height: 5, width: 0 },
    shadowOpacity: 0.4,
  },
  unpressedContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    left: '8%',
    position: 'absolute',
    top: screenHeight / 6,
    borderColor: 'white',
    borderWidth: 2,
    padding: 5,
    borderRadius: 20
  },
  pressedContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    left: '8%',
    position: 'absolute',
    top: screenHeight / 6,
    borderColor: '#f96e3b',
    borderWidth: 2,
    padding: 5,
    borderRadius: 20
  },
  unpressedRightContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    right: '8%',
    position: 'absolute',
    top: screenHeight / 6,
    borderColor: 'white',
    borderWidth: 2,
    padding: 5,
    borderRadius: 20
  },
  pressedRightContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    right: '8%',
    position: 'absolute',
    top: screenHeight / 6,
    borderColor: '#f96e3b',
    borderWidth: 2,
    padding: 5,
    borderRadius: 20
  },
};

const mapStateToProps = state => {
  return {
    isRegistered: state.reducer.isRegistered
  }
}

export default connect(mapStateToProps, { isTicketRegistered })(MapScreen);
