import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, {useEffect, useRef, useState} from 'react';
import {
    ActivityIndicator,
    FlatList,
    View,
    Text,
    TouchableOpacity,
    Button,
    Dimensions,
    TouchableWithoutFeedback, Alert, Animated, Share, Platform
} from 'react-native';
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import Modal from "react-native-modal";
import {StatusBar} from "expo-status-bar";

import Icon from 'react-native-vector-icons/Ionicons'
import {Ionicons} from "@expo/vector-icons";

const Container = styled.SafeAreaView`
  position: relative;
  flex-direction: column;
  height: 100%;
`;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MainArea=styled.View`
  justify-content: space-between;
`

const MainLogo=styled.Text`
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  display: flex;
  height: 55px;
  left: 10px;
`
const PlusFeed=styled.Button`
  color: white;
  margin-left: 200px;
`

const HeaderStyle=styled.View`
  background-color: white;
  height: 400px;
`
const HeaderText=styled.Text`
  flex-direction: row;
  left: 10px;
  height: 56px;
`

const UserId=styled.TouchableOpacity`
  color: black;
  font-weight: bold;
  font-size: 15px;
  margin-left: 20px;
  top: 10px;
`

//ModalStyle
const ModalStyle=styled.Modal`

`

const ImagePrint=styled.Image`
  width: 100%;
  height: 300px;
  justify-content: center;
  align-items: center;
`

const TextArea=styled.View`
  background-color: white;
  flex-direction: row;
  margin-top: 5px;
`
const LogoImage=styled.Image`
  width: 40px;
  height: 40px;
  right: 20px;
  border-radius: 20px;
`

const LikeImg=styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 100px;
  z-index: 1;
`

const LikeMent=styled.Text`
  color: black;
  margin-left: 10px;
`
const BoldText1=styled.TouchableOpacity`
  font-weight: bold;
`
const BoldText2=styled.Text`
  font-weight: bold;
`
const ContentMent=styled.View`
  background-color: white;
  flex-direction: row;
`
const MentId=styled.TouchableOpacity`
  color: black;
  font-weight: bold;
  font-size: 15px;
`

const Ment = styled.Text`
  color: black;
  margin-left: 10px;
  width: 200px;
`

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

const OptionArea = styled.View`
  flex-direction: row;
  position: relative;
`

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

//Img Slider
const ImgView = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ImgItem = styled.View`
  flex-direction: column;
  align-items: center;
`;

const ImgSource = styled.Image`
  width: 390px;
  height: 100%;
  border-radius: 20px;
`;

const ModalBtn=styled.View`
  font-size: 15px;
