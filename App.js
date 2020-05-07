import React, { useState } from "react";
import { SearchBar, Button } from "react-native-elements";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Image,
  FlatList,
  TouchableNativeFeedback,
  Modal,
  ScrollView,
  Dimensions
} from "react-native";

import Colors from "./contants/color";

const WIDTH = Dimensions.get("window").width;

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [result, setResult] = useState([]);
  const [resultDetail, setResultDetail] = useState([]);
  const [resultDetailVisible, setResultDetailVisible] = useState(false);
  const [noResultView, setNoResultView] = useState(null);

  const apiurl = "http://www.omdbapi.com/?apikey=28f4dae9&type=movie";

  const resetScreen = () => {
    Keyboard.dismiss();
    setUserInput("");
    setUserChoice("");
    setResult("");
    setResultDetail("");
    setNoResultView(null);
    setResultDetailVisible(false);
  }

  const addUserChoice = () => {
    setUserChoice(userInput);
  }

  const searchInputHandler = (searchInput) => {
    setUserInput(searchInput);
  };

  const sendSearchRequest = () => {
    setNoResultView(null);
    addUserChoice();
    Keyboard.dismiss();
    axios(apiurl + "&s=" + userInput)
      .then(({ data }) => {
        setResult(data);
        if (data.Response == 'True')
          setNoResultView(false);
        else
          setNoResultView(true);
      })
      .catch((error) => console.error(error))
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
      <View style={styles.header}>
        <TouchableNativeFeedback onPress={resetScreen}>
          <Text style={styles.headerTitle}>MOVIE LOOKUP</Text>
        </TouchableNativeFeedback>
      </View>
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
      <View style={{ flex: 1 }}>
        {userChoice == "" ?
          (<Text>Search something now...</Text>) :
          noResultView ?
            (<View>
              <Text>No result for {userChoice}</Text>
            </View>) :
            (<View style={{ flex: 1 }}>
              <FlatList
                ListHeaderComponent={
                  <View>
                    <Text>
                      Result for : {userChoice}
                    </Text>
                  </View>}
                keyExtractor={(item, index) => item.imdbID}
                data={result.Search}
                renderItem={({ item }) => (
                  <TouchableNativeFeedback onPress={() => openPopup(item.imdbID)}>
                    <View style={styles.resultContainer}>
                      <Image
                        source={{ uri: item.Poster }}
                        style={styles.resultImageContainer}
                        resizeMode="cover"
                      />
                      <Text style={styles.resultText}>{item.Title}</Text>
                      <Text style={styles.resultText}>{item.Year}</Text>
                    </View>
                  </TouchableNativeFeedback>
                )}
                numColumns={2}
              />
            </View>)
        }
      </View>
      <Modal
        animationType="fade"
        transparent={false}
        visible={resultDetailVisible}
      >
        <ScrollView contentContainerStyle={styles.resultDetailScreen}>
          <Image
            source={{ uri: resultDetail.Poster }}
            style={styles.resultDetailImage}
            resizeMode="contain"
          />
          <View style={styles.resultDetailContainer}>
            <View style={{ flexDirection: 'row', flexWrap: "wrap" }}>
              <Text style={styles.resultDetailTitle}>{resultDetail.Title} </Text>
              <Text style={styles.resultDetailYear}>{resultDetail.Year}</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.resultDetailText}>Genre: {resultDetail.Genre}</Text>
              <Text style={styles.resultDetailImdb}>
                IMDb {resultDetail.imdbRating}
              </Text>
            </View>
            <Text style={styles.resultDetailText}>{resultDetail.Plot}</Text>
          </View>
        </ScrollView>
        <View style={styles.closeBtn}>
          <Button title="CLOSE" onPress={closeBtn} />
        </View>
      </Modal>
    </View >
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: Colors.accent,
    paddingTop: 30,
    paddingLeft: 10,
    margin: 10,
    justifyContent: "flex-start",
  },
  headerTitle: {
    color: Colors.primary,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
  screen: {
    flex: 1,
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
    alignItems: "flex-start",
  },
  resultDetailImage: {
    width: WIDTH,
    height: 400,
  },
  resultDetailTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 5,
  },
  resultDetailYear: {
    fontSize: 20,
  },
  resultDetailImdb: {
    color: 'green',
    textAlign: "justify",
  },
  resultDetailText: {
    textAlign: "justify",
    fontSize: 15,
  },
  closeBtn: {
    width: WIDTH,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
  },
});
