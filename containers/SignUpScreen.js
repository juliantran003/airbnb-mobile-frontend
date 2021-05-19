import React from "react";
import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";

export default function SignUpScreen({ setToken }) {
  const axios = require("axios");
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [username, setUsername] = useState("");

  const pressHandle = async (event) => {
    event.preventDefault();

    try {
      if (
        password === "" ||
        email === "" ||
        username === "" ||
        description === "" ||
        confirmPassword === ""
      ) {
        alert("please fill all fields");
      } else if (password !== confirmPassword) {
        alert("Passwords must be the same");
      } else {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
          }
        );
        setToken(response.data.token);

        console.log(response.data);
      }

      console.log(response.data);
    } catch (error) {
      if (error.message === "Request failed with status code 400") {
        alert("User already exists");
      }
      console.log(error.message);
    }
  };
  return (
    <KeyboardAwareScrollView
      style={styles.main}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require("../assets/airbnb_logo_small.png")}
          resizeMode="contain"
        />
        <Text style={[styles.textCenter, styles.textGrey24]}>Sign up</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="username"
          onChangeText={(username) => setUsername(username)}
        />
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="email"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />

        <TextInput
          style={styles.description}
          placeholder="Describe yourself in a few words..."
          onChangeText={(description) => setDescription(description)}
        />

        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <TextInput
          autoCapitalize="none"
          style={styles.inputLast}
          placeholder="confirm password"
          secureTextEntry={true}
          onChangeText={(confirmPassword) =>
            setConfirmPassword(confirmPassword)
          }
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={pressHandle}>
          <Text style={[styles.textCenter, styles.textGrey18]}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.textGrey}>Already have an account? Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop:
      Platform.OS === "android"
        ? Constants.statusBarHeight
        : Platform.OS === "ios"
        ? Constants.statusBarHeight
        : 0,
  },

  logo: {
    width: Platform.OS === "android" ? 80 : 120,
    height: Platform.OS === "android" ? 80 : 120,
  },
  logoContainer: {
    marginBottom: 30,
  },
  input: {
    marginBottom: Platform.OS === "android" ? 20 : 40,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#FFBAC0",
  },
  inputLast: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#FFBAC0",
  },
  description: {
    marginBottom: Platform.OS === "android" ? 20 : 40,
    paddingLeft: 5,
    borderWidth: 2,
    borderColor: "#FFBAC0",
    height: "20%",
  },

  inputContainer: { width: "70%", marginTop: 30 },
  btnContainer: { width: "70%", alignItems: "center", marginBottom: 50 },
  btn: {
    padding: 15,
    width: "70%",
    borderColor: "#F9585E",
    borderWidth: 4,
    borderRadius: 50,
    marginBottom: 20,
  },
  textCenter: {
    textAlign: "center",
  },
  textGrey: {
    color: "#727272",
  },
  textGrey24: {
    color: "#727272",
    fontSize: Platform.OS === "android" ? 16 : 20,
    fontWeight: "bold",
  },
  textGrey18: {
    color: "#727272",
    fontSize: 18,
  },
});
