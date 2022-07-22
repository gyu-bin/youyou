import React, {useEffect, useState} from 'react';
import {
    Alert, Image, ImageBackground,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    useWindowDimensions,
    View
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import styled from "styled-components/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import {ClubApi, ClubCreationRequest} from "../../api";
import {ImageSelecterProps} from "../../types/home";
import {useMutation} from "react-query";
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icon from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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


const ContentArea=styled.TextInput`
  width: 100%;
  height: 20%;
`

const ImagePickerView = styled.View`
  width: 100%;
    height: 50%;
  align-items: center;
`;

const PickBackground=styled.ImageBackground`
  width: 100%;
    height: 100%;
    position: absolute;
`

const ImagePickerButton = styled.TouchableOpacity<{ height: number }>`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #c4c4c4;
`;

const ImageCrop=styled.View`
    background-color: rgba(63, 63, 63, 0.7);
    width: 142px;
    height: 142px;
    border-radius: 100px;
    opacity: 0.5;
    justify-content: center;
    top: 30%;
    left: 30%;
`

const ImagePickerText = styled.Text`
  font-size: 10px;
    color: white;
    text-align: center;
    padding : 50px 0;
`;

const PickedImage = styled.Image<{ height: number }>`
  width: 100%;
  height: 300px;
  border-radius: 10px;
`;

const FeedText=styled.TextInput`
    margin: 13px 15px 15px 30px;
    color: #c0c0c0;
`

const ImageSelecter: React.FC<ImageSelecterProps> = ({
   /* route:{
        params:{
            clubId,
            content ,
            imageUri ,
        },
    },*/
    navigation: { navigate },
    }) => {
    const [images, setImages] = useState<string | null>(null);
    let [text, onChangeText]=useState("사진을 선택하세요")
    const [selectCategory, setCategory] = useState(null);
    const[displayName, setDisplayName]=useState('');
    const Stack = createNativeStackNavigator();
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data,setData]=useState([]);
    const [isSelect, setSelect] = useState([false, false, false]);
    //사진권한 허용
    const [imageURI, setImageURI] = useState<string | null>(true);
    const [status,requestPermission]= ImagePicker.useMediaLibraryPermissions();
    const [showImages, setShowImages] = useState([]);
    let [ alert, alertSet ] = useState(true);

    const getValueInfos = (value: string): ValueInfo[] => {
        if (value.length === 0) {
            return [];
        }
        const splitedArr = value.split(" ");
        let idx = 0;
        return splitedArr.map(str => {
            const idxArr = [idx, idx + str.length - 1];
            idx += str.length + 1;
            return {
                str,
                isHT: str.startsWith("#") || str.startsWith("@"),
                idxArr,
            };
        });
    };

    //컨텐츠
    const [title, setTitle] = useState<string>("");
    const valueInfos = getValueInfos(title);

    const { width: SCREEN_WIDTH } = useWindowDimensions();
    const imageHeight = Math.floor(((SCREEN_WIDTH * 0.8) / 16) * 9);
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

   /* const createPeed=async ()=>{
        try{
            setLoading(true);
            const response= await axios.post(
                `http://localhost:8080/api/feeds`,
            );
            setData(response.data.data)
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }*/

/*    const createPeed = () => {
        const body = new FormData();
        try{
            if (image !== null) {
                body.append("file", image);
            }
            body.append("", JSON.stringify(data));

            return fetch(`http://localhost:8080/api/feeds`, {
                method: "POST",
                headers: {
                    "content-type": "multipart/form-data",
                    authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLsnqXspIDsmqkiLCJzb2NpYWxJZCI6IjIxOTAwMzc4NTAiLCJpZCI6MzQsImV4cCI6MTY1MzQwNTc0NH0.gJEnm383IbZQ2QS0ldY4RNEmxhRb-hTtFSaeqSymIb8rKZyvMEmCCTLm5rSvur-dtTRpVPy-jLzz_dpKL-kXgA",
                    Accept: "application/json",
                },
                body,
            }).then((res) => res.json());
        }catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };*/
/*    const mutation = useMutation(HomeApi.createPeed, {
        onMutate: (data) => {
            console.log("--- Mutate ---");
            console.log(data);
        },
        onSuccess: (data) => {
            console.log("--- Success ---");
            console.log(data);
        },
        onError: (error) => {
            console.log("--- Error ---");
            console.log(error);
        },
        onSettled: (data, error) => {
            console.log("--- Settled ---");
            console.log(data);
            console.log(error);
        },
    });*/

    /*const onSubmit = () => {
      /!*  console.log("clubId1: " + clubId);
        console.log("content: " + content);
        console.log("imageUrl: " + imageUri);*!/

        const data = {
            clubId,
            content,
            imageUri
        };

        const splitedURI = new String(imageUri).split("/");

        const requestData: FeedCreateRequest =
            imageUri === null
                ? {
                    image: null,
                    data,
                }
                : {
                    image: {
                        uri: imageUri,
                        type: "image/jpeg",
                        name: splitedURI[splitedURI.length - 1],
                    },
                    data,
                };

        mutation.mutate(requestData);

        return navigate("Tabs", { screen: "Home" });
    };*/

/*    const createPeed = async () => {
        try {
            const res = await fetch(`http://3.39.190.23:8080/api/clubs`, {
                method: "POST",
                headers: {
                    "content-type": "multipart/form-data",
                    authorization:
                        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLsnqXspIDsmqkiLCJzb2NpYWxJZCI6IjIxOTAwMzc4NTAiLCJpZCI6MzQsImV4cCI6MTY1MzQwNTc0NH0.gJEnm383IbZQ2QS0ldY4RNEmxhRb-hTtFSaeqSymIb8rKZyvMEmCCTLm5rSvur-dtTRpVPy-jLzz_dpKL-kXgA",
                    Accept: "application/json",
                },body: 'feedCreateRequest'
            });
            const resJson = await res.json();
            const newResJson = resJson.data;
            setData(newResJson);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        // getCtrg();
        createPeed();
    },[]);*/

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
        if(!status?.granted){
            const permission=await requestPermission();
            if(!permission.granted){
                return null;
            }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (result.cancelled === false) {
            setImageURI(result.uri);
        }

    };


    const createFinish=()=>{
        Alert.alert("등록되었습니다.");
        setRefreshing(true);
        return navigate("Home");

        //홈화면 새로고침 기능 넣기
    }


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
                    <ImagePickerView>
                        <ImagePickerButton
                            height={imageHeight}
                            onPress={pickImage}
                            activeOpacity={1}
                        >
                            {imageURI ? (
                                // <PickedImage height={imageHeight} source={{ uri: imageURI }} />
                                <PickedImage height={imageHeight} source={{ uri: imageURI }} />
                            ) : (
                                  <PickBackground
                                    source={{uri: 'https://i.pinimg.com/564x/5c/4b/96/5c4b96e7e16aef00a926b6be209a7e3c.jpg'}}>
                                      <ImageCrop>
                                          <MaterialCommunityIcons name="arrow-top-right-bottom-left" size={30} color="red"
                                                                  style={{left: 55 , top:40}} />
                                          <ImagePickerText>손가락을 좌우로{"\n"} 동시에 벌려{"\n"}  이미지 크롭을 해보세요</ImagePickerText>
                                      </ImageCrop>
                                  </PickBackground>
                            )}
                        </ImagePickerButton>
                    </ImagePickerView>
                    <View>
                        <Text>
                            선택된 이미지 영역
                        </Text>
                    </View>    
                        
                    <FeedText
                        // key={"FeedCreateRequest"}
                        placeholder="사진과 함께 남길 게시글을 작성해 보세요."
                        onChangeText={setTitle}
                    >
                        {valueInfos.map(({ str, isHT, idxArr }, idx) => {
                            const [firstIdx, lastIdx] = idxArr;
                            let value = title.slice(firstIdx, lastIdx + 1)
                            const isLast = idx === valueInfos.length - 1;
                            if (isHT) {
                                return (
                                    <Text style={{color: 'skyblue', backgroundColor: 'transparent'}}>
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
                    </FeedText>
                    {/*<OptionSelector>
                        <CtgrArea>
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
                    </OptionSelector>*/}
                    {/*<AllBtn>
                        <ButtonArea>
                            <NextButton
                                onPress={cancleCreate}>
                                <ButtonText>취소하기</ButtonText>
                            </NextButton>
                        </ButtonArea>
                        <ButtonArea>
                            <NextButton
                                onPress={() => {
                                    if(imageURI===null) {
                                        return Alert.alert("이미지를 선택하세요!");
                                    }
                                    else if(title===""){
                                        return Alert.alert("문구를 입력해라");
                                    }
                                    else if(!category){
                                        return Alert.alert("카테고리를 선택하세요!");
                                    }
                                    else{
                                        createFinish();
                                    }
                                    createFinish();
                                }}
                            >
                                <ButtonText>공유하기</ButtonText>
                            </NextButton>
                        </ButtonArea>
                    </AllBtn>*/}

                </Wrapper>
            </TouchableWithoutFeedback>
        </Container>
    );
}

export default ImageSelecter