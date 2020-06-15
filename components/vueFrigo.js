import React from 'react';
import { Component } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Text } from "react-native-elements";
import FrigoElement from "./frigoElement";


export default class VueFrigo extends Component {

    constructor(props) {
        super(props);
        this.state = props.route.params;
        this.state.isLoading = true;
        this.state.noData = false;

        const { navigation } = this.props;
        this.navigation = navigation;
    }

    componentDidMount() {
        this.focusListener = this.navigation.addListener('focus', () => {
            this.fetchData(this);
        })
    }
    componentWillUnmount() {
        this.focusListener();
    }

    fetchData(context) {
        let formData = new FormData;
        formData.append("idUser", context.state.idUser);
        fetch('http://jdevalik.fr/api/lchris/getFoodsUser.php', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
            .then((response) => {
                if (response.status == 200) {
                    return response.json();
                }
                else if (response.status == 404) {
                    context.setState({ noData: true })
                }
            })
            .then((json) => {
                if (json != undefined) {
                    context.setState({ foods: json })
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                context.setState({ isLoading: false });
            });;
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titreCont}>
                    <Text style={styles.title}>Contenu du Frigo de {this.state.nameUser}</Text>
                </View>
                {this.state.isLoading ? <ActivityIndicator /> :
                    this.state.noData ? <Text style={styles.title}>Frigo Vide!</Text> :
                        <FlatList
                            style={styles.flatlist}
                            data={this.state.foods}
                            renderItem={({ item }) => (<FrigoElement {...item} callback={this.fetchData} context={this} />)}
                            keyExtractor={item => item.idFood}
                        />
                }
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        this.navigation.navigate("Ajout d'une denrée", { idUser: this.state.idUser });
                    }}
                    style={styles.TouchableOpacityStyle}
                >
                    <Image
                        source={require('../assets/inFridge.png')}
                        style={styles.FloatingButtonStyle}
                    />
                </TouchableOpacity>

            </View>

        );
    };
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
    flatlist: {
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        right: 60,
        bottom: 60,
        borderRadius: 70,
        backgroundColor: '#ffffff',
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,


    },
});