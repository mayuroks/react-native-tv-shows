import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    TouchableWithoutFeedback,
    Animated
} from 'react-native';
import { Text } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

class HomeScreen extends Component {

    constructor(props) {
        super(props)
    }

    // TODO: replace with real data
    state = {
        data: [],
        images: [
            { title: "Breaking Bad", imageUrl: "https://www.thetvdb.com/banners/_cache/fanart/original/81189-1.jpg" },
            { title: "Breaking Bad", imageUrl: "https://www.thetvdb.com/banners/_cache/fanart/original/81189-1.jpg" },
            { title: "Breaking Bad", imageUrl: "https://www.thetvdb.com/banners/_cache/fanart/original/81189-1.jpg" },
            { title: "Breaking Bad", imageUrl: "https://www.thetvdb.com/banners/_cache/fanart/original/81189-1.jpg" },
            { title: "Breaking Bad", imageUrl: "https://www.thetvdb.com/banners/_cache/fanart/original/81189-1.jpg" },
        ],
        activeImage: null
    }

    componentWillMount() {
        this.allImagesRefs = {}
        this.oldPosition = {}
        this.position = new Animated.ValueXY()
        this.dimensions = new Animated.ValueXY()
    }


    _openImage = (index) => {
        const ref = this.allImagesRefs[index]
        ref.measure((x, y, width, height, pageX, pageY) => {
            this.oldPosition.x = pageX
            this.oldPosition.y = pageY
            this.oldPosition.width = width
            this.oldPosition.height = height

            this.position.setValue({
                x: pageX,
                y: pageY
            })

            this.dimensions.setValue({
                x: width,
                y: height
            })

            const img = this.state.images[index]
            this.setState({
                activeImage: img
            })
        })
    }

    _keyExtractor = (item, index) => index.toString()

    _renderItem = ({ item, index }) => {
        const { title, imageUrl } = item

        return (
            <TouchableWithoutFeedback
                onPress={() => this._openImage(index)}
                key={index}>
                <Animated.View style={styles.imageContainer}>
                    <View
                        ref={imgRef => (this.allImagesRefs[index] = imgRef)}>
                        <ImageBackground
                            source={{ uri: imageUrl }}
                            style={styles.largeThumbnail}
                            imageStyle={{ borderRadius: 12 }}>
                            <View style={{ position: 'absolute', bottom: 0 }}>
                                <Text category="h4" style={styles.titleText}>{title} </Text>
                            </View>
                        </ImageBackground >
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        const activeImageStyle = {
            width: this.dimensions.x,
            height: this.dimensions.y,
            left: this.position.x,
            top: this.position.y
        }

        return (
            <SafeAreaView style={styles.container}>
                <Text category="h4" style={styles.welcome}>Welcome to Home Screen</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>

                <FlatList
                    data={this.state.images}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor.bind(this)}
                />
                <View
                    style={StyleSheet.absoluteFill}
                    pointerEvents={this.state.activeImage ? 'auto' : 'none'}
                >
                    <View style={{ flex: 2 }}>
                        <Animated.Image
                            style={[{ top: 0, left: 0, height: WINDOW_HEIGHT - 100, width: WINDOW_WIDTH - 40, resizeMode: 'cover' }, activeImageStyle]}
                            source={{ uri: this.state.activeImage ? this.state.activeImage.imageUrl : null }}
                        >
                        </Animated.Image>
                    </View>
                </View>
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
    imageContainer: {
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 40,
        borderRadius: 12,
    },
    largeThumbnail: {
        width: WINDOW_WIDTH - 40,
        height: WINDOW_WIDTH - 40,
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
