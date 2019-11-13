import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { View } from 'react-native'

class ProgressCircle extends React.Component {
  render() {
    return (
      <View style={{margin: 3.5}}>
        <AnimatedCircularProgress
          size={95}
          width={12}
          fill={(this.props.percent)*100}
          rotation={0}
          lineCap={'round'}
          tintColor={this.props.primaryColor}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor={this.props.secondaryColor} />
      </View>
    );
  }
}

export default ProgressCircle;
