import React, { useState, useEffect } from 'react';
import {
    Button,
    Image,
    View,
    Platform,
    Alert,
    ScrollView,
    Text,
    Switch,
    RefreshControl,
    SafeAreaView, Keyboard, TouchableWithoutFeedback, ActivityIndicator, FlatList, Pressable, TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import styled from "styled-components/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";

interface ValueInfo{
    str: string;
    isHT: boolean;
    idxArr: number[];
}

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Wrapper = styled.View`
    flex: 1;
`;

const ImageArea=styled.Button`
  top: 30px;
`

const OptionSelector=styled.View`
`

const MentArea=styled.View`
  flex-direction: row;
  position: relative;
`

const Circle=styled.Image`
  top: 30px;
`

const SectionView = styled.View`
  width: 100%;
  height: 50px;
`;

const TextInPut=styled.TextInput`
  color: black;
  width: 100%;
  height: 70px;
`

const PublicArea=styled.View`
  flex-direction: row;
  height: 40px;
`

const CtgrArea=styled.View`
  flex-direction: row;
`

const AllBtn=styled.View`
  flex: 1;
  flex-direction: row;
  padding: 15px;
  top: 20px;
`

const ButtonArea=styled.View`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
`

const NextButton = styled.TouchableOpacity`
  width: 150px;
  height: 40px;
  background-color: #3a8cc1;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  top: 30px;
`;

const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: white;
`;

export default function ImageSelecter({navigation: {navigate}}) {
    const [image, setImage] = useState(null);
    let [text, onChangeText]=useState("")
    const [selectCategory, setCategory] = useState(null);
    const[displayName, setDisplayName]=useState('');
    const [response, setResponse]=useState(null);
    const Stack = createNativeStackNavigator();
    const [refreshing, setRefreshing] = useState(false);
    const [Home, setHome] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const [data,setData]=useState([]);
    const [isSelect, setSelect] = useState([false, false, false]);

    const getValueInfos = (value: string): ValueInfo[] => {
        if (value.length === 0) {
            return [];
        }
        const splitedArr = value.split(" ");
        let idx = 0;
        const valueInfos: ValueInfo[] = splitedArr.map(str => {
            const idxArr = [idx, idx + str.length - 1];
            idx += str.length + 1;
            return {
                str,
                isHT: str.startsWith("#"),
                idxArr,
            };
        })
        return valueInfos;
    };

    const [title, setTitle] = useState<string>("");
    const valueInfos = getValueInfos(title);

    const getCtrg=async ()=>{
        try{
            setLoading(true);
            const response= await axios.get(
                `http://3.39.190.23:8080/api/clubs`
            );
            setData(response.data.data.values)
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const createPeed=async ()=>{
        try{
            setLoading(true);
            const response= await axios.post(
                `http://3.39.190.23:8080/api/clubs`
            );
            setData(response.data.data.values)
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getCtrg();
    },[]);

    //카테고리 선택
    const [selectedValue, setSelectedValue]=useState('독서');
    const category=["독서","자기개발","음식","봉사","운동","문화생활","게임","창작","여행",
        "경건생활","반려동물","기타"]

    const [postText, setPostText]=useState("")
    const onText=(text: React.SetStateAction<string>)=>setPostText(text);

    const cancleCreate = () =>
        Alert.alert(                    // 말그대로 Alert를 띄운다
            "취소하시겠습니까?",                    // 첫번째 text: 타이틀 제목
            "게시글이 삭제됩니다.",                         // 두번째 text: 그 밑에 작은 제목
            [                              // 버튼 배열
                {
                    text: "아니요",
                    // 버튼 제목  //onPress 이벤트시 콘솔창에 로그를 찍는다
                    style: "cancel"
                },
                { text: "네", onPress: () => navigate("Home")
                }, //버튼 제목
                // 이벤트 발생시 로그를 찍는다

            ],
            { cancelable: false }

        );


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            type: 'multipart/form-data',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            title: 'Pick an image from camera roll'
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            return null;
        }
    };

    const ImageSelector=(id: number)=>{
        return(
            <Pressable
                onPress={() => {
                    setSelect([
                        ...isSelect.slice(0, id),
                        !isSelect[id],
                        ...isSelect.slice(id + 1),
                    ]);
                }}>
                <ImageArea title='Pick an image from camera roll' onPress={pickImage}/>
            </Pressable>
        )
    }

    const createFinish=()=>{
        Alert.alert("등록되었습니다.");
        setRefreshing(true);
        return navigate("Home");

        //홈화면 새로고침 기능 넣기
    }

    /*   const ImagePickerComponent=()=>{
           //권한 요청을 위한 hooks
           const [status, requesetPermission] = ImagePicker.useMediaLibraryPermissions();

           const uploadImage=async ()=>{
               if(!status?.granted){
                   const permission = await requesetPermission();
                   if(!permission.granted){
                       return null;
                   }
               }
           }
       }*/


    const createHomeFeed=async ()=>{
        try{
            setLoading(true);
            const response= await axios.post(
                `http://3.39.190.23:8080/api/clubs`
            );
            setData(response.data.data)
            Alert.alert("등록되었습니다.");
            setRefreshing(true);
            return navigate("Home");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Wrapper>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ImageArea title='Pick an image from camera roll' onPress={pickImage}/>
                        {image && <Circle source={{ uri: image }} style={{ width: 350, height: 300 }}
                        />}
                    </View>
                    <TextInput
                        style={{ color: 'transparent' }}
                        value={""}
                        placeholder="무엇을 할까요?"
                        onChangeText={setTitle}
                    >
                        {valueInfos.map(({ str, isHT, idxArr }, idx) => {
                            const [firstIdx, lastIdx] = idxArr;
                            let value = title.slice(firstIdx, lastIdx + 1)
                            const isLast = idx === valueInfos.length - 1;
                            if (isHT) {
                                return (
                                    <Text style={{color: 'white', backgroundColor: 'blue'}}>
                                        {value}
                                        {!isLast && <Text style={{backgroundColor: 'transparent'}}>{" "}</Text>}
                                    </Text>
                                );
                            }
                            return (
                                <Text style={{ color: 'black' }}>
                                    {value}
                                    {!isLast && <Text>{" "}</Text>}
                                </Text>
                            );
                        })}
                    </TextInput>
                    <OptionSelector>
                        <CtgrArea>
                            {/*<View style={{ flex: 1, padding: 10, width: 2000 }}>
                            {loading ? <ActivityIndicator/> : (
                                    <FlatList
                                        refreshing={refreshing}
                                        //onRefresh={onRefresh}
                                        data={data}
                                        keyExtractor={({ id }, index) => id}
                                        renderItem={({ item }) => (
                                            <>
                                                <Text>{item.name}</Text>
                                            </>
                                        )}
                                    />
                            )}
                        </View>*/}
                            <Text>내 모임</Text>
                            <SelectDropdown
                                data={category}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />

                        </CtgrArea>
                    </OptionSelector>
                    <AllBtn>
                        <ButtonArea>
                            <NextButton
                                onPress={cancleCreate}>
                                <ButtonText>취소하기</ButtonText>
                            </NextButton>
                        </ButtonArea>
                        <ButtonArea>
                            <NextButton
                                onPress={() => {
                                    if(image===null) {
                                        return Alert.alert("이미지를 선택하세요!");
                                    }else if(category===null){
                                        return Alert.alert("카테고리를 선택하세요!");
                                    }
                                    else{
                                        createFinish();
                                    }
                                }}
                            >
                                <ButtonText>공유하기</ButtonText>
                            </NextButton>
                        </ButtonArea>
                    </AllBtn>
                </Wrapper>
            </TouchableWithoutFeedback>
        </Container>
    );
}
