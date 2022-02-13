import { ScrollView, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Badge, Card, Paragraph, Title } from "react-native-paper";
import { DefaultTheme } from "react-native-paper";
import axios from "axios";
import { PageLoading } from "../Components/Loading";

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await axios.get("/ads/all/1");
        console.log(response.data);
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    loadProducts();
  }, []);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <ScrollView style={{ padding: 12 }}>
      {products.map((product) => {
        return (
          <Card
            onPress={() =>
              navigation.navigate("OneProduct", {
                _id: product._id,
                productName: product.title,
              })
            }
            key={product._id}
            style={{ marginBottom: 20 }}
          >
            <Card.Cover
              source={{
                uri: product.previewImageUrl,
              }}
            />
            <Badge
              style={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: DefaultTheme.colors.primary,
              }}
            >
              {product.imagesUrls.length} photos
            </Badge>
            <Card.Title title={product.title}></Card.Title>
            <Card.Content>
              <Paragraph>{product.description}</Paragraph>
              <Title style={{ color: DefaultTheme.colors.primary }}>
                Price: ₹{product.price}/-
              </Title>
            </Card.Content>
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
