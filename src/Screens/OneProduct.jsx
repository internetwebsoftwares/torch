import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import {
  Badge,
  Button,
  Card,
  DefaultTheme,
  Divider,
  Headline,
  Paragraph,
  Title,
} from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";
import axios from "axios";
import openMap from "react-native-open-maps";
import { PageLoading } from "../Components/Loading";
import AppButton from "../Components/AppButton";
import AppBadge from "../Components/AppBadge";

export default function OneProduct({ route }) {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await axios.get(`/ad/${route.params._id}`);
        setProduct(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadProduct();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <ScrollView>
        <SliderBox
          dotColor={DefaultTheme.colors.primary}
          images={product.imagesUrls}
          imageLoadingColor={DefaultTheme.colors.primary}
          onCurrentImagePressed={(e) => console.log(e)}
        />
        <Card.Content style={{ marginTop: 16 }}>
          <Headline>{product.title}</Headline>
          <View
            style={{ display: "flex", flexDirection: "row", marginVertical: 8 }}
          >
            <AppBadge>{product.category}</AppBadge>
          </View>

          <Paragraph>{product.description}</Paragraph>
          <View style={{ marginTop: 12 }}></View>
          <Text style={{ fontWeight: "200" }}>
            Owner:{" "}
            <Text style={{ fontWeight: "bold" }}>{product.ownerName}</Text>
          </Text>
          <Text style={{ fontWeight: "200" }}>
            Contact no:{" "}
            <Text style={{ fontWeight: "bold" }}>
              {product.contactPhoneNumber}
            </Text>
          </Text>
          <Title
            style={{ color: DefaultTheme.colors.primary, marginVertical: 12 }}
          >
            Price: ₹{product.price}/-
          </Title>

          <AppButton
            style={{ backgroundColor: "teal" }}
            mode="contained"
            onPress={() => openMap(product.location)}
          >
            View location on map
          </AppButton>
          <Divider />

          <View style={{ marginTop: 50 }}>
            <AppButton
              mode="contained"
              onPress={() => console.log("Did u click me")}
            >
              Add to watch later
            </AppButton>
            <AppButton
              mode="text"
              onPress={() => console.log("Did u click me")}
            >
              Chat with owner
            </AppButton>
          </View>
        </Card.Content>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    backgroundColor: "#000",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2000,
    justifyContent: "center",
  },
});
