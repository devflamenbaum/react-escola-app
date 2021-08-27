import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading/index';
import { Title, Form } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/action';

function Fotos({ match }) {
    const id = get(match, 'params.id', '');
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false);
    const [Foto, setFoto] = React.useState('');

    React.useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/alunos/${id}`);
                setFoto(get(data, 'Fotos[0].url', ''));
                setLoading(false);
            } catch (err) {
                toast.error('Ocorreu um erro ao Obter imagem');
                setLoading(false);
                history.push('/');
            }
        };

        getData();
    }, []);

    const handleChange = async (e) => {
        const foto = e.target.files[0];
        const fotoURL = URL.createObjectURL(foto);
        setFoto(fotoURL);

        const formData = new FormData();
        formData.append('aluno_id', id);
        formData.append('foto', foto);

        try {
            setLoading(true);
            await axios.post('/fotos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Sucesso ao enviar a foto');
            setLoading(false);
        } catch (err) {
            setLoading(false);
            const { status } = get(err, 'response', '');
            toast.error('Erro ao enviar a foto');

            if (status === 401) {
                dispatch(actions.loginFailure());
            }
        }
    };
    return (
        <Container>
            <Loading isLoading={loading} />
            <Title>Fotos</Title>

            <Form>
                <label htmlFor="foto">
                    {Foto ? <img src={Foto} alt="foto" /> : 'Selecionar'}
                    <input type="file" id="foto" onChange={handleChange} />
                </label>
            </Form>
        </Container>
    );
}

Fotos.propTypes = {
    match: PropTypes.shape({}).isRequired,
};

export default Fotos;
