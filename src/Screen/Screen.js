import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { styles } from './styles';

export default class OpenGL extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Screen</Text>
            </View>
        );
    }
}