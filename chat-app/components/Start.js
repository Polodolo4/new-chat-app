import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", color: "#090C08" };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/BackgroundImage.png")}
          style={styles.image}
        >
          <Text style={styles.title}>Welcome to ChatApp!</Text>
          <View style={styles.square}>
            <TextInput
              style={styles.username}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="Enter Your Username"
            />
            <View style={styles.colorWrap}>
              <Text style={styles.colorText}>Choose Background Color:</Text>
              <View style={styles.colorChoice}>
                <Pressable
                  //if pressed, border is red, if not its white
                  style={({ pressed }) => [
                    {
                      borderColor: pressed ? "#8B0000" : "#FFF",
                    },
                    styles.colors,
                    styles.black,
                  ]}
                  //sets background color for chat screen to this color (black)
                  onPress={() => this.setState({ color: "#090C08" })}
                  //extends the "touchable" range beyond rendered dimensions
                  hitSlop={{ top: 22, bottom: 22, left: 15, right: 10 }}
                />
                <Pressable
                  style={({ pressed }) => [
                    {
                      borderColor: pressed ? "#8B0000" : "#FFF",
                    },
                    styles.colors,
                    styles.violet,
                  ]}
                  onPress={() => this.setState({ color: "#474056" })}
                  hitSlop={{ top: 22, bottom: 22, left: 10, right: 10 }}
                />
                <Pressable
                  style={({ pressed }) => [
                    {
                      borderColor: pressed ? "#8B0000" : "#FFF",
                    },
                    styles.colors,
                    styles.lightGray,
                  ]}
                  onPress={() => this.setState({ color: "#8A95A5" })}
                  hitSlop={{ top: 22, bottom: 22, left: 10, right: 10 }}
                />
                <Pressable
                  style={({ pressed }) => [
                    {
                      borderColor: pressed ? "#8B0000" : "#FFF",
                    },
                    styles.colors,
                    styles.grayGreen,
                  ]}
                  onPress={() => this.setState({ color: "#B9C6AE" })}
                  hitSlop={{ top: 22, bottom: 22, left: 10, right: 15 }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.button}
              title="Go to Chat!"
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  color: this.state.color,
                })
              }
            >
              <Text style={styles.buttonText}>Go to Chat!</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#757083",
    width: "88%",
    height: 50,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 70,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "300",
  },
  title: {
    fontSize: 45,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginTop: 60,
  },
  username: {
    borderColor: "#808080",
    borderWidth: 1,
    borderRadius: 2,
    height: 50,
    width: "88%",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 50,
    textAlign: "center",
    marginTop: 35,
  },
  colorWrap: {
    width: "88%",
    height: 40,
    alignItems: "center",
    marginTop: 25,
  },
  colorText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
    marginBottom: 15,
  },
  colorChoice: {
    width: "88%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  colors: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
  },
  black: {
    backgroundColor: "#090C08",
  },
  violet: {
    backgroundColor: "#474056",
  },
  lightGray: {
    backgroundColor: "#8A95A5",
  },
  grayGreen: {
    backgroundColor: "#B9C6AE",
  },
  square: {
    backgroundColor: "#fff",
    width: "88%",
    height: "44%",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 160,
  },
});
