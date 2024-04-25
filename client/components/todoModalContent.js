import React, { useState } from "react";
import { View, Text, Keyboard, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const TodoModal = ({ id, title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default TodoModal;
