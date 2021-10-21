import React from "react";
import {Image, TouchableOpacity, useWindowDimensions, View} from "react-native";
import {inject} from "mobx-react";
import {marginHorizontal, marginVertical} from "../common/const"
import likePicture from '../images/DetailedImage/like.png'
import messagePicture from '../images/DetailedImage/message.png'
import addPicture from '../images/DetailedImage/add.png'
import add2Picture from '../images/DetailedImage/add2.png'
import etcPicture from '../images/DetailedImage/etc.png'
import {calcImageDimensions} from "../common/funcions"


const DetailedImage = (props) => {
    const actionsPictures = [likePicture, messagePicture, addPicture, add2Picture, etcPicture]

    const photo = props.galleryStore.detailPhoto

    const photoDimensions = calcImageDimensions(useWindowDimensions().width,photo.height / photo.width)

    const openLargeImage = () => {
        //navigation.navigate('DetailedImage')
    };

    return <View style={{
        marginHorizontal: marginHorizontal,
        marginVertical: marginVertical
    }}>
        <TouchableOpacity activeOpacity={.5} onPress={() => openLargeImage()}>
            <Image
                style={{
                    width: photoDimensions.width,
                    height: photoDimensions.height
                }}
                source={{
                    uri: `https://picsum.photos/id/${photo.id}/${photoDimensions.width}/${photoDimensions.height}.webp`
                }}/>
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
            {actionsPictures.map((el, index) => <Image key={index}
                                                       style={{
                                                           width: 30,
                                                           height: 30,
                                                           marginLeft: 15
                                                       }}
                                                       source={el}/>)}

        </View>

    </View>
}

export default inject("galleryStore")(DetailedImage)
