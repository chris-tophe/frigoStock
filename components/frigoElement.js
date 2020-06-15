import React from 'react';
import { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Text } from "react-native-elements";


export default class FrigoElement extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.context.navigation;
    }

    render() {
        let bgColor = "#42A5F5";
        let txtColor = "#E3F2FD";

        let { idFood, nameFood, expireDateFood, nameFoodType, idFoodType } = this.props;

        let today = new Date();
        let expDate = new Date(expireDateFood);
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        let diff = (expDate - today) / _MS_PER_DAY;
        let status;
        if (diff >= 4) {
            status = "OK";
            bgColor = "#42A5F5";
            txtColor = "#E3F2FD";
        }
        else if (diff > 0) {
            status = "SOON";
            bgColor = "#42A5F5";
            txtColor = "#ffff00";

        }
        else if (diff > -1) {
            status = "TODAY";
            bgColor = "#ff9900";
            txtColor = "#ffff00";
            ;
        }
        else if (diff <= -1) {
            status = "EXPIRED";
            bgColor = "#FF3333";
            txtColor = "#FFF0F0";

        }
        else {
            status = "ERROR";
        }

        return (
            <TouchableOpacity style={[
                styles.container,
                { backgroundColor: bgColor, },
            ]}
                onPress={() => {
                    this.navigation.navigate("Détail d'une denrée", { idFood, nameFood, expireDateFood, nameFoodType, idFoodType })
                }}
            >
                <View style={styles.leftCont}>
                    <View style={styles.titleCont}>
                        <Text style={[
                            styles.title,
                            { color: txtColor, },]}
                        >{this.props.nameFood}</Text>
                    </View>
                    <View style={styles.expireCont}>
                        <Text style={[
                            styles.expire,
                            { color: txtColor, },]}
                        >
                            {status == "EXPIRED" && 'Périmé depuis le '}
                            {status == "TODAY" && 'Périme aujoud\'hui le '}
                            {status == "SOON" && 'À consommer avant le '}
                            {status == "OK" && 'Expire le '}
                        </Text>
                        <Text style={[
                            styles.expireDate,
                            { color: txtColor, },]}
                        >{this.props.expireDateFood}</Text>
                    </View>
                </View>
                <View style={styles.rightCont}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                            Alert.alert(
                                'Confirmation',
                                'Voulez vous supprimer ' + this.props.nameFood,
                                [
                                    {
                                        text: 'Cancel',
                                    },
                                    {
                                        text: 'OK', onPress: () => {
                                            let formData = new FormData();
                                            formData.append("idFood", this.props.idFood);
                                            fetch('http://jdevalik.fr/api/lchris/delFoodUser.php', {
                                                method: 'post',
                                                headers: {
                                                    'Content-Type': 'multipart/form-data',
                                                },
                                                body: formData
                                            });
                                            this.props.callback(this.props.context);
                                        }
                                    }
                                ],
                                { cancelable: false }
                            );

                        }}
                        style={styles.TouchableOpacityStyle}
                    >
                        <Image
                            source={require('../assets/outFridge.png')}
                            style={styles.FloatingButtonStyle}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginHorizontal: 5,
        marginVertical: 2,
        borderRadius: 5,
    },
    leftCont: {
        flex: 8,
        flexDirection: "column"
    },
    titleCont: {
        flex: 3,

    },
    title: {
        fontSize: 25,
        padding: 5,
    },
    expireCont: {
        flex: 2,
        flexDirection: "row",
        padding: 5,
    },
    expire: {
        fontSize: 16,
        alignSelf: "flex-end",
        paddingBottom: 2,
    },
    expireDate: {
        fontSize: 22,
        alignSelf: "flex-end",

    },
    rightCont: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    TouchableOpacityStyle: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',

    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
});