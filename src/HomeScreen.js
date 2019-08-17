import React, { Component } from 'react'
import { Platform, StyleSheet, View, Image, Dimensions, ImageBackground } from 'react-native';
import { Text } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { FlatList } from 'react-native-gesture-handler';

const WINDOW_WIDTH = Dimensions.get('window').width

class HomeScreen extends Component {

    constructor(props) {
        super(props)
    }

    // TODO: replace with real data
    state = {
        data: [],
        images: [
            { title: "Breaking Bad", image: "https://www.thetvdb.com/banners/_cache/fanart/original/81189-1.jpg" },
            { title: "Breaking Bad", image: "https://www.thetvdb.com/banners/_cache/fanart/original/81189-1.jpg" },
            { title: "Breaking Bad", image: "https://www.thetvdb.com/banners/_cache/fanart/original/81189-1.jpg" },
            { title: "Breaking Bad", image: "https://www.thetvdb.com/banners/_cache/fanart/original/81189-1.jpg" },
            { title: "Breaking Bad", image: "https://www.thetvdb.com/banners/_cache/fanart/original/81189-1.jpg" },
        ]
    }

    _keyExtractor = (item, index) => index.toString()

    _renderItem = ({ item }) => {
        const { title, image } = item

        return (
            <ImageBackground source={{ uri: image }} style={styles.largeThumbnail} imageStyle={{ borderRadius: 12 }} >
                <View style={{ position: 'absolute', bottom: 0 }}>
                    < Text category="h4" style={styles.titleText}>{title} </Text>
                </View>
            </ImageBackground >
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text category="h4" style={styles.welcome}>Welcome to Home Screen</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>

                <FlatList
                    data={this.state.images}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor.bind(this)}
                />
            </SafeAreaView>
        )
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    titleText: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginBottom: 10,
        color: 'white'
    },
    largeThumbnail: {
        width: WINDOW_WIDTH - 40,
        height: WINDOW_WIDTH - 40,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 40,
        borderRadius: 12,
        elevation: 4,
        shadowOffset: { height: 4, width: 4 },
        shadowOpacity: 0.8,
        shadowColor: '#424242',
        shadowRadius: 8
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
