import * as types from '../types';

export function clicaBotaoRequest() {
    return {
        type: types.BOTAO_CLICADO_REQUEST,
    };
}

export function clicaBotaoSuccess() {
    return {
        type: types.BOTAO_CLICADO_SUCCESS,
    };
}

export function clicaBotaofailure() {
    return {
        type: types.BOTAO_CLICADO_FAILURE,
    };
}
