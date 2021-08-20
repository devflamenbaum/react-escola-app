import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import {
    FaUserCircle,
    FaEdit,
    FaWindowClose,
    FaExclamation,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';
import { AlunosContainer, ProfilePicture, NovoAluno } from './styled';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';

import Loading from '../../components/Loading';

function Alunos() {
    const [alunos, setAlunos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            const resp = await axios.get('/alunos');
            setAlunos(resp.data);
            setIsLoading(false);
        }

        getData();
    }, []);
    const handleDeleteAsk = (e) => {
        e.preventDefault();
        const exclamation = e.currentTarget.nextSibling;
        exclamation.setAttribute('display', 'block');
        e.currentTarget.remove();
    };

    const handleDelete = async (e, id, index) => {
        e.persist();
        try {
            setIsLoading(true);
            await axios.delete(`/aluno/${id}/delete`);
            const novosAlunos = [...alunos];
            novosAlunos.splice(index, 1);
            setAlunos(novosAlunos);
            setIsLoading(false);
        } catch (err) {
            const status = get(err, 'response.status', 0);

            if (status === 401) {
                toast.error('Você precisa fazer login.');
            } else {
                toast.error('Ocorreu um erro.');
            }
            setIsLoading(false);
        }
    };

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <h1>Alunos</h1>

            <NovoAluno to="/aluno/" />
            <AlunosContainer>
                {alunos.map((aluno, index) => (
                    <div key={String(aluno.id)}>
                        <ProfilePicture>
                            {get(aluno, 'Fotos[0].url', false) ? (
                                <img
                                    src={aluno.Fotos[0].url}
                                    alt={aluno.nome}
                                />
                            ) : (
                                <FaUserCircle size={36} />
                            )}
                        </ProfilePicture>
                        <span>{aluno.nome}</span>
                        <span>{aluno.email}</span>

                        <Link to={`/aluno/${aluno.id}/edit`}>
                            <FaEdit size={16} />
                        </Link>

                        <Link
                            onClick={handleDeleteAsk}
                            to={`/aluno/${aluno.id}/delete`}
                        >
                            <FaWindowClose size={16} />
                        </Link>

                        <FaExclamation
                            size={16}
                            display="none"
                            cursor="pointer"
                            onClick={(e) => handleDelete(e, aluno.id, index)}
                        />
                    </div>
                ))}
            </AlunosContainer>
        </Container>
    );
}

export default Alunos;
