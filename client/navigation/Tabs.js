import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import Svg, {Path} from 'react-native-svg';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {Home, Chat, Setting} from '../screens';

import {COLORS, icons} from '../constants';

const Tab = createBottomTabNavigator();

const CustomTabBar = (props) => {
  
    if (isIphoneX()) {
        return (
            <View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white
                    }}
                ></View>
                <BottomTabBar
                    {...props.props}
                />
            </View>
        )
    } else {
        return (
            <BottomTabBar
                {...props.props}
            />
        )
    }

}

const Tabs = ({route, navigation}) => {

  const userId = route.params.userId;
  
    return (
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            borderTopWidth: 0,
            backgroundColor: 'white',
            elevation: 0,
          },
        }}
        tabBar={props => <CustomTabBar props={props} />}>
        <Tab.Screen
          name="Home"
          component={Home}
          initialParams={{userId: userId}}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={icons.user}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.secondary,
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={Chat}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={icons.user}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.secondary,
                }}
              />
            ),
        }}
        />
        <Tab.Screen
          name="Like"
          component={Setting}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                source={icons.user}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : COLORS.secondary,
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

export default Tabs
