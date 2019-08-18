import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    ImageBackground,
    TouchableWithoutFeedback,
    Animated,
    Image
} from 'react-native';
import Modal from 'react-native-modal'
import { Text, Button } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { FlatList } from 'react-native-gesture-handler';

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
        activeImage: null,
        showCloseIcon: false,
        isModalVisible: false
    }

    componentWillMount() {
        this.allImagesRefs = {}
        this.oldPosition = {}
        this.position = new Animated.ValueXY()
        this.dimensions = new Animated.ValueXY()
    }

    _renderEpisodeItem = ({ item, index }) => {
        const { title, imageUrl } = item

        return (
            <View style={{ flexDirection: 'row', marginBottom: 10, backgroundColor: 'yellow' }} >
                <Image style={{ height: 100, width: 100, borderRadius: 12 }} source={{ uri: imageUrl }} />
                <View
                    style={{ marginLeft: 20, flexDirection: 'column', backgroundColor: 'blue' }}
                >
                    <Text
                        style={{ marginTop: 8 }}
                        category="h6"
                    >
                        {title}
                    </Text>
                    <Text
                        style={{ marginTop: 8, position: 'absolute', bottom: 8, backgroundColor: 'red' }}
                        category="h7"
                    >
                        ⭐  9.3
                    </Text>
                </View>
                <View
                    style={{ flex: 1, backgroundColor: 'grey' }}
                >
                    <Text
                        style={{ position: 'absolute', right: 0, marginTop: 16 }}
                        category="h7">$9.87</Text>
                    <Button
                        status="white"
                        size="tiny"
                        style={{ backgroundColor: '#E0E0E0', borderRadius: 30, position: 'absolute', right: 0, bottom: 0, width: 60 }}
                        icon={(style) => {
                            return <Image
                                style={{ height: 16, width: 16 }}
                                tintColor="#424242"
                                source={require('./img/media-play.png')}></Image>
                        }}
                    >
                    </Button>
                </View>
            </View>
        )
    }

    _showModal() {
        console.log("modal shown", this.state.isModalVisible);

        return (
            <View style={{ flex: 1 }}>
                <Modal
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    isVisible={this.state.isModalVisible}
                    deviceHeight={WINDOW_HEIGHT / 2}
                    deviceWidth={WINDOW_WIDTH}
                >
                    <View style={{ height: WINDOW_HEIGHT / 1.8, backgroundColor: 'white' }}>
                        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
                            <Text style={{ marginBottom: 25 }} category="h4">Season 1 Episodes</Text>
                            <FlatList
                                data={this.state.images}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderEpisodeItem}
                            />
                            {this._showCloseIcon()}
                        </View>
                    </View>
                </Modal>
            </View>
        )
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
            }, () => {
                this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
                    Animated.parallel([
                        Animated.timing(this.position.x, {
                            toValue: dPageX,
                            duration: 300
                        }),
                        Animated.timing(this.position.y, {
                            toValue: dPageY,
                            duration: 300
                        }),
                        Animated.timing(this.dimensions.x, {
                            toValue: dWidth,
                            duration: 300
                        }),
                        Animated.timing(this.dimensions.y, {
                            toValue: dHeight,
                            duration: 300
                        })
                    ]).start(() => {
                        this.setState({ showCloseIcon: true })
                        this.setState({ isModalVisible: true })
                    })
                })
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

    _closeImage = () => {
        this.setState({ showCloseIcon: false })
        this.setState({ isModalVisible: false })
        Animated.parallel([
            Animated.timing(this.position.x, {
                toValue: this.oldPosition.x,
                duration: 300
            }),
            Animated.timing(this.position.y, {
                toValue: this.oldPosition.y,
                duration: 300
            }),
            Animated.timing(this.dimensions.x, {
                toValue: this.oldPosition.width,
                duration: 300
            }),
            Animated.timing(this.dimensions.y, {
                toValue: this.oldPosition.height,
                duration: 300
            })
        ]).start(() => {
            this.setState({ activeImage: null })
        })
    }

    _showCloseIcon() {
        if (this.state.showCloseIcon) {
            return <TouchableWithoutFeedback
                onPress={this._closeImage}
            >
                <Image
                    style={styles.closeIcon}
                    source={require('./img/cancel.png')} />
            </TouchableWithoutFeedback>
        } else {
            return null
        }
    }

    render() {
        // These params are manipulated by Animation
        const activeImageStyle = {
            width: this.dimensions.x,
            height: this.dimensions.y,
            left: this.position.x,
            top: this.position.y
        }

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.images}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor.bind(this)}
                />
                <View
                    style={StyleSheet.absoluteFill}
                    pointerEvents={this.state.activeImage ? 'auto' : 'none'}
                >
                    <View
                        style={{ flex: 2, marginBottom: 80 }}
                        ref={view => (this.viewImage = view)}>
                        <Animated.Image
                            style={[{ top: 0, left: 0, height: null, width: null, resizeMode: 'cover' }, activeImageStyle]}
                            source={{ uri: this.state.activeImage ? this.state.activeImage.imageUrl : null }}
                        >
                        </Animated.Image>

                    </View>
                </View>
                {this._showModal()}
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
    closeIcon: {
        position: 'absolute',
        right: 20,
        top: 20,
        height: 32,
        width: 32,
        tintColor: 'red'
    }
});
