import React, { useState, useEffect } from 'react';
import Loader from './Loader'; // Import Loader component
import SuccessIcon from './SuccessIcon'; // Import SuccessIcon component

import { LocalDb } from '../shared/OfflineDb/LocalDb'
import "./TextEditor.css"

import { Network } from '@capacitor/network';

const TextEditor: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [tempText, setTempText] = useState<string>(''); // Separate state for temporary text
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [localDb, setLocalDb] = useState<IOfflineDb>();
    const [indexedDBInitialized, setIndexedDBInitialized] = useState<boolean>(false);
    const [offlineMode, setOfflineMode] = useState<boolean>(false);

    useEffect(() => {
        var localDb = new LocalDb();
        setLocalDb(localDb.getDb());
        setOfflineMode(!navigator.onLine);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        Network.addListener('networkStatusChange', status => {
            if (status.connected) {
                handleOnline();
            } else {
                handleOffline();
            }
        });


        getText();
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

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
            const offlineData = await localDb?.getData('text');

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
            const data = { id: 1, text: newText, overridable: false };
            localDb?.saveData('text', data);
            // Hide success icon after 2 seconds
            setTimeout(() => {
                setSuccess(false);
            }, 2000);
        } else {
            console.log('Offline mode, saving data in indexeddb');
            const data = { id: 1, text: newText, overridable: true };
            localDb?.saveData('text', data);
            setLoading(false);
        }
    };

    const compareLocalVsRemoteText = async () => {
        const networkResponse = await fetch('https://us-central1-glabs-school.cloudfunctions.net/api/getText');
        const networkData = await networkResponse.json();
        const offlineData = await localDb?.getData('text');
        if (offlineData && offlineData.overridable && offlineData.text !== networkData.text) {

            updateText(offlineData.text);

        }
        else {
            setText(networkData.text);
            setTempText(networkData.text); // Initialize tempText with fetched text
            setLoading(false);
            // Save data to IndexedDB
            const data = { id: 1, text: networkData.text, overridable: false };
            localDb?.saveData('text', data);
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

    return (
        <div>
            <h1>CD Plus +</h1>
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
