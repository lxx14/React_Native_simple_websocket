import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';

import { styles } from './styles';

export default class Screen extends Component {

    constructor(props) {
        super(props);
        this.websocket = null;
        this.wsUrl = 'wss://informer.finversia.ru/wss/Server.ashx?subscriber=true/';
        this.state = {
            textConnection: '',
        }
    }


    componentDidMount = async () => {
        try {
            this.websocket = await new WebSocket(this.wsUrl);
            console.log('this.websocket', this.websocket);

            this.websocket.onopen = () => {
                this.setState({ textConnection: 'connected to WS' })
            }

        } catch (error) {

        }

    }

    onMessageWs = () => {
        this.websocket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data)
        }

        this.setState({ textConnection: 'recieveing data from server' })
    }

    onCloseConnection = () => {
        this.websocket.close();
        this.websocket.onclose = (e) => {
            console.log("WebSocket is closed now.", this.websocket);
        };
        this.setState({ textConnection: 'connection is closed' })
    }

    render() {
        const { textConnection } = this.state;

        return (
            <View style={styles.container}>
                <Text>Status: {textConnection}</Text>
                <Text>------------------------------</Text>
                <TouchableWithoutFeedback onPress={this.onMessageWs}>
                    <Text>start resieve data from server</Text>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.onCloseConnection}>
                    <Text>close connection</Text>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}