import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";

const API_URL =
  "https://664ccc5fede9a2b55651ac3e.mockapi.io/api/v1/candidates/Candidates";

const CandidateListScreen = ({ navigation }) => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        // Kiểm tra nếu response ok
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Server response wasn't OK");
        }
      })
      .then((data) => setCandidates(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const searchCandidates = () => {
    // Assuming your API supports search query
    fetch(`${API_URL}?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setCandidates(data))
      .catch((error) => console.error(error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Danh sách ứng viên</Text>
      </View>
      <View style={styles.iconContainer}>
        <Icon
          style={styles.icon}
          name="add"
          onPress={() => navigation.navigate("AddCandidate")}
        />
      </View>
      <View style={styles.searchSection}>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Tìm kiếm..."
        />
        <Button title="Tìm kiếm" onPress={searchCandidates} />
      </View>
      <FlatList
        data={candidates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CandidateDetail", { id: item.id })
            }
          >
            <View style={styles.item}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.code}>{item.code}</Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  item: {
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    alignItems: "flex-start", // căn lề trái
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  code: {
    fontSize: 16,
  },
  email: {
    fontSize: 14,
  },
  iconContainer: {
    alignItems: "flex-end",
  },
  textContainer: {
    flexDirection: "column",
  },
});

export default CandidateListScreen;