`

const FloatingButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  bottom: 94%;
  width: 30px;
  height: 30px;
  background-color: white;
  color: black;
  box-shadow: 1px 1px 3px gray;
  border: black solid 1px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  font-size: 10px;
`;
//Number
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const Home:React.FC<NativeStackScreenProps<any, "Home">> = ({
                                                                navigation: { navigate },
                                                            }) => {
    const [text,onChangeText]=React.useState("");
    const [searchQuery, setSearchQuery] = React.useState('');
    const [isPress, setIsPress] = React.useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [Home, setHome] = useState([{}]);
    const [mainImg, setmainImg] = useState([[{}]]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [number, setNumber] = useState(rand(1,100));

    const [change, onChange]=useState(false);

    const [loading, setLoading] = useState(true);
    const [data,setData]=useState();

    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(false);

/*
    //스크롤 애니메이션 start
    const [offset, setOffset] = useState(0);
    const [scrollUp, setScrollUp] = useState(true);

    const onScroll = (event) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        setScrollUp(offset >= currentOffset);
        setOffset(currentOffset);
    };

    const animationRef = useRef(new Animated.Value(0)).current;
    const translateY = animationRef.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
    })

    useEffect(() => {
        Animated.timing(animationRef, {
            toValue: scrollUp ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [scrollUp]);
    // 스크롤 애니메이션 end
*/

    //heart선택
    const [heartSelected, setHeartSelected] = useState<boolean>(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const goToProfile = () => {
        navigate("HomeStack",{
            screen:"Profile"
        })
    }

    const goToContent = () => {
        navigate("HomeStack",{
            screen:"ImageSelecter"
        })
    }

    const goToReply = () => {
        navigate("HomeStack",{
            screen:"ReplyPage"
        })
    }

    const goToModifiy=()=>{
        navigate("HomeStack",{
            screen:"ModifiyPeed"
        })
        setModalVisible(!isModalVisible);
    }

    const CreateFeed=()=>{
        navigate("HomeStack",{
            screen:"CreateHomePeed"
        })
    }

    const goToAccusation=()=>{
        navigate("HomeStack",{
            screen:"Accusation"
        })
        setModalVisible(!isModalVisible);
    }

    const closeModal=()=>{
        setModalVisible(!isModalVisible);
    }

    const deleteCheck = () =>{
        Alert.alert(
            "게시글을 삭제하시겠어요?",
            "30일 이내에 내 활동의 최근 삭제 항목에서 이 게시물을 복원할 수 있습니다." +
            "30일이 지나면 영구 삭제 됩니다. ",
            [
                {
                    text: "아니요",
                    onPress: () => console.log(""),
                    style: "cancel"
                },
                { text: "네", onPress: () => Alert.alert("삭제되었습니다.") },
            ],
            { cancelable: false },
        );
        setModalVisible(!isModalVisible);
    }

    const getHome = () => {
        const result = [];
        for (let i = 0; i < 5; ++i) {
            result.push({
                id: i,
                img:
                    "https://i.pinimg.com/564x/96/a1/11/96a111a649dd6d19fbde7bcbbb692216.jpg",
                name: "문규빈",
                content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
                memberNum: Math.ceil(Math.random() * 10),
            });
        }

        setHome(result);
    };

    const getData = async () => {
        await Promise.all([getHome()]);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await getData();
        setRefreshing(false);
    };


    const onIncrease = () => {
        setNumber(number + 1);
    }

    const onDecrease = () => {
        setNumber(number - 1);
    }

    const onShare = async () => {
        try {
            const result = await Share.share(
                {
                    message: '현재 이 글의 링크가 복사됨.',
                }
            );

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('activityType!');
                } else {
                    console.log('Share!');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('dismissed');
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    const link =
        Platform.OS === 'ios'
            ? 'https://apps.apple.com/us/app/%EB%B3%B4%EB%8B%A5-%EB%82%B4-%EB%B3%B4%ED%97%98%EC%A0%90%EC%88%98-%EC%A7%84%EB%8B%A8-%EC%83%88%EB%8A%94-%EB%B3%B4%ED%97%98%EB%A3%8C-%ED%99%95%EC%9D%B8/id1447862053'
            : 'https://play.google.com/store/apps/details?id=com.mrp.doctor&hl=ko';

    return (
        <Container>
            {/*<StatusBar style="auto"/>*/}
            <Wrapper>
            {/*<Animated.ScrollView onScroll={onScroll} scrollEventThrottle={1} style={{flex: 1, transform: [{translateY:translateY}]}}>*/}
                <MainLogo>
                    {/*<Image style={styles.logo} source={logo}/>*/}
                    <Text style={{
                        color:'black',
                        fontSize: 40,
                        fontWeight: "bold",
                    }}>OnYou</Text>
                </MainLogo>
                <FlatList
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    data={Home}
                    keyExtractor={(item, index) => index + ""}
                    renderItem={(item)=>(
                        <MainArea>
                            <HeaderStyle>
                                <HeaderText>
                                    <LogoImage source={{uri: 'https://i.pinimg.com/564x/79/3b/74/793b74d8d9852e6ac2adeca960debe5d.jpg'}}
                                        style={{left: 20}}
                                    />
                                    <UserId onPress={goToProfile}><Text>Gyubin</Text></UserId>
                                    <View>
                                        {/*<Button title="Show modal" onPress={toggleModal} />*/}
                                        <TouchableOpacity onPress={toggleModal}>
                                            <Icon name="ellipsis-horizontal" size={30} style={{
                                                marginLeft: 200,
                                                color: 'black',
                                                top: 5
                                            }}/>
                                        </TouchableOpacity>
                                        <Modal isVisible={isModalVisible} backdropOpacity={0}
                                               deviceWidth={3000} swipeDirection={['up', 'left', 'right', 'down']}
                                               onBackdropPress={()=>toggleModal()}
                                               style={{backgroundColor: 'white', opacity: 0.8, }}
                                               onSwipeComplete={closeModal}
                                        >
                                            <View>
                                                <Button title="수정" onPress={goToModifiy} />
                                                <Button title="삭제" onPress={deleteCheck} />
                                                <Button title="신고" onPress={goToAccusation} />
                                            </View>
                                        </Modal>
                                    </View>
                                </HeaderText>
                                <>
                                    <Swiper
                                        horizontal
                                        showsButtons
                                        showsPagination
                                        loop={false}
                                        containerStyle={{
                                            width: "100%",
                                        }}
                                    >
                                        {mainImg.map((bundle, index) => {
                                            return (
                                                <ImgView key={index}>
                                                    {bundle.map((item, index) => {
                                                        return (
                                                            <ImgItem key={index}>
                                                                <ImgSource
                                                                    source={{
                                                                        uri: 'https://i.pinimg.com/564x/96/c8/3f/96c83fbf9b5987f24b96d529e9990b19.jpg',
                                                                    }}
                                                                />
                                                                {/*<ImageModal
                                                                    resizeMode="contain"
                                                                    imageBackgroundColor="#000000"
                                                                    style={{
                                                                        width: 250,
                                                                        height: 250,
                                                                    }}
                                                                    source={{
                                                                        uri: 'https://i.pinimg.com/564x/96/c8/3f/96c83fbf9b5987f24b96d529e9990b19.jpg',
                                                                    }}
                                                                />*/}
                                                            </ImgItem>
                                                        );
                                                    })}
                                                </ImgView>
                                            );
                                        })}
                                    </Swiper>
                                </>
                            </HeaderStyle>
                            <OptionArea>
                                <TouchableOpacity onPress={() => setHeartSelected(!heartSelected)}>
                                    {heartSelected ? (
                                        <Ionicons name="md-heart" size={30} color="red" style={{left: 10}}/>
                                    ) : (
                                        <Ionicons name="md-heart-outline" size={30} color="red" style={{left: 10}}/>
                                    )}
                                </TouchableOpacity>
                                <Text style={{left: 10}}>{number}</Text>
                                <TouchableOpacity onPress={goToReply}>
                                    <Icon name="md-chatbox-outline" size={30} style={{
                                        marginLeft: 20,
                                        color: 'black',
                                    }}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>onShare()}>
                                    <Icon name="md-share" size={30} style={{
                                        marginLeft: 20,
                                        color: 'black',
                                    }}/>
                                </TouchableOpacity>
                            </OptionArea>

                            <ContentMent>
                                <MentId onPress={goToProfile}><Text>11Gyubin</Text></MentId>
                                <Ment>123 </Ment>
                            </ContentMent>
                        </MainArea>
                    )}
                />
                <FloatingButton onPress={goToContent}>
                    <Ionicons name="ios-add-sharp" size={28} color="black"
                              style={{}}
                    />
                </FloatingButton>
            {/*</Animated.ScrollView >*/}
            </Wrapper>
        </Container>
    )
}
export default Home;
