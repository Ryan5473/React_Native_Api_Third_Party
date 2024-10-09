// /screens/CategoryMealsScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { listMealsByCategory } from '../services/api'; // Import the function
import MealCard from '../components/MealCard'; // Make sure you have this component

const CategoryMealsScreen = ({ route }) => {
  const { category } = route.params; // Get the category passed from navigation
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await listMealsByCategory(category);
        setMeals(response.data.meals || []);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meals in {category}</Text>
      <FlatList
        data={meals}
        renderItem={({ item }) => (
          <MealCard meal={item} />
        )}
        keyExtractor={(item) => item.idMeal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10 },
});

export default CategoryMealsScreen;
