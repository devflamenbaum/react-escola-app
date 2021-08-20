import React, { useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

function Aluno({ match }) {
    const id = get(match, 'params.id', 0);
    const [aluno, setAluno] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Container>
            <h1>{id ? 'Editar Aluno' : 'Novo Aluno'}</h1>

            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={aluno}
                    onChange={(e) =>
                        setAluno({ ...Aluno, nome: e.target.value })
                    }
                    placeholder="Nome"
                />
                <input
                    type="email"
                    value={aluno}
                    onChange={(e) =>
                        setAluno({ ...Aluno, email: e.target.value })
                    }
                    placeholder="Email"
                />
                <input
                    type="number"
                    value={aluno}
                    onChange={(e) =>
                        setAluno({ ...Aluno, idade: e.target.value })
                    }
                    placeholder="Idade"
                />
                <input
                    type="text"
                    value={aluno}
                    onChange={(e) =>
                        setAluno({ ...Aluno, peso: e.target.value })
                    }
                    placeholder="Peso"
                />
                <input
                    type="text"
                    value={aluno}
                    onChange={(e) =>
                        setAluno({ ...Aluno, altura: e.target.value })
                    }
                    placeholder="Altura"
                />
                <input
                    type="text"
                    value={aluno}
                    onChange={(e) =>
                        setAluno({ ...Aluno, nome: e.target.value })
                    }
                    placeholder="Nome"
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
