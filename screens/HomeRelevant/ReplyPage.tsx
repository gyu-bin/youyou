import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Button,
    TextInput,
    Alert,
    Animated,
    ActivityIndicator, Image
} from 'react-native';
import styled from "styled-components/native";
import {Ionicons} from "@expo/vector-icons";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import axios from 'axios';
import { Dimensions } from 'react-native';
const Container = styled.SafeAreaView`
  flex: 1;
  height: 100%;
  position: absolute;
  width: 100%;
`;

const ReplyContainer=styled.View`
  height: 100%;
`

const LogoImage=styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  left: 10px;
  top: 10px;
`
const ContentMent=styled.View`
  flex: 1;
  flex-direction: row;
`
const MentId=styled.Text`
  color: black;
  font-weight: bold;
  font-size: 15px;
`

const Ment = styled.Text`
  color: black;
  margin-left: 10px;
  width: 200px;
`

const TitleView = styled.SafeAreaView`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
`;

const UnderBar = styled.View`
  border-bottom-color: black;
  border-bottom-width: 1px;
`

const CommentArea = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
  top: 6px;
  margin: 10px 20px 0 20px;
`

const CommentImg=styled.Image`
  width: 46px;
  height: 46px;
  border-radius: 100px;
  flex-grow: 0;
  background-color: #c4c4c4;
`
const CommentId=styled.Text`
  color: black;
  font-size: 12px;
  left: 8px;
  font-weight: bold;
`

const Comment = styled.Text`
  color: black;
  margin-left: 10px;
  width: 200px;
  left: 5px;
  font-size: 12px;
  font-weight: 300;
`

const CommentMent = styled.View`
  flex-direction: row;

`

const CommentRemainder = styled.View`
  flex-direction: row;
`

const Time = styled.Text`
  font-size: 10px;
  font-weight: 300;
  color: #8e8e8e;
  left: 9px;
`

const Like = styled.Text`
  justify-content: flex-start;
`
const FieldInput = styled.TextInput`
  height: 40px;
  border-radius: 5px;
  background-color: #f3f3f3;
  font-size: 15px;
  width: 100%;
`;

const ReplyArea=styled.View`
  display: flex;
  flex-direction: row;
  padding: 10px 0 10px 20px;
  border: solid 0.5px #c4c4c4;
  bottom: 0;
`

const ReplyInput=styled.TextInput`
  color: #b0b0b0;
  left: 15px;
`

const ReplyImg=styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 100px;
`

const ReplyButton=styled.TouchableOpacity`
`
const ReplyDone=styled.Text`
  color: #63abff;
  font-size: 15px;
  font-weight: bold;
  left: 550%;
  width: 30px;
  height: 24px;
  top: 15%;
`
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ReplyPage:React.FC<NativeStackScreenProps<any, "ReplyPage">> = ({
                                                                navigation: { navigate },
                                                            }) =>{
    const [text,onChangeText]=React.useState("");
    const [isPress, setIsPress] = React.useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [Home, setHome] = useState([{}]);
    const [reply, setReply]= useState<String>("");
    const [mainImg, setmainImg] = useState([[{}]]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [heartSelected, setHeartSelected] = useState<boolean>(false);
    const [data,setData]=useState([]);
    const [number, onChangeNumber] = React.useState(null);
    const [news, setNews] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const getHome = () => {
        const result = [];
        for (let i = 0; i < 5; ++i) {
            result.push({
                id: i,
                img:
                    "https://i.pinimg.com/564x/96/a1/11/96a111a649dd6d19fbde7bcbbb692216.jpg",
                name: "?????????",
                content: "",
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

    const getReplyApi=async ()=>{
        try{
            setLoading(true);
            const response= await axios.get(
                // `http://3.39.190.23:8080/api/feeds/1`
                `http://3.39.190.23:8080/api/clubs`
            )
            setData(response.data.data.values)
            console.log(data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        getReplyApi();
    },[]);

    const goToHome = () => {
        navigate("Tabs",{
            screen:"Home"
        })
    }

    return(
        <Container>
            <ReplyContainer>
                {loading ? <ActivityIndicator/> : (
                        <FlatList
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            data={data}
                            keyExtractor={(item, index) => index + ""}
                            renderItem={({ item }) => (
                                <CommentArea>
                                    {/*<CommentImg source={{uri: 'https://i.pinimg.com/564x/13/05/7c/13057c33d7ad3f50ea99bc44b388ebcb.jpg'}}/>*/}
                                    <CommentImg source={{uri:item.thumbnail}}/>
                                    <View style={{marginBottom: 20, top: 7}}>
                                       <CommentMent>
                                            <CommentId>{item.name}</CommentId>
                                            <Comment>{item.creatorName}</Comment>
                                        </CommentMent>
                                        <CommentRemainder>
                                            <Time>{rand(1,60)}??? ???</Time>
                                        </CommentRemainder>
                                    </View>
                                </CommentArea>
                                                )}
                                            />
                                    )}
                <ReplyArea>
                    <ReplyImg
                        source={{uri: 'https://i.pinimg.com/564x/13/05/7c/13057c33d7ad3f50ea99bc44b388ebcb.jpg'}}/>
                    <ReplyInput>
                        ????????? ??????????????????...
                    </ReplyInput>
                    <ReplyButton>
                        <ReplyDone>
                            ??????
                        </ReplyDone>
                    </ReplyButton>
                </ReplyArea>
            </ReplyContainer>
            {/*<FlatList
                data={Home}
                refreshing={refreshing}
                onRefresh={onRefresh}
                keyExtractor={(item, index) => index + ""}
                renderItem={({item})=>(
                    <CommentArea>
                        <View>
                            <CommentMent>
                                <CommentImg source={{uri: 'https://i.pinimg.com/564x/13/05/7c/13057c33d7ad3f50ea99bc44b388ebcb.jpg'}}/>
                                <CommentId>{item.userName}</CommentId>
                                <Comment>123</Comment>
                                <View style={{flexDirection: 'row'}}>
                                    <MentId>{item.userName}</MentId>
                                    <Ment numberOfLines={3} ellipsizeMode={"tail"}>{item.content}</Ment>

                                </View>
                            </CommentMent>
                            <CommentRemainder>
                                <Time>{rand(1,60)}???</Time>
                                <Like>????????? {rand(1,100)} ???</Like>
                                <TouchableOpacity onPress={()=>goToHome(item)}>
                                    <Text>?????? ??????</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setHeartSelected(!heartSelected)}>
                                    {heartSelected ? (
                                        <Ionicons name="md-heart" size={24} color="red" />
                                    ) : (
                                        <Ionicons name="md-heart-outline" size={24} color="red" />
                                    )}
                                </TouchableOpacity>
                            </CommentRemainder>
                        </View>
                    </CommentArea>
                )}
            />*/}
            {/*<FieldInput
                clearButtonMode="always"
                placeholder="??????"
                textAlign="center"
                onChangeText={() => setReply}
                returnKeyType="done"
                returnKeyLabel="done" // for Android
            />*/}
        </Container>

    )
}
export default ReplyPage;