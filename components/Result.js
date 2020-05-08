import React from "react";
import { View, Text, FlatList, TouchableHighlight, StyleSheet } from "react-native";

const Result = (userChoice, noResultView, result) => {
    if (userChoice === null) {
        return;
    } else {
        if (noResultView == true) {
            return (
                <View>
                    <Text>
                        No result for {userChoice}! Try again!
                </Text>
                </View>
            )
        } else {
            return (
                <View>
                    <View>
                        <Text>
                            Result for : {userChoice}
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
                </ View>
            )
        }
    }
}

export default Result;