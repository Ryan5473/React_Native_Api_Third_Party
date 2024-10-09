import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { lookupMealById } from '../services/api';

const MealDetailScreen = ({ route }) => {
  const { id } = route.params;  // Get meal ID from route params
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMealDetails(id);
  }, [id]);

  const fetchMealDetails = async (id) => {
    try {
      const response = await lookupMealById(id);
      setMeal(response.data.meals[0]);
    } catch (error) {
      console.error("Failed to fetch meal details", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Meal Details...</Text>
      </View>
    );
  }

  if (!meal) return <Text>Meal not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{meal.strMeal}</Text>
      <Text style={styles.subtitle}>Category: <Text style={styles.detail}>{meal.strCategory}</Text></Text>
      <Text style={styles.subtitle}>Area: <Text style={styles.detail}>{meal.strArea}</Text></Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: '100%', height: 300, borderRadius: 8 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
  subtitle: { fontSize: 18, marginVertical: 5 },
  detail: { fontWeight: 'normal' },  // For making inline text normal font-weight
  instructions: { fontSize: 16, marginTop: 20 },
  loadingContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  }
});

export default MealDetailScreen;
