// lib/pantryService.js
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const pantryCollection = collection(db, 'pantry');

export const addPantryItem = async (item) => {
    try{
        await addDoc(pantryCollection, item);
    } catch (error) {
        console.error('Error adding pantry item:',error);
    }
};

export const deletePantryItem = async (id) => {
  await deleteDoc(doc(db, 'pantry', id));
};

export const updatePantryItem = async (id, updatedItem) => {
  await updateDoc(doc(db, 'pantry', id), updatedItem);
};

export const getPantryItems = async () => {
  const snapshot = await getDocs(pantryCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
