import './App.css';
import './css/grid.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/footer';
import Header from './components/header';
import { AppRouter } from './router/approuter';
import { AppProvider } from './context/AppContext';  // Import the AppProvider

function App() {
    return (
        <AppProvider>  {/* Wrap the entire app in the AppProvider */}
            <BrowserRouter>
                <Header />
                <AppRouter />
                <Footer />
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
