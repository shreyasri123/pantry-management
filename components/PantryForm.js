// components/PantryForm.js
import { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { addPantryItem } from '../lib/pantryService';

const PantryForm = ({ onItemAdded }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && quantity) {
      try {
        await addPantryItem({ name, quantity });
        setName('');
        setQuantity('');
        if (onItemAdded) onItemAdded(); // Refresh list
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <Button type="submit" variant="contained">Add Item</Button>
    </Box>
  );
};

export default PantryForm;
