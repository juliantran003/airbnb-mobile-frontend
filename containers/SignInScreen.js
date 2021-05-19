import React from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

export default function SignInScreen({ setToken }) {
  const axios = require("axios");
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pressHandle = async (event) => {
    event.preventDefault();

    try {
      if (password === "" || email === "") {
        alert("please fill all fields");
      } else {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
      }

      console.log(response.data);
    } catch (error) {
      alert("This user doesn't exist");
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
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/airbnb_logo_small.png")}
          resizeMode="contain"
        />
        <Text style={[styles.textCenter, styles.textGrey24]}>Sign in</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          autoCapitalize="none"
          textContentType="emailAddress"
          style={styles.input}
          placeholder="email"
          onChangeText={(email) => setEmail(email)}
        />

        <TextInput
          autoCapitalize="none"
          style={styles.inputLast}
          textContentType="password"
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={pressHandle}>
          <Text style={[styles.textCenter, styles.textGrey18]}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.textGrey}>No account? Register</Text>
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
    width: 150,
  },
  input: {
    marginBottom: 40,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#FFBAC0",
  },
  inputLast: {
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#FFBAC0",
  },
  inputContainer: { width: "70%" },
  btnContainer: { width: "70%", alignItems: "center" },
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
    fontSize: 24,
    fontWeight: "bold",
  },
  textGrey18: {
    color: "#727272",
    fontSize: 18,
  },
});
