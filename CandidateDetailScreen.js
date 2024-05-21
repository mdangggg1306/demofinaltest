import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
const API_URL =
  "https://664ccc5fede9a2b55651ac3e.mockapi.io/api/v1/candidates/Candidates";

const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.backButton}>
    <Icon name="arrow-back" size={25} color="black" />
  </TouchableOpacity>
);

const CandidateDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${route.params.id}`)
      .then((response) => response.json())
      .then((data) => setCandidate(data))
      .catch((error) => console.error(error));
  }, []);

  const deleteCandidate = () => {
    Alert.alert(
      "Xóa ứng viên",
      "Bạn có chắc chắn muốn xóa ứng viên này không?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            fetch(`${API_URL}/${route.params.id}`, {
              method: "DELETE",
            })
              .then(() => navigation.goBack())
              .catch((error) => console.error(error));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Thông tin chi tiết ứng viên</Text>
      </View>
      {candidate && (
        <>
          <Text style={styles.info}>Tên ứng viên: {candidate.name}</Text>
          <Text style={styles.info}>Mã số ứng viên: {candidate.code}</Text>
          <Text style={styles.info}>Kinh nghiệm: {candidate.exp}</Text>
          <Text style={styles.info}>Email: {candidate.email}</Text>
          <Text style={styles.info}>Địa chỉ: {candidate.address}</Text>
          <Button title="Xóa ứng viên" onPress={deleteCandidate} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
});

export default CandidateDetailScreen;
