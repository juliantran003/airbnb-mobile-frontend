import React from "react";
import { Rating } from "react-native-elements";
import { useRoute } from "@react-navigation/native";

import {
  ActivityIndicator,
  Button,
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";

export default function HomeScreen() {
  const navigation = useNavigation();
  const axios = require("axios");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View>
      <ActivityIndicator style={{ marginTop: 50 }} />
    </View>
  ) : (
    <View style={styles.main}>
      <FlatList
        data={data}
        keyExtractor={(data) => data._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                navigation.navigate("Room", {
                  picture: item.photos[0].url,
                  price: item.price,
                  title: item.title,
                  rating: item.ratingValue,
                  review: item.reviews,
                  description: item.description,
                  latitude: item.location[1],
                  longitude: item.location[0],
                  avatar: item.user.account.photo.url,
                });
              }}
            >
              <View style={styles.housePicContainer}>
                <Image
                  style={styles.housePic}
                  source={{ uri: item.photos[0].url }}
                />
                <Text style={styles.price}>{item.price}€</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <View style={styles.descriptionSubContainer}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item.title}
                  </Text>
                  <View style={styles.descriptionContainer2}>
                    <Rating
                      ratingBackgroundColor="black"
                      imageSize={20}
                      readonly
                      startingValue={item.ratingValue}
                    />
                    <Text style={styles.rating}>{item.reviews} reviews</Text>
                  </View>
                </View>
                <Image
                  style={styles.avatar}
                  source={{ uri: item.user.account.photo.url }}
                />
              </View>

              <View style={styles.line}></View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  item: {
    flex: 1,
    padding: 15,
  },
  line: {
    marginTop: 10,
    backgroundColor: "lightgrey",
    height: 2,
  },
  housePic: {
    width: "100%",
    height: 200,
  },
  housePicContainer: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  price: {
    position: "absolute",
    color: "white",
    backgroundColor: "black",
    paddingHorizontal: 30,
    paddingVertical: 10,
    left: 0,
    bottom: 10,
  },
  descriptionContainer: {
    flex: 1,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  descriptionContainer2: {
    flex: 1,
    marginTop: 15,
    flexDirection: "row",
  },
  descriptionSubContainer: {
    width: 320,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
  },
  rating: {
    color: "grey",
  },
});
