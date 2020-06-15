import React from 'react';
import { Component } from "react";
import { StyleSheet, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import { Input, Text, Button } from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';


export default class Acceuil extends Component {


    constructor(props) {
        super(props);

        this.state = {
            email: "",
            motPass: ""
        };
        this.getData();
        const { navigation } = this.props;
        this.navigation = navigation;
    }

    storeData = async () => {
        try {
            await AsyncStorage.setItem('@fgskEmail', this.state.email);
            await AsyncStorage.setItem('@fgskmotPass', this.state.motPass);
        } catch (e) {
            console.error(e);
        }
    }

    getData = async () => {
        try {
            const email = await AsyncStorage.getItem('@fgskEmail');
            const motPass = await AsyncStorage.getItem('@fgskmotPass');
            if (email != null && motPass != null) {
                this.setState({ email: email, motPass: motPass });
            }
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        if (this.props.route.params != undefined) {
            let { email, passWord } = this.props.route.params;
            (email != undefined) ? email = email : email = "";
            (passWord != undefined) ? passWord = passWord : passWord = "";
            this.state.email = email;
            this.state.motPass = passWord;
        }
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="height"
            >
                <Text style={styles.bienvenue}>Bienvenue dans FrigoStock</Text>
                <Text style={styles.textConnexion}>Veuillez vous connecter</Text>
                <Input
                    containerStyle={styles.inputsCont}
                    placeholder="E-Mail"
                    keyboardType="email-address"
                    onChangeText={(text) => { this.setState({ email: text }) }}
                    value={this.state.email}
                />
                <Input
                    containerStyle={styles.inputsCont}
                    placeholder="Mot de passe"
                    keyboardType="default"
                    secureTextEntry={true}
                    onChangeText={(text) => { this.setState({ motPass: text }) }}
                    value={this.state.motPass}
                />
                <Button
                    buttonStyle={styles.butConnexionCont}
                    title="Connexion"
                    titleStyle={styles.butConnexionTitle}
                    type="solid"
                    onPress={() => {
                        if (this.state.email != "" && this.state.motPass != "" && this.state.name != "") {
                            let formData = new FormData();
                            formData.append("emailUser", this.state.email);
                            formData.append("passUser", this.state.motPass);
                            fetch('http://jdevalik.fr/api/lchris/login.php', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                                body: formData
                            })
                                .then((respon) => {
                                    if (respon.status == 200) {
                                        this.storeData();
                                        return respon.json();
                                    }
                                    else if (respon.status == 404) {
                                        ToastAndroid.show("Email ou mot de passe erroné", ToastAndroid.SHORT);
                                    }
                                    else {
                                        ToastAndroid.show("Erreur de réseau", ToastAndroid.SHORT);
                                    }

                                })
                                .then((json) => {
                                    if (json != undefined) {
                                        this.navigation.navigate("Mon Frigo", json);
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                })
                                .finally(() => {
                                });
                        }
                        else {
                            if (this.state.motPass == "") ToastAndroid.show("Veuillez saisir un mot de passe", ToastAndroid.SHORT);
                            if (this.state.email == "") ToastAndroid.show("Veuillez saisir votre email", ToastAndroid.SHORT);
                        }
                    }}
                />
                <Button
                    buttonStyle={styles.butInscriptionCont}
                    title="Inscription"
                    titleStyle={styles.butInscriptionTitle}
                    type="outline"
                    onPress={() => {
                        this.navigation.navigate("Inscription");
                    }}
                />
            </KeyboardAvoidingView >
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bienvenue: {
        fontSize: 30,
        color: "#0088FF",
    },
    textConnexion: {
        fontSize: 24,
        color: "#0088FF",
    },
    inputsCont: {
        marginVertical: 10,
        width: 350,

    },
    butConnexionCont: {
        marginVertical: 10,
        width: 250,
        height: 50,
        backgroundColor: "#0088FF",

    },
    butConnexionTitle: {
        fontSize: 24,

    },
    butInscriptionCont: {
        marginVertical: 5,
        width: 250,
        height: 50,
    },
    butInscriptionTitle: {
        fontSize: 20,
        color: "#0088FF",
    },
    butOubliCont: {
        marginTop: 30,
        width: 250,
        height: 50
    },
    butOubliTitle: {
        fontSize: 15,
        color: "#0088FF",
    },
});