import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import MealCard from '../components/MealCard';
import { searchMealByName, getRandomMeal, listMealCategories } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchRandomMeal();
    fetchMealCategories(); // Fetch categories when the component mounts
  }, []);

  const fetchRandomMeal = async () => {
    setLoading(true);
    try {
      const response = await getRandomMeal();
      if (response.data.meals) {
        setMeals([response.data.meals[0]]);
      } else {
        setMeals([]); // Handle case when no meal is returned
      }
    } catch (error) {
      console.error('Error fetching random meal:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMealCategories = async () => {
    setLoading(true);
    try {
      const response = await listMealCategories();
      setCategories(response.data.categories); // Set categories state
    } catch (error) {
      console.error('Error fetching meal categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      if (query) {
        const response = await searchMealByName(query);
        setMeals(response.data.meals || []); // Set meals or empty array if no result
      } else {
        setMeals([]); // Clear meals if no query
      }
    } catch (error) {
      console.error('Error searching for meal:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = async (category) => {
    setLoading(true);
    setSelectedCategory(category); // Set the selected category
    try {
      const response = await fetchMealsByCategory(category); // Define this function to fetch meals by category
      setMeals(response.data.meals || []); // Update meals based on selected category
    } catch (error) {
      console.error('Error fetching meals by category:', error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Meal..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          handleSearch(text);
        }}
      />
      <View style={styles.categoryContainer}>
        {categories.map((category) => (
          <Text
            key={category.strCategory}
            style={styles.categoryText}
            onPress={() => handleCategorySelect(category.strCategory)} // Call to fetch meals by category
          >
            {category.strCategory}
          </Text>
        ))}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={meals}
          renderItem={({ item }) => (
            <MealCard
              meal={item}
              onPress={() => navigation.navigate('MealDetail', { id: item.idMeal })}
            />
          )}
          keyExtractor={(item) => item.idMeal}
          ListEmptyComponent={<Text>No meals found. Try another search.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  categoryText: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
