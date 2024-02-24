import React, { useState, useEffect } from 'react';
import Loader from './Loader'; // Import Loader component
import SuccessIcon from './SuccessIcon'; // Import SuccessIcon component
import { off } from 'process';
import "./TextEditor.css"

const TextEditor: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [tempText, setTempText] = useState<string>(''); // Separate state for temporary text
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [indexedDBInitialized, setIndexedDBInitialized] = useState<boolean>(false);
    const [offlineMode, setOfflineMode] = useState<boolean>(false);
    let db: IDBDatabase | null = null;

    useEffect(() => {
        initializeIndexedDB();
        setOfflineMode(!navigator.onLine);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const initializeIndexedDB = () => {
        const request = indexedDB.open('textEditorDB');

        request.onerror = function (event: any) {
            console.error('IndexedDB error:', event.target.error);
        };

        request.onsuccess = function (event: any) {

            console.log('IndexedDB initialized');
            db = (event.target as IDBOpenDBRequest).result;
            setIndexedDBInitialized(true);
            console.log(offlineMode);
            console.log(navigator.onLine);
            getText(); // Fetch text when the component mounts
        };

        request.onupgradeneeded = function (event: any) {
            db = (event.target as IDBOpenDBRequest).result;
            db.createObjectStore('text', { keyPath: 'id' });
        };
    };

    const handleOnline = () => {
        setOfflineMode(false);
        getText();
        console.log('online now');
    }
    const handleOffline = () => {
        setOfflineMode(true);
        getText();
        console.log('offline now');
    }
    const getText = async () => {
        setLoading(true);
        if (navigator.onLine) {
            await compareLocalVsRemoteText();
        } else {
            console.log('Offline mode, getting text from indexeddb');
            // Try to get data from IndexedDB when offline
            const offlineData = await readFromIndexedDB();

            if (offlineData) {
                setText(offlineData.text);
                setTempText(offlineData.text);
            }
            setLoading(false);
        }
    };

    const updateText = async (newText: string) => {
        setLoading(true);
        if (navigator.onLine) {
            await fetch('https://us-central1-glabs-school.cloudfunctions.net/api/setText', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newText }),
            });
            // Update state after successfully setting text
            setText(newText);
            setSuccess(true);
            setLoading(false);
            // Save data to IndexedDB
            saveToIndexedDB(newText);
            // Hide success icon after 2 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        } else {
            console.log('Offline mode, saving data in indexeddb');
            saveToIndexedDB(newText, true);
            setLoading(false);
        }
    };
    
    const compareLocalVsRemoteText = async () => {
        const networkResponse = await fetch('https://us-central1-glabs-school.cloudfunctions.net/api/getText');
        const networkData = await networkResponse.json();
        const offlineData = await readFromIndexedDB();
        if (offlineData && offlineData.overridable && offlineData.text !== networkData.text) {

            updateText(offlineData.text);

        }
        else {
            setText(networkData.text);
            setTempText(networkData.text); // Initialize tempText with fetched text
            setLoading(false);
            // Save data to IndexedDB
            saveToIndexedDB(networkData.text);
        }

    }
    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTempText(event.target.value); // Update tempText as the user types
    };

    const handleTextAreaBlur = () => {
        if (tempText !== text) {
            updateText(tempText); // Call updateText only if tempText has changed
        }
    };

    const saveToIndexedDB = (data: string, overridable: boolean = false) => {

        const request = indexedDB.open('textEditorDB', 1);

        request.onerror = function (event: any) {
            console.error('IndexedDB error:', event.target.error);
        };

        request.onsuccess = function (event: any) {
            const db = event.target.result;
            const transaction = db.transaction('text', 'readwrite');
            const objectStore = transaction.objectStore('text');
            const addRequest = objectStore.put({ id: 1, text: data, overridable: overridable });

            addRequest.onsuccess = function () {
                console.log('Data saved to IndexedDB');
            };

            addRequest.onerror = function (event: any) {
                console.error('Error saving data to IndexedDB:', event.target.error);
            };
        };
    };

    const readFromIndexedDB = (): Promise<any | undefined> => {
        return new Promise((resolve, reject) => {

            const request = indexedDB.open('textEditorDB', 1);

            request.onerror = function (event: any) {
                console.error('IndexedDB error:', event.target.error);
                reject();
            };

            request.onsuccess = function (event: any) {
                const db = event.target.result;
                const transaction = db.transaction(['text'], 'readonly');
                const objectStore = transaction.objectStore('text');
                const getRequest = objectStore.get(1);

                getRequest.onsuccess = function (event: any) {
                    const data = event.target.result;
                    if (data) {
                        resolve(data);
                    } else {
                        resolve(undefined);
                    }
                };

                getRequest.onerror = function (event: any) {
                    console.error('Error reading data from IndexedDB:', event.target.error);
                    reject();
                };
            };
        });
    };

    return (
        <div>
            <h1>CD Plus</h1>
            {offlineMode && <p>You are offline, changes will sync when you'll be online</p>}
            
            <textarea
                value={tempText} // Use tempText as the value for the textarea
                onChange={handleTextAreaChange}
                onBlur={handleTextAreaBlur}
                rows={10}
                cols={50}
                />
            {loading && <Loader />} {/* Display loader if loading is true */}
            {success && <SuccessIcon />} {/* Display success icon if success is true */}
        </div>
    );
};

export default TextEditor;
