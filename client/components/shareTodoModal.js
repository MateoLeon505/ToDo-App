import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

const ShareTodoModal = ({ id, title, shared_with_id, completed }) => {
  const [author, setAuthor] = useState({});
  const [sharedWith, setSharedWith] = useState({});

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      const response = await fetch(
        `http://192.168.20.24:8080/todos/shared_todos/1`,
        {
          method: "GET",
        }
      );
      const { author, shared_with } = await response.json();
      setAuthor(author);
      setSharedWith(shared_with);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={[styles.title, { marginBottom: 20 }]}>Shared Tasks</Text>
      <Text style={[styles.title, { marginBottom: 20 }]}>"{title}"</Text>
      <Text style={[styles.title]}>Status</Text>
      <View
        style={[
          styles.status,
          { backgroundColor: completed === 1 ? "#4ade80" : "#f87171" },
        ]}
      >
        <Text style={[styles.title, { color: "white" }]}>
          {completed === 1 ? "Completed" : "Incompleted"}
        </Text>
      </View>
      <Text style={styles.description}>MEMBERS</Text>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.member}>
          <Text style={[styles.description, { color: "white" }]}>
            {author.id}
          </Text>
        </View>
        <View style={styles.member}>
          <Text style={[styles.description, { color: "white" }]}>
            {sharedWith.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ShareTodoModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 13,
    fontWeight: "900",
    color: "black",
  },
  member: {
    backgroundColor: "#8b5cf6",
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 20,
    fontWeight: "900",
  },
  status: {
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 20,
    fontWeight: "900",
    color: "white",
  },
});
