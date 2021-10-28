import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

const ToggleColumnCount = ({appColumnCount, toggleColumnCount, isAppInternetReachable}) => {

    const styles = StyleSheet.create({
        columnToggleButton: {
            position: 'absolute',
            right: 15,
            top: 10,
            zIndex: 100,

            borderWidth: 1,
            borderColor: 'rgba(180, 180, 180,0.7)',

            backgroundColor: isAppInternetReachable
                ? "rgba(153, 255, 153, 0.7)"
                : "rgba(255, 26, 26, 0.7)",
            alignItems: 'center',
            justifyContent: 'center',
            width: 53,
            height: 53,
            borderRadius: 50,
            elevation: 10,
        }
    })

    return <View style={styles.columnToggleButton}>
        <TouchableOpacity onPress={() => toggleColumnCount()}>
            <Text style={{
                fontSize: 25,
                paddingBottom:1

            }}
            >{appColumnCount}</Text>
        </TouchableOpacity>
    </View>
}
export default ToggleColumnCount
