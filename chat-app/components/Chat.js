import React, { Component } from "react";
import { View, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import "react-native-gesture-handler";

const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: {
        _id: "",
        name: "",
      },
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBiSNnCe9EeSrztghaZcjQlKiOM2f5nuVM",
        authDomain: "newchatapp-b5a60.firebaseapp.com",
        projectId: "newchatapp-b5a60",
        storageBucket: "newchatapp-b5a60.appspot.com",
        messagingSenderId: "136702526720",
        appId: "1:136702526720:web:bd77bfd0555d661abfdfe5",
      });
    }

    //reference to messages collection on firebase.
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    //passes name entered from Start screen to title
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    //referance to messages collection
    this.referenceChatMessages = firebase.firestore().collection("messages");
    this.unsubscribe = this.referenceChatMessages.onSnapshot(
      this.onCollectionUpdate
    );
    //authenticates anonymously
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        messages: [],
        user: {
          _id: user.uid,
          name: name,
        },
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  //stops listening for updates
  componentWillUnmount() {
    this.unsubscribe();
    this.authUnsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages,
    });
  };

  addMessage = (message) => {
    this.referenceChatMessages.add({
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    });
  };

  //appends message to the previous
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.addMessage(this.state.messages[0]);
      }
    );
  }

  //customizes chat bubble colors
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={styles.bubble}
      />
    );
  }

  render() {
    const { color, name } = this.props.route.params;

    return (
      <View style={[{ backgroundColor: color }, styles.container]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: this.state.user._id,
            name: name,
          }}
        />
        {/*fixes keyboard hide message issue on older/smaller Android devices */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bubble: {
    left: {
      backgroundColor: "#FFF",
    },
    right: {
      backgroundColor: "#25D8DF",
    },
  },
});
