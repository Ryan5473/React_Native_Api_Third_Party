// /components/MealCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const MealCard = ({ meal, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
    <Text style={styles.title}>{meal.strMeal}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: { margin: 10, padding: 10, backgroundColor: '#fff', borderRadius: 8 },
  image: { width: '100%', height: 150, borderRadius: 8 },
  title: { fontSize: 18, marginTop: 10, fontWeight: 'bold' },
});

export default MealCard;
