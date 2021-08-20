import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistedReducer from './modules/reduxPersist';
import rootReducer from './modules/rootReducer';
import rootSagas from './modules/rootSagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    persistedReducer(rootReducer),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSagas);

export const persistor = persistStore(store);
export default store;
