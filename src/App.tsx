import './App.css';
import Header from './components/Header';
import CarLotManager from './components/CarLotManager';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <CarLotManager />
    </div>
  );
};

export default App;
