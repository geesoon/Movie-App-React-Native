import React, { useEffect, useState } from "react";
import { SearchBar, Button } from "react-native-elements";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Image,
  FlatList,
  TouchableHighlight,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";

import Header from "./components/Header";
import Colors from "./contants/color";

const WIDTH = Dimensions.get("window").width;

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [result, setResult] = useState([]);
  const [resultDetail, setResultDetail] = useState([]);
  const [resultDetailVisible, setResultDetailVisible] = useState(false);
  const [noResultView, setNoResultView] = useState(true);

  const apiurl = "http://www.omdbapi.com/?apikey=28f4dae9&type=movie";

  const searchInputHandler = (searchInput) => {
    setUserInput(searchInput);
  };

  const sendSearchRequest = () => {
    Keyboard.dismiss();
    axios(apiurl + "&s=" + userInput)
      .then(({ data }) => {
        setResult(data.Search);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    setUserInput('');
  };

  const openPopup = (id) => {
    axios(apiurl + "&i=" + id)
      .then(({ data }) => setResultDetail(data))
      .catch((error) => console.error(error));
    setResultDetailVisible(true);
  };

  const closeBtn = () => {
    setResultDetailVisible(false);
    setResultDetail("");
  };

  return (
    <View style={styles.screen}>
      <Header />
      <View>
        <SearchBar
          lightTheme={true}
          containerStyle={{
            backgroundColor: Colors.accent,
            borderRadius: 5,
            elevation: 3,
            margin: 10,
            width: 400,
            height: 50,
            maxWidth: "95%",
            justifyContent: "center",
            alignItems: "center",
          }}
          inputContainerStyle={{
            backgroundColor: Colors.accent,
            height: "100%",
          }}
          round={true}
          placeholder="Search here..."
          onChangeText={searchInputHandler}
          value={userInput}
          showLoading={true}
          searchIcon={
            <Button
              buttonStyle={styles.searchButton}
              icon={{
                name: "search",
                size: 15,
                color: "gray",
              }}
              onPress={sendSearchRequest}
            />
          }
        />
      </View>
      <View>
        <Text>
          Result for : {userInput}
        </Text>
      </View>

      <View>
        <FlatList
          keyExtractor={(item, index) => item.imdbID}
          data={result}
          renderItem={({ item }) => (
            <TouchableHighlight underlayColor={Colors.primary} onPress={() => openPopup(item.imdbID)}>
              <View style={styles.resultContainer}>
                <Image
                  source={{ uri: item.Poster }}
                  style={styles.resultImageContainer}
                  resizeMode="cover"
                />
                <Text style={styles.resultText}>{item.Title}</Text>
                <Text style={styles.resultText}>{item.Year}</Text>
              </View>
            </TouchableHighlight>
          )}
          numColumns={2}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={resultDetailVisible}
      >
        <ScrollView>
          <Image
            source={{ uri: resultDetail.Poster }}
            style={styles.resultDetailImage}
            resizeMode="contain"
          />
          <View style={styles.resultDetailContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.resultDetailTitle}>{resultDetail.Title} </Text>
              <Text style={styles.resultDetailYear}>{resultDetail.Year}</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.resultDetailText}>Genre: {resultDetail.Genre}</Text>
              <Text style={styles.resultDetailIMDB}>
                IMDb {resultDetail.imdbRating}
              </Text>
            </View>
            <Text style={styles.resultDetailText}>{resultDetail.Plot}</Text>
          </View>
          <View style={styles.closeBtn}>
            <Button title="CLOSE" onPress={closeBtn} />
          </View>
        </ScrollView>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  screen: {
    width: WIDTH,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.accent,
  },
  searchButton: {
    backgroundColor: Colors.accent,
  },
  resultContainer: {
    width: WIDTH / 2.5,
    height: 350,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    elevation: 3,
  },
  resultImageContainer: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  resultText: {
    textAlign: "center",
    margin: 5,
    fontSize: 15,
  },
  resultDetailContainer: {
    padding: 10,
    margin: 10,
    justifyContent: "space-evenly",
    alignItems: "flex-start"
  },
  resultDetailImage: {
    width: WIDTH,
    height: 400,
  },
  resultDetailTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  resultDetailYear: {
    fontSize: 20,
  },
  resultDetailIMDB: {
    color: 'green',
    textAlign: "justify",
  },
  resultDetailText: {
    textAlign: "justify",
    fontSize: 15,
  },
  closeBtn: {
    padding: 10,
  },
});
