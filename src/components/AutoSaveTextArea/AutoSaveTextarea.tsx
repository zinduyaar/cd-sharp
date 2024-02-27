import React, { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import  db from '../../firebase-config'; // Adjust the import path as needed
import debounce from 'lodash.debounce'; // If you haven't installed lodash.debounce, run npm install lodash.debounce

const DocumentEditor: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const documentId = 'eTIjcB2QBLbVn4Ahqjhe'; // Replace with your actual document ID
  const documentRef = doc(db, 'CDFeedback', documentId); 

  // Fetch the document content once when the component mounts
  useEffect(() => {
    const fetchContent = async () => {
      const docSnap = await getDoc(documentRef);
      if (docSnap.exists()) {
        setContent(docSnap.data().content || '');
      } else {
        console.log('No such document!');
      }
    };

    fetchContent();
  }, [documentRef]);

  // Debounced update function to save content to Firestore
  const debouncedUpdate = useCallback(debounce(async (newContent: string) => {
    await updateDoc(documentRef, { content: newContent });
  }, 1000), []); // Adjust debounce time as needed

  // Handle textarea change
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = event.target.value;
    setContent(newContent);
    debouncedUpdate(newContent);
  };

  return (
    <textarea
      value={content}
      onChange={handleChange}
      placeholder="Start typing..."
      style={{ width: '100%', height: '200px' }}
    />
  );
};

export default DocumentEditor;
