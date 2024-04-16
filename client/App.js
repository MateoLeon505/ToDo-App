import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

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
      console.log(todos);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(todos);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(todos)}</Text>
      {/* {todos?.map((todo) => {
        <Text style={styles.text}>ID:{todo.id}</Text>
      })} */}
      {/* <Text>{todos}</Text> */}
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text : {
    color: "#000000",
  }
});
