import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as action from './action';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
    try {
        const { email, password } = payload;
        const response = yield call(axios.post, '/tokens', { email, password });
        yield put(action.loginSuccess({ ...response.data }));

        toast.success('Você fez login');

        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

        history.push(payload.prevPath);
    } catch (e) {
        toast.error('Usuario ou senha inválida.');

        yield put(action.loginFailure());
    }
}

function* registerRequest({ payload }) {
    const { nome, email, password, id } = payload;

    try {
        if (id) {
            yield call(axios.put, '/users', {
                email,
                nome,
                password: password || undefined,
            });
            toast.success('Conta alterada com sucesso!');
            yield put(action.registerUpdatedSuccess({ nome, email, password }));
        } else {
            yield call(axios.post, '/users', {
                email,
                nome,
                password,
            });
            toast.success('Conta Criada com sucesso!');
            yield put(action.registerCreatedSuccess({ nome, email, password }));
            history.push('/login');
        }
    } catch (e) {
        const errors = get(e, 'response.data.errors', []);
        const status = get(e, 'response.status', 0);

        if (status === 401) {
            toast.error('Email alterado, precisa realizar um novo login!');
            yield put(action.loginFailure());
            return history.push('/login');
        }
        if (errors.length > 0) {
            errors.map((err) => toast.error(err));
        } else {
            toast.error('Erro desconhecido.');
        }

        yield put(action.registerFailure());
    }
    return 1;
}

function persistRehydrate(payload) {
    const token = get(payload, 'auth.token', '');
    if (!token) return;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
