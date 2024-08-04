// pages/index.js
import { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Box } from '@mui/material';
import { getPantryItems, deletePantryItem } from '../lib/pantryService';
import { getRecipeSuggestions } from '../lib/recipeService';
import PantryForm from '../components/PantryForm';

const Home = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [recipeSuggestions, setRecipeSuggestions] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const data = await getPantryItems();
        setItems(data);
      } catch (error) {
        console.error('Error fetching pantry items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePantryItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting pantry item:', error);
    }
  };

  const handleItemAdded = async () => {
    const data = await getPantryItems();
    setItems(data);
  };

  const handleGetRecipes = async () => {
    const pantryItems = items.map(item => item.name);
    const suggestions = await getRecipeSuggestions(pantryItems);
    setRecipeSuggestions(suggestions);
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
        <Typography variant="h4" gutterBottom>
          Pantry Management
        </Typography>
      
      <TextField
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <PantryForm onItemAdded={handleItemAdded} />
      <Button onClick={handleGetRecipes} variant="contained" sx={{ mt: 2 }}>
        Get Recipe Suggestions
      </Button>
      {recipeSuggestions && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Recipe Suggestions:</Typography>
          <Typography>{recipeSuggestions}</Typography>
        </Box>
      )}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <List>
          {filteredItems.map(item => (
            <ListItem key={item.id}>
              <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
              <Button onClick={() => handleDelete(item.id)} variant="outlined" color="error">
                Delete
              </Button>
            </ListItem>
          ))}
          {filteredItems.length === 0 && (
            <Typography>No items found</Typography>
          )}
        </List>
      )}
    </Container>
  );
};

export default Home;
