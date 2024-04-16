import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Task from "./components/task";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await fetch("http://192.168.20.24:8080/todos/1");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(todos);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={todos}
          keyExtractor={(todo) => todo.id}
          renderItem={({ item }) => <Task {...item} />}
          ListHeaderComponent={() => <Text style={styles.title}>Tasks</Text>}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF ",
    paddingVertical: 25,
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
});
