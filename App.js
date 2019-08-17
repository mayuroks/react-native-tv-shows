/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { Provider } from 'react-redux';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import store from './src/store';
import HomeScreen from './src/HomeScreen';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ApplicationProvider
                    mapping={mapping}
                    theme={lightTheme}>
                    <Layout style={{ flex: 1 }} >
                        <HomeScreen />
                    </Layout>
                </ApplicationProvider>
            </Provider>
        );
    }
}
