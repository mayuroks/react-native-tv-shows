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
import { Text, Button, Toggle } from 'react-native-ui-kitten'
import { SafeAreaView } from 'react-navigation'
import { FlatList } from 'react-native-gesture-handler';
import { stylesGen, LIGHT_THEME, DARK_THEME } from './styles'
import { data } from './dummyData'

const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

class HomeScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            data: data,
            activeImage: null,
            showCloseIcon: false,
            isModalVisible: false,
            darkMode: false,
            styles: stylesGen(LIGHT_THEME)
        }
    }

    _toggleTheme = (dark = false) => {
        console.log("method called");
        let theme = dark ? DARK_THEME : LIGHT_THEME
        let newStyles = stylesGen(theme)
        this.setState({ styles: newStyles })
    }

    componentWillMount() {
        this.allImagesRefs = {}
        this.oldPosition = {}
        this.position = new Animated.ValueXY()
        this.dimensions = new Animated.ValueXY()
    }

    _renderEpisodeItem = ({ item, index }) => {
        const { styles } = this.state
        const { title, imageUrl } = item

        return (
            <View style={{ flexDirection: 'row', marginBottom: 10 }} >
                <Image style={styles.episodeImage} source={{ uri: imageUrl }} />

                <View style={{ marginLeft: 20, flexDirection: 'column' }}>
                    <Text style={styles.episodeTitle} category="h6">{title}</Text>
                    <View style={styles.ratingContainer}>
                        <Image
                            style={styles.ratingIcon}
                            source={require('./img/star.png')}></Image>
                        <Text style={styles.ratingText} category="s2">9.3</Text>
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.pricingText} category="s1">$9.87</Text>
                    <Button
                        status="white"
                        size="tiny"
                        style={styles.playButton}
                        icon={(style) => {
                            return <Image
                                style={{ height: 12, width: 12 }}
                                source={require('./img/media-play.png')}></Image>
                        }}
                    >
                    </Button>
                </View>
            </View>
        )
    }

    _showModal() {
        const { styles } = this.state

        return (
            <View style={{ flex: 1 }}>
                <Modal
                    backdropOpacity={0.2}
                    style={{ margin: 0, justifyContent: 'flex-end' }}
                    isVisible={this.state.isModalVisible}
                    deviceHeight={WINDOW_HEIGHT / 2}
                    deviceWidth={WINDOW_WIDTH}
                >
                    <View style={styles.episodesModal}>
                        <View style={styles.episodesContainer}>
                            <View style={styles.episodesHeader}>
                                <Text style={styles.headerText} category="h4">Season 1</Text>
                                {this._showCloseIcon()}
                            </View>
                            <FlatList
                                data={this.state.data}
                                keyExtractor={this._keyExtractor}
                                renderItem={this._renderEpisodeItem}
                                showsVerticalScrollIndicator={false}
                            />
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

            const img = this.state.data[index]
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
        const { styles } = this.state

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
        const { styles } = this.state

        if (this.state.showCloseIcon) {
            return (
                <TouchableWithoutFeedback onPress={this._closeImage}>
                    <Image
                        style={styles.closeIcon}
                        source={require('./img/delete-button.png')} />
                </TouchableWithoutFeedback>
            )
        } else {
            return null
        }
    }

    render() {
        // These params are manipulated by Animation Value
        const activeImageStyle = {
            width: this.dimensions.x,
            height: this.dimensions.y,
            left: this.position.x,
            top: this.position.y
        }
        const { styles } = this.state

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header} >
                    <Text style={styles.headerText} category="h4">Dark mode</Text>
                    <Toggle
                        style={{ alignSelf: 'center' }}
                        status="success"
                        checked={this.state.darkMode}
                        onChange={(checked) => {
                            this.setState({ darkMode: checked })
                            this._toggleTheme(checked)
                        }}
                    >
                    </Toggle>
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem.bind(this)}
                    keyExtractor={this._keyExtractor.bind(this)}
                    showsVerticalScrollIndicator={false}
                />
                <View
                    style={StyleSheet.absoluteFill}
                    pointerEvents={this.state.activeImage ? 'auto' : 'none'}
                >
                    <View
                        style={{ flex: 2, marginBottom: 80 }}
                        ref={view => (this.viewImage = view)}>
                        <Animated.Image
                            style={[styles.seriesCardImage, activeImageStyle]}
                            source={{
                                uri: this.state.activeImage ?
                                    this.state.activeImage.imageUrl : null
                            }}
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
