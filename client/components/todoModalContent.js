import React, { useState } from "react";
import { View, Text, Keyboard, StyleSheet, Button, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const TodoModal = ({ id, title }) => {
  const [email, setEmail] = useState("");
  const [focus, setFocus] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(
      `http://192.168.20.24:8080/todos/shared_todos`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          todo_id: id,
          user_id: 2,
          email: email,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    Keyboard.dismiss();
    setEmail("");
    setFocus(false);
    Alert.alert(
      "Congratulations 👏",
      `you successfully shared ${title} whit ${email}`,
      [{ text: "Ok" }]
    );
  };
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Share your task</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>{title}</Text>
      <Text style={styles.description}>
        Enter the Email of the user you want to share your task with. Share a
        task with someone and stay in sinc with your goals everiday.
      </Text>
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType="email-address"
        style={[
          styles.input,
          focus && { borderWidth: 3, borderColor: "black" },
        ]}
        placeholder="Enter your contact email"
      />
      <Button
        onPress={handleSubmit}
        title="Share"
        disabled={email.length === 0}
      />
    </View>
  );
};

export default TodoModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#00000020",
    padding: 15,
    borderRadius: 15,
    marginVertical: 15,
  },
});
