import React from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Text, View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import { Rating } from "react-native-elements";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    picture,
    price,
    title,
    rating,
    review,
    description,
    latitude,
    longitude,
    avatar,
  } = route.params;
  return (
    <View style={styles.item}>
      <View style={styles.housePicContainer}>
        <Image style={styles.housePic} source={{ uri: picture }} />
        <Text style={styles.price}>{price}€</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <View style={styles.descriptionSubContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <View style={styles.descriptionContainer2}>
            <Rating
              ratingBackgroundColor="black"
              imageSize={20}
              readonly
              startingValue={rating}
            />
            <Text style={styles.rating}>{review} reviews</Text>
          </View>
        </View>
        <Image style={styles.avatar} source={{ uri: avatar }} />
      </View>
      <View>
        <Text>{description}</Text>
        <MapView
          style={{ marginTop: 30, height: "60%", width: "100%" }}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: latitude, longitude: longitude }}
            title="this is a marker"
            description="this is a marker example"
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 15,
    justifyContent: "flex-start",
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
    height: 70,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
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
  description: {
    flex: 1,
  },
  descriptionContainer2: {
    flex: 1,
    marginTop: 15,
    flexDirection: "row",
  },
});
