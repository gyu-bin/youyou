import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Pressable
} from 'react-native';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import styled from "styled-components/native";

import SearchHeader from "./SearchPage/SearchHeader";
import IntroduceGroup from '../screens/SearchPage/IntroduceGroup'
import Peed from '../screens/SearchPage/Peed'
import {SearchBar} from "react-native-screens";

const NativeStack = createNativeStackNavigator();
const TopTab = createMaterialTopTabNavigator();
import Icon from 'react-native-vector-icons/Ionicons'
const Wrapper = styled.View`
  flex: 1;
  top: 4%;
`;
const SearchArea=styled.View`
  height: 40px;
  margin: 15px 5px 5px 10px;
  flex-direction: row;
  background-color: lightgrey;
  border-radius: 10px;
`
const SearchText=styled.TextInput`
  font-size: 15px;
  left: 5px;
`

const ClubHome = () => (
    <IntroduceGroup/>
);

const Feed = () => (
    <Peed/>
);

const recentSearch=()=>{

}

const ClubHomeTopTabs=()=>{
    return (
        <Wrapper>
            <SearchArea>
                <Icon name="md-search" size={20} style={{top:10, left:5}}/>
                <SearchText placeholder="검색"/>

            </SearchArea>
        <TopTab.Navigator
            initialRouteName="ClubHome"
            screenOptions={{ swipeEnabled: true
            }}
        >
            <TopTab.Screen
                options={{ title: "모임" }}
                name="ClubHome"
                component={ClubHome}
            />
            <TopTab.Screen
                options={{ title: "피드" }}
                name="Feed"
                component={Feed} />
            <TopTab.Screen
                options={{ title: "태그" }}
                name="Tag"
                component={Feed} />
        </TopTab.Navigator>
            </Wrapper>
    );
}

const Search = () => {
    return (
        <NativeStack.Navigator>
            <NativeStack.Screen
                name="여기다가 어떻게 검색창 넣지"
                component={ClubHomeTopTabs}
                options={{
                    headerShown: false,
                }}
            />
        </NativeStack.Navigator>
    );
};
export default Search;