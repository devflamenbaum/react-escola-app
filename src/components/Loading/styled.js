import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;

    div {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: rgba(0, 0, 0, 0.8);
    }

    span {
        z-index: 200;
    }
`;
