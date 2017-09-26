/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Animated, // 动画组件
  Easing // 渐变函数
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ListNews from './news/listnews';
export default class navigatordemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      rotateValue: new Animated.Value(0)
    }
  }

  startAnimation() {
    this.state.rotateValue.setValue(0);
    Animated.timing(this.state.rotateValue, {
      toValue: 1,
      duration: 1200,
      easing: Easing.linear
    }).start(() => this.startAnimation());
  }

  componentDidMount() {
    console.log('componentDidMount--->');
    this.startAnimation();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1115F4'
        }}>
          <TabNavigator>
            <TabNavigator.Item style={{
              backgroundColor: '#bbaa11'
            }} selected={this.state.selectedTab === 'home'} title="tab主页" renderIcon={() => <Image style={{
              width: 24,
              height: 24,
              resizeMode: Image.resizeMode.cover
            }} source={require('./images/home.png')}/>} renderSelectedIcon={() => <Image style={{
              width: 24,
              height: 24,
              resizeMode: Image.resizeMode.cover
            }} source={require('./images/homeslected.png')}/>} badgeText="1" onPress={() => this.setState({selectedTab: 'home'})}>
              <View style={{
                height: '100%',
                flexDirection: 'column'
              }}>

                <ListNews/>
              </View>
            </TabNavigator.Item>

            <TabNavigator.Item style={{
              backgroundColor: '#bbaaee'
            }} selected={this.state.selectedTab === 'profile'} title="tab我的" renderIcon={() => <Image style={{
              width: 24,
              height: 24,
              resizeMode: Image.resizeMode.cover
            }} source={require('./images/mine.png')}/>} renderSelectedIcon={() => <Image style={{
              width: 24,
              height: 24,
              resizeMode: Image.resizeMode.cover
            }} source={require('./images/mineslected.png')}/>} onPress={() => this.setState({selectedTab: 'profile'})}>
              <View style={{
                height: '100%',
                flexDirection: 'column'
              }}></View>
            </TabNavigator.Item>
          </TabNavigator>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#cc1111'
  }
});

AppRegistry.registerComponent('navigatordemo', () => navigatordemo);
