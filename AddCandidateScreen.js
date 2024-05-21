import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL =
  "https://664ccc5fede9a2b55651ac3e.mockapi.io/api/v1/candidates/Candidates";
const AddCandidateScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [experience, setExperience] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const validateInput = () => {
    if (name.length < 25) {
      Alert.alert("Tên ứng viên phải tối thiểu 25 ký tự");
      return false;
    }
    if (code.length < 8) {
      Alert.alert("Mã số ứng viên tối thiểu 8 ký tự");
      return false;
    }
    if (experience === "") {
      Alert.alert("Mô tả kinh nghiệm không được bỏ trống");
      return false;
    }
    if (!email.includes("@")) {
      Alert.alert("Email phải có ký tự @");
      return false;
    }
    return true;
  };

  const saveCandidate = () => {
    if (validateInput()) {
      // Call API to save candidate
      fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          code: code,
          experience: experience,
          email: email,
          address: address,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          navigation.navigate("CandidateList");
        })
        .catch((error) => console.error(error));
    }
  };

  const cancelAdding = () => {
    Alert.alert(
      "Hủy bỏ",
      "Bạn có muốn bỏ thêm mới không?",
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Có",
          onPress: () => navigation.navigate("CandidateList"),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerstext}>Tên ứng viên</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nhập tên ứng viên"
      />
      <Text style={styles.headerstext}>Mã số ứng viên</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="Nhập mã số ứng viên"
      />
      <Text style={styles.headerstext}>Mô tả kinh nghiệm</Text>
      <TextInput
        style={styles.input}
        value={experience}
        onChangeText={setExperience}
        placeholder="Nhập mô tả kinh nghiệm"
      />
      <Text style={styles.headerstext}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Nhập email"
      />
      <Text style={styles.headerstext}>Địa chỉ</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Nhập địa chỉ"
      />
      <View style={styles.buttonContainer}>
        <Button title="Hủy bỏ" onPress={cancelAdding} />
        <Button title="Lưu lại" onPress={saveCandidate} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  headerstext: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default AddCandidateScreen;
