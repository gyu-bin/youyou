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

import * as Animatable from 'react-native-animatable'
import IntroduceGroup from '../screens/SearchPage/IntroduceGroup'
import Peed from '../screens/SearchPage/Peed'

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

/*const Cancel =Animatable.createAnimatableComponent(styled.TouchableOpacity`
  display: ${({touch})=> touch.length>0? "flex": "none"};
  padding-left: 10px;
`)

const SearchIcon = styled.Image`
  position: absolute;
  left: 19px;
  z-index: ${({touch})=>touch.length>0? -1: 1};
  width: 20px;
  height: 20px;
`
const SearchBar = Animatable.createAnimatableComponent(styled.TextInput`
  width: ${({touch})=>touch.length>0? "80%": "95%"};
  height: 50px;
  border-radius: 10px;
  padding-left: 10px;
  margin: 10px;
  background-color: ${({theme})=>theme.color.White};
`)
const typed={
    0:{
        "width": "95px"
    },
    1:{
        "width": "80%"
    }
}

const btnIn={
    0:{
        animation: false
    },
    1:{
        animation: "slideInRight"
    }
}

const clearInput=()=>{
    searchRef.current.ref.clear();
    setSearchVal('');
    setData('');
}


const searchData = async(text) => {
        try{
            setSearchVal(text)
            const res = await fetch(`http://192.168.0.30:8000/products/search`, {
                method: "POST",
                body: JSON.stringify({
                    "keyword": text
                })
            })
        });
        const resJson = await res.json();
        const newResJson = resJson
        setData(newResJson.products)
    } catch(e){
    console.log("실패")
}

const renderItem=({item})=>{
    return(
        <ResultList onPress={()=>navigatoin.navigate('ProductDetail',{
            productId: item.id
        })}>
          <ResultItem>{item.name}</ResultItem>
        </ResultList>
    )
}
const SearchTestArea=()=>(
    <SearchBarWrap>
        <View
            source={{uri: 'https://webstock review.net/images/search-icon-png-4.png'}}
            touch={searchVal}/>
        <TextInput
            ref={searchRef}
            placeholder="검색어를 입력해 주세요"
            onChangeText={(text) => searchData(text)}
            touch={searchVal}
            animation={searchVal.length > 0 ? typed : false}/>
        <Cancel
            touch={searchVal}
            animation={searchVal.length > 0 ? btnIn: false }
        onPress={() => clearInput()}
        >
        <Text>취소</Text>
        </Cancel>
    </SearchBarWrap>
)*/

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
                options={{title: "모임"}}
                name="ClubHome"
                component={ClubHome}
            />
            <TopTab.Screen
                options={{title: "피드"}}
                name="Feed"
                component={Feed}/>
            <TopTab.Screen
                options={{title: "태그"}}
                name="Tag"
                component={Feed}/>
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