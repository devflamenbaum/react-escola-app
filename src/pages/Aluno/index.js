import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import * as actions from '../../store/modules/auth/action';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../components/Loading/index';

function Aluno({ match }) {
    const id = get(match, 'params.id', '');
    const [aluno, setAluno] = useState(() => () => {});
    const [foto, setFoto] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!id) return;
        async function getData() {
            try {
                setIsLoading(true);
                const { data } = await axios.get(`/alunos/${id}`);
                const fotoAluno = get(data, 'Foto[0].url', '');

                setFoto(fotoAluno);
                setAluno(() => () => data);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                const status = get(err, 'response.status', 0);
                const errors = get(err, 'response.data.errors', []);

                if (status === 400) errors.map((error) => toast.error(error));
                history.push('/');
            }
        }
        getData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nome, sobrenome, email, idade, peso, altura } = aluno;
        let formErrors = false;

        if (nome.length < 3 || nome.length > 255) {
            toast.error('Campo nome precisa ter entre 3 e 255 caracteres.');
            formErrors = true;
        }

        if (sobrenome.length < 3 || sobrenome.length > 255) {
            toast.error('Campo nome precisa ter entre 3 e 255 caracteres.');
            formErrors = true;
        }

        if (!isEmail(email)) {
            toast.error('Email inválido.');
            formErrors = true;
        }

        if (!isInt(String(idade))) {
            toast.error('Idade inválida.');
            formErrors = true;
        }

        if (!isFloat(String(peso))) {
            toast.error('Peso inválido.');
            formErrors = true;
        }

        if (!isFloat(String(altura))) {
            toast.error('Altura inválida.');
            formErrors = true;
        }

        if (formErrors) return;

        try {
            setIsLoading(true);
            if (id) {
                await axios.put(`/alunos/${id}`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura,
                });
                toast.success('Aluno editado com sucesso');
            } else {
                const { data } = await axios.post(`/alunos`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura,
                });
                history.push(`/aluno/${data.id}/edit`);
                toast.success('Aluno criado com sucesso');
            }
            setIsLoading(false);
        } catch (err) {
            const status = get(err, 'response.status', 0);
            const data = get(err, 'response.data', {});
            const errors = get(data, 'errors', []);
            if (errors.length > 0) {
                errors.map((error) => toast.error(error));
            } else {
                toast.error('Erro Desconhecido');
            }
            if (status === 401) {
                dispatch(actions.loginFailure);
            }

            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <Title>{id ? 'Editar Aluno' : 'Novo Aluno'}</Title>

            {id && (
                <ProfilePicture>
                    {foto ? (
                        <img src={foto} alt={aluno.nome} />
                    ) : (
                        <FaUserCircle size={180} />
                    )}
                    <Link to={`/fotos/${id}`}>
                        <FaEdit size={24} />
                    </Link>
                </ProfilePicture>
            )}

            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={aluno.nome}
                    onChange={(e) =>
                        setAluno({ ...Aluno, nome: e.target.value })
                    }
                    placeholder="Nome"
                />
                <input
                    type="text"
                    value={aluno.sobrenome}
                    onChange={(e) =>
                        setAluno({ ...Aluno, sobrenome: e.target.value })
                    }
                    placeholder="Sobrenome"
                />
                <input
                    type="email"
                    value={aluno.email}
                    onChange={(e) =>
                        setAluno({ ...Aluno, email: e.target.value })
                    }
                    placeholder="Email"
                />
                <input
                    type="number"
                    value={aluno.idade}
                    onChange={(e) =>
                        setAluno({ ...Aluno, idade: e.target.value })
                    }
                    placeholder="Idade"
                />
                <input
                    type="text"
                    value={aluno.peso}
                    onChange={(e) =>
                        setAluno({ ...Aluno, peso: e.target.value })
                    }
                    placeholder="Peso"
                />
                <input
                    type="text"
                    value={aluno.altura}
                    onChange={(e) =>
                        setAluno({ ...Aluno, altura: e.target.value })
                    }
                    placeholder="Altura"
                />

                <button type="submit">Enviar</button>
            </Form>
        </Container>
    );
}

Aluno.propTypes = {
    match: PropTypes.shape({}).isRequired,
};

export default Aluno;
