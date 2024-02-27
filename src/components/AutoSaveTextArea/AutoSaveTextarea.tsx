import React, { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import  db from '../../firebase-config'; // Adjust the import path as needed
import debounce from 'lodash.debounce'; // If you haven't installed lodash.debounce, run npm install lodash.debounce

const AutoSaveTextarea: React.FC = () => {
  const [text, setText] = useState<string>('');
  const documentRef = doc(db, 'CDFeedback', 'eTIjcB2QBLbVn4Ahqjhe'); // Use your actual collection and document ID

  // Fetch initial content from Firestore
  const fetchContent = useCallback(async () => {
    const docSnap = await getDoc(documentRef);
    if (docSnap.exists()) {
      setText(docSnap.data().content || ''); // Assuming your document has a 'content' field
    } else {
      console.log("No such document!");
    }
  }, [documentRef]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // Debounced save function
  const debouncedSave = useCallback(debounce(async (newText: string) => {
    try {
      await updateDoc(documentRef, { content: newText });
      console.log('Content saved');
    } catch (error) {
      console.error("Error saving content:", error);
    }
  }, 1000), [documentRef]); // Debounce delay of 1000ms

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    debouncedSave(newValue);
  };

  return (
    <textarea
      value={text}
      onChange={handleChange}
      placeholder="Start typing..."
      style={{ width: '100%', height: '200px' }}
    />
  );
};

export default AutoSaveTextarea;
