import { MaterialTopTabScreenProps } from "@react-navigation/material-top-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Animated } from "react-native";
import {CategoryResponse, Club, FeedCreateRequest} from "../api";
import {TopTabParamList} from "./club";

export type RootStackParamList = {
    Search:{};
    ImageSelecter:{
        clubId: number;
        content: string;
        imageUri: string | null;
    };
    Tabs: {};
};

export type ImageSelecterProps = NativeStackScreenProps<
    RootStackParamList,
    "ImageSelecter"
    >;