import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Header from './components/Header';
import GlobalStyles from './styles/GlobalStyles';
import history from './services/history';
import Routes from './routes';
import store, { persistor } from './store';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>
                    <GlobalStyles />
                    <ToastContainer
                        autoClose={3000}
                        className="toast-container"
                    />
                    <Header />
                    <Routes />
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
