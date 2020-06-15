import React from 'react';
import { Component } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { Input, Text, Button } from "react-native-elements";
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ToastAndroid } from 'react-native';


export default class VueAjoutFood extends Component {

    constructor(props) {
        super(props);
        let { idFood, nameFood, idFoodType, expireDateFood, modification } = this.props.route.params;

        this.state = {
            idFood: (idFood != undefined) ? idFood : "",
            nameFood: (nameFood != undefined) ? nameFood : "",
            idFoodType: (idFoodType != undefined) ? idFoodType : "0",
            expireDateFood: (expireDateFood != undefined) ? new Date(expireDateFood) : new Date(),
            foodTypes: [],
            isLoading: true,
            showDatePicker: false,
            modification: (modification != undefined) ? modification : false,
        };
        const { navigation } = this.props;
        this.navigation = navigation;
    }

    componentDidMount() {
        fetch('http://jdevalik.fr/api/lchris/getFoodTypes.php')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ foodTypes: json });
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                this.setState({ isLoading: false });
            });;
    }

    render() {
        const { foodTypes, isLoading, expireDateFood } = this.state;
        const { idUser } = this.props.route.params;

        return (
            <View
                style={styles.container}
                behavior="padding"
            >
                <View
                    style={styles.catCont}
                >
                    <Text style={styles.textCat}>Nom</Text>
                    <Input
                        onChangeText={(text) => { this.setState({ nameFood: text }) }}
                        value={this.state.nameFood}></Input>
                </View>
                <View
                    style={styles.catCont}
                >
                    <View style={styles.datePickerRowCont}>
                        <Text style={styles.textCat}>Date d'expiration</Text>
                        <Button style={styles.datePickerButton} onPress={() => { this.setState({ showDatePicker: true }); }}
                            icon={
                                <Icon
                                    name="calendar"
                                    size={15}
                                    color="white"
                                />}
                        ></Button>
                    </View>
                    <Text style={styles.textDate}>{
                        expireDateFood.getDate()} / {expireDateFood.getMonth() + 1} / {expireDateFood.getFullYear()}
                    </Text>
                    {this.state.showDatePicker && <DateTimePicker
                        testID="dateTimePicker"
                        value={expireDateFood}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            (selectedDate != null) ?
                                this.setState({ expireDateFood: selectedDate, showDatePicker: false })
                                :
                                this.setState({ showDatePicker: false });
                        }}
                    />}
                </View>
                <View
                    style={styles.catCont}
                >
                    <Text style={styles.textCat}>Type de denrée</Text>
                    {isLoading ? <ActivityIndicator /> :
                        (<Picker

                            selectedValue={this.state.idFoodType}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(value) =>
                                this.setState({ idFoodType: value })
                            }>
                            <Picker.Item label="Choisissez" value="0" key={0} />
                            {foodTypes.map((item, index) => {
                                return (< Picker.Item label={item.nameFoodType} value={item.idFoodType} key={index + 1} />);
                            })}
                        </Picker>)
                    }
                </View>
                <View
                    style={styles.butValiderCont}
                >
                    <Button
                        titleStyle={styles.butValiderTitle}
                        title="Enregistrer"
                        onPress={() => {
                            if (this.state.nameFood != "" && this.state.idFoodType != "0") {
                                let formData = new FormData();
                                formData.append("nameFood", this.state.nameFood);
                                formData.append("idFoodType", this.state.idFoodType);
                                formData.append("expireDateFood", `${this.state.expireDateFood.getFullYear()}-${this.state.expireDateFood.getMonth() + 1}-${this.state.expireDateFood.getDate()}`);
                                (this.state.modification) ? formData.append("idFood", this.state.idFood) : formData.append("idUser", idUser);
                                fetch('http://jdevalik.fr/api/lchris/addFoodUser.php', {
                                    method: 'post',
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                    },
                                    body: formData
                                })
                                    .then((response) => {
                                        if (response.status == 201 || response.status == 200) {
                                            this.navigation.navigate("Mon Frigo");
                                        }
                                        else {
                                            ToastAndroid.show("Erreur réseau", ToastAndroid.SHORT);
                                        }
                                    })
                                    .catch((error) => {
                                        console.error(error);
                                    })
                                    .finally(() => {
                                    });
                            } else {
                                if (this.state.nameFood == "") ToastAndroid.show("Veuillez saisir le nom de la denrée", ToastAndroid.SHORT);
                                if (this.state.idFoodType == "0") ToastAndroid.show("Veuillez saisir le type de denrée", ToastAndroid.SHORT);
                            }
                        }}></Button>
                </View>
            </View >
        )
    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFDFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textCat: {
        fontSize: 24,
        color: "#0088FF",
    },
    catCont: {
        marginVertical: 10,
        width: 350,
    },
    butValiderCont: {
        marginVertical: 10,
        width: 250,
        height: 50,
        backgroundColor: "#0088FF",

    },
    butValiderTitle: {
        fontSize: 24,

    },
    textDate: {
        fontSize: 28,
        alignSelf: "center",
    },
    datePickerRowCont: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    datePickerButton: {
        width: 50,
        height: 50
    }
    ,
    textVal: {
        fontSize: 28,
    }

});