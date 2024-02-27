// app.tsx
import React from 'react';
import TextEditor from './components/TextEditor';
import GeolocationComponent from './components/geolocation'

const App: React.FC = () => {
  return (
    <div className="App">
      <TextEditor />
      <GeolocationComponent/>
    </div>
  );
};

export default App;
