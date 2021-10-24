import React, {useCallback, useEffect} from "react";

import {
    FlatList,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
    StyleSheet, Button
} from "react-native";
import {observer} from "mobx-react";
import {useStore} from "../../mobx/store";
import GalleryRow from "./GalleryRow";
import BackHandler from "react-native/Libraries/Utilities/BackHandler";
import NetInfo from "@react-native-community/netinfo";

const styles = StyleSheet.create({
    menuButton: {
        position: 'absolute',
        right: 15,
        top: 10,
        zIndex: 100,

        borderWidth: 1,
        borderColor: 'rgba(255,255,0,0.5)',
        backgroundColor: 'rgba(153, 255, 153, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderRadius: 50,
    }
});

const GalleryScreen = (props) => {

    const {galleryStore} = useStore()

    const handleViewableItemsChanged = useCallback(async ({viewableItems}) => {
        await galleryStore.setViewableItems(viewableItems)
    }, [])

    galleryStore.setIsAppInternetReachable(NetInfo.useNetInfo().isInternetReachable)

    useEffect(() => {
        galleryStore.initializeApp()
        galleryStore.setAppImagesSize(imagesWidth)
        galleryStore.getNextPage()

               return () => {
                  galleryStore.saveStateToStorage()
              }

    }, [])


    const exitAppAction = useCallback(() => {
        galleryStore.saveStateToStorage()
        //       BackHandler.exitApp()
    })


    React.useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', exitAppAction)

        return () => {
            backHandler.remove()
        }
    }, []);


    const imagesWidth = Math.max(useWindowDimensions().width, useWindowDimensions().height)

    const galleryByColumn = galleryStore.gallery.reduce((result, el, index) => {
        switch (index % galleryStore.appColumnCount) {
            case 0: {
                return [...result, [el]]
            }
            default: {
                let lastRow = result.pop()
                lastRow.push(el)
                return [...result, lastRow]
            }
        }
    }, [])


    return (
        <View style={{flex: 1}}>
            {/*<Text>{JSON.stringify(galleryStore.viewableItems)}</Text>*/}
            {<Text>{JSON.stringify(galleryStore.isAppInternetReachable)}</Text>}
            {<Text>{JSON.stringify(Object.keys(galleryStore.base64Images).length) + ' base64'}</Text>}
            {<Text>{JSON.stringify(galleryStore.currentPage)}</Text>}
            {<Button title={'saveStateToStorage'} onPress={galleryStore.saveStateToStorage}/>}
            {<Button title={'initializeApp()'} onPress={galleryStore.initializeApp}/>}
            <View style={styles.menuButton}>
                <TouchableOpacity onPress={() => galleryStore.toggleColumnCount()}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: "bold"
                    }}
                    >{galleryStore.appColumnCount}</Text>
                </TouchableOpacity>
            </View>

            {(galleryByColumn.length === 0)
                ? <Text>loading...</Text>
                : (galleryByColumn) &&
                <FlatList
                    data={galleryByColumn}
                    renderItem={({item}) => <GalleryRow key={item.id} row={item} navigation={props.navigation}/>}
                    onEndReached={() => {
                        galleryStore.getNextPage()
                    }}
                    onEndReachedThreshold={0.5}
                    onViewableItemsChanged={handleViewableItemsChanged}

                />}


        </View>
    )

}
export default observer(GalleryScreen)
