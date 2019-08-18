
import { StyleSheet, Dimensions } from 'react-native'
const WINDOW_WIDTH = Dimensions.get('window').width
const WINDOW_HEIGHT = Dimensions.get('window').height

const LIGHT_THEME = {
    containerBGColor: '#F5FCFF',
    shadowColor: '#424242',
    playButtonBGColor: '#E0E0E0',
    closeIconTintColor: '#9E9E9E',
    textColor: 'black',
    episodesContainerBGColor: 'white'
}

const DARK_THEME = {
    containerBGColor: '#212121',
    shadowColor: '#F5FCFF',
    playButtonBGColor: '#E0E0E0',
    closeIconTintColor: '#E0E0E0',
    textColor: '#E0E0E0',
    episodesContainerBGColor: '#212121'
}

let theme = LIGHT_THEME

function stylesGen(theme) {
    console.log("theme", theme);
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.containerBGColor
        },
        header: {
            margin: 20,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        headerText: {
            alignSelf: 'center',
            color: theme.textColor
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
            marginBottom: 20,
            marginTop: 10,
            borderRadius: 12,
        },
        largeThumbnail: {
            width: WINDOW_WIDTH - 40,
            height: WINDOW_WIDTH - 40,
            elevation: 4,
            shadowOffset: { height: 4, width: 4 },
            shadowOpacity: 0.8,
            shadowColor: theme.shadowColor,
            shadowRadius: 8
        },
        closeIcon: {
            alignSelf: 'center',
            height: 24,
            width: 24,
            tintColor: theme.closeIconTintColor
        },
        seriesCardImage: {
            top: 0, left: 0,
            height: null, width: null,
            resizeMode: 'cover'
        },
        playButton: {
            backgroundColor: theme.playButtonBGColor,
            borderRadius: 30,
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: 60
        },
        episodeImage: {
            height: 100,
            width: 100,
            borderRadius: 12,
            shadowOffset: { height: 4, width: 4 },
            shadowOpacity: 0.8,
            shadowColor: theme.shadowColor,
            shadowRadius: 8
        },
        ratingContainer: {
            marginTop: 8,
            position: 'absolute',
            bottom: 8,
            flexDirection: 'row'
        },
        ratingIcon: {
            height: 14,
            width: 14,
            alignSelf: 'center'
        },
        ratingText: {
            alignSelf: 'center',
            marginLeft: 8,
            color: theme.textColor
        },
        pricingText: {
            position: 'absolute',
            right: 12,
            marginTop: 16,
            color: theme.textColor
        },
        episodesModal: {
            height: WINDOW_HEIGHT / 1.8,
            backgroundColor: theme.episodesContainerBGColor,
            borderRadius: 24
        },
        episodesHeader: {
            flexDirection: 'row',
            marginBottom: 25,
            justifyContent: 'space-between'
        },
        episodesContainer: {
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20
        },
        episodeTitle: {
            marginTop: 8,
            color: theme.textColor
        }
    });
}

export { stylesGen, LIGHT_THEME, DARK_THEME }