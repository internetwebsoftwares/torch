import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import AppList from "../Components/AppList";

export default function SearchPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const data = [
    "Iphone",
    "Iphone X",
    "Iphone 6",
    "Iphone 13 Pro",
    "Apple Iphone",
  ];
  return (
    <ScrollView>
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <View style={{ marginTop: 12 }}>
        {data.map((data, index) => {
          return (
            <AppList
              onPress={() =>
                navigation.navigate("OneProduct", {
                  _id: "6167f98864785809e1589cf8",
                  productName: "Nice bikke",
                })
              }
              key={index}
              text={data}
              icon="no"
            >
              <Text>{data}</Text>
            </AppList>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
