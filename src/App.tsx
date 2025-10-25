import './App.css';
import Header from './components/Header';
import CarLotManager from './components/CarLotManager';


const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
        if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then(registration => console.log('Service Worker registered:', registration))
        .catch(error => console.error('Service Worker registration failed:', error));
         });
        }
      <CarLotManager />
    </div>
  );
};

export default App;
