import React, { Component } from "react";
import { View, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

//database
const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends Component {
  //state initialization
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
      },
      isConnected: null,
    };

    const firebaseConfig = {
      apiKey: "AIzaSyBiSNnCe9EeSrztghaZcjQlKiOM2f5nuVM",
      authDomain: "newchatapp-b5a60.firebaseapp.com",
      projectId: "newchatapp-b5a60",
      storageBucket: "newchatapp-b5a60.appspot.com",
      messagingSenderId: "136702526720",
      appId: "1:136702526720:web:bd77bfd0555d661abfdfe5",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    //reference to messages collection on firebase. Stores/retrieves the chat messages the user sends
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  //whenever something changes in the messages collection, stores the messages and allows the data to be rendered in the view
  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    //go through documents
    querySnapshot.forEach((doc) => {
      //get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
        },
      });
    });

    this.setState({
      messages,
    });
  };

  async getMessages() {
    let messages = "";
    try {
      //getItem() to read the messages in storage takes a key
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        //convert JSON data into object
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async saveMessages() {
    try {
      //setItem() to save the messages
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteMessages() {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.messages);
    }
  }

  componentDidMount() {
    //passes name entered from Start screen to title
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    // to find put user connection status we call fetch()
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });
        console.log("online");
      } else {
        this.setState({
          isConnected: false,
        });
        console.log("offline");
      }
    });

    //if online load message from Firebase, else load messages locally
    if (this.state.isConnected === true) {
      //reference to messages collection from Firebase
      this.referenceChatMessages = firebase.firestore().collection("messages");

      //authenticates user anonymously
      this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          firebase.auth().signInAnonymously();
        }

        this.setState({
          uid: user.uid,
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
    } else {
      this.getMessages();
    }
  }

  componentWillUnmount() {
    if (this.isConnected) {
      this.authUnsubscribe();
      this.unsubscribe();
    }
  }

  //adds messages to collection in firestore database
  addMessages = (message) => {
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: message.user,
    });
  };

  //called user sends a message
  onSend(messages = []) {
    //previousState reference to component's state at the time the change is applied.
    this.setState(
      (previousState) => ({
        //the message user has sent gets appended to state messages so that it displayed in chat.
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        //call addMessage with last message in message state
        if (this.state.isConnected === true) {
          this.addMessages(this.state.messages[0]);
        }

        // storing the messages
        this.saveMessages();
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

  //hide input field when user is offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
    } else {
      return <InputToolbar {...props} />;
    }
  }

  //renders chat interface
  render() {
    const { color, name } = this.props.route.params;

    return (
      <View style={[{ backgroundColor: color }, { flex: 1 }]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
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
