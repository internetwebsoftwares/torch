import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function AppSelect({ setCategory }) {
  const [selectedValue, setSelectedValue] = useState("Select category");
  const categories = [
    "Book",
    "Beauty & Personal Care",
    "Car",
    "Computer",
    "Clothing & Accessories",
    "Home appliances",
    "Smartphone",
    "Iphone",
    "Motorcycle",
    "Furniture",
    "Kitchen products",
    "Phone accessories",
    "Laptop",
    "Phone",
    "Others",
  ].sort();

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: "100%", color: "#666" }}
        onValueChange={(itemValue) => {
          setCategory(itemValue);
          setSelectedValue(itemValue);
        }}
      >
        {categories.map((category) => {
          return (
            <Picker.Item key={category} label={category} value={category} />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#e6e6e6",
    borderStyle: "solid",
    borderBottomColor: "#ccc",
    borderColor: "transparent",
    color: "#ccc",
    borderWidth: 2,
    marginBottom: 12,
  },
});
