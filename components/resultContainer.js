import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Card = props => {
    return (
        <View style={styles.resultContainer}>
            <Image source={{ uri: item.Poster }}
                style={styles.resultImageContainer}
                resizeMode="cover" />
            <Text style={styles.resultText}>{item.Title}</Text>
            <Text style={styles.resultText}>Year {item.Year}</Text>
        </View>
    );
}