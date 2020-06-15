import React from 'react';
import { Component } from "react";
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";

export default class VueDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameFood: props.route.params.nameFood,
            expireDateFood: props.route.params.expireDateFood,
            nameFoodType: props.route.params.nameFoodType
        };
        const { navigation } = this.props;
        this.navigation = navigation;

    }

    render() {
        let today = new Date();
        let expDate = new Date(this.state.expireDateFood);
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        let diff = (expDate - today) / _MS_PER_DAY;
        let status;
        let showTextStyle;
        let showContStyle;
        if (diff >= 4) {
            status = "OK";
            showTextStyle = styles.dateTextStyle;
            showContStyle = styles.dateContainerStyle;
        }
        else if (diff > 0) {
            status = "SOON";
            showTextStyle = styles.dateTextSoonStyle;
            showContStyle = styles.dateContainerSoonStyle;
        }
        else if (diff > -1) {
            status = "TODAY";
            showTextStyle = styles.dateTextSoonStyle;
            showContStyle = styles.dateContainerSoonStyle;
        }
        else if (diff <= -1) {
            status = "EXPIRED";
            showTextStyle = styles.dateTextLateStyle;
            showContStyle = styles.dateContainerLateStyle;
        }
        else {
            status = "ERROR";
            showTextStyle = styles.dateTextStyle;
            showContStyle = styles.dateContainerStyle;
        }
        console.log(`today: ${today}\nexpdate: ${expDate}\ndiff: ${diff}\nStatus: ${status}\nColor: ${showTextStyle.color}`);
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding">
                <View style={styles.rowOne}>
                    <View style={styles.nameCont}>
                        <Text
                            style={styles.nameTextStyle}
                        >{this.state.nameFood}</Text>
                    </View>
                    <View style={styles.imageCont}>
                        <Image
                            source={require('../assets/defaultFoodImage.jpg')}
                            resizeMode="center"
                            style={styles.imageStyle}
                        >
                        </Image>
                    </View>
                </View>
                <Button
                    title="Modifier"
                    onPress={() => {
                        this.navigation.navigate("Ajout d'une denrée", { ...this.props.route.params, modification: true })
                    }}
                />
                <View style={styles.rowTwo}>
                    <Text style={showTextStyle}>
                        Date de Péremption:
                    </Text>
                    <View style={showContStyle}>
                        <Text style={showTextStyle}>
                            {this.state.expireDateFood}
                        </Text>
                    </View>
                    <Text style={showTextStyle}>
                        {status == "EXPIRED" && 'Denrée périmée !'}
                        {status == "TODAY" && 'À consommer aujourd\'hui'}
                        {status == "SOON" && 'À consommer rapidement !'}
                    </Text>
                </View>

            </KeyboardAvoidingView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#90CAF9',
        flexDirection: "column",
    },
    titreCont: {
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        padding: 5,
        color: "#FFFFEE"
    },
    rowOne: {
        flex: 2,
        flexDirection: "row",
    },
    nameCont: {
        flex: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    nameTextStyle: {
        fontSize: 40,
        padding: 5,
        color: "#FFFFEE",

    },
    imageCont: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center"
    },
    imageStyle: {
        width: 150,
        height: 150
    },
    rowTwo: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        padding: 5
    },
    dateContainerStyle: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#0000FF"
    },
    dateTextStyle: {
        fontSize: 30,
        padding: 5,
        color: "#009900",
    },
    dateContainerSoonStyle: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#ffff00",
        backgroundColor: "#ff9900"
    },
    dateTextSoonStyle: {
        fontSize: 30,
        padding: 5,
        color: "#FFff00",
    },
    dateContainerLateStyle: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#FF0000",
        backgroundColor: "#FF3333"
    },
    dateTextLateStyle: {
        fontSize: 30,
        padding: 5,
        color: "#FFF0F0",
    }
}
);