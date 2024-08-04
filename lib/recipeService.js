// lib/recipeService.js
import axios from 'axios';

const COHERE_API_KEY = process.env.NEXT_PUBLIC_COHERE_API_KEY;

export const getRecipeSuggestions = async (pantryItems) => {
  try {
    const response = await axios.post('https://api.cohere.ai/v1/generate', {
      model: 'command-xlarge-nightly', // Replace with the desired model if needed
      prompt: `Suggest recipes based on these pantry items: ${pantryItems.join(', ')}`,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${COHERE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.generations[0].text.trim();
  } catch (error) {
    console.error('Error fetching recipe suggestions:', error.response ? error.response.data : error.message);
    return 'Error fetching recipe suggestions';
  }
};
