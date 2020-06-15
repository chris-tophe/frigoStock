import React from 'react';
import { Component } from "react";
import { StyleSheet, View, ToastAndroid } from 'react-native';
import { Input, Text, Button } from "react-native-elements";


export default class Inscription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            motPass: ""
        };
        const { navigation } = this.props;
        this.navigation = navigation;
    }

    render() {
        return (
            <View
                style={styles.container}
                behavior="height"
            >
                <Text style={styles.textConnexion}>Inscription</Text>
                <Input
                    containerStyle={styles.inputsCont}
                    placeholder="Nom"
                    keyboardType="default"
                    onChangeText={(text) => { this.setState({ name: text }) }}
                    value={this.state.name}
                />
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
                    buttonStyle={styles.butInscriptionCont}
                    title="Inscription"
                    titleStyle={styles.butInscriptionTitle}
                    type="outline"
                    onPress={() => {
                        if (this.state.email != "" && this.state.motPass != "" && this.state.name != "") {
                            let formData = new FormData();
                            formData.append("nameUser", this.state.name);
                            formData.append("emailUser", this.state.email);
                            formData.append("passUser", this.state.motPass);
                            fetch('http://jdevalik.fr/api/lchris/register.php', {
                                method: 'post',
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                },
                                body: formData
                            })
                                .then()
                                .then((respon) => {
                                    if (respon.status == 201) {
                                        ToastAndroid.show("Utilisateur " + this.state.name + " ajouté", ToastAndroid.LONG);
                                        this.navigation.navigate("Acceuil", { email: this.state.email, passWord: this.state.motPass });
                                    }
                                    else if (respon.status = 409) {
                                        ToastAndroid.show("Cet email est déjà utilisé par un utilisateur", ToastAndroid.SHORT);
                                    }
                                    else {
                                        ToastAndroid.show("Erreur de réseau", ToastAndroid.SHORT);
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
                            if (this.state.name == "") ToastAndroid.show("Veuillez saisir votre nom", ToastAndroid.SHORT);
                        }
                    }}
                />


            </View>
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