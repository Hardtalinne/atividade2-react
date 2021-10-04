import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const GridColumns = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;

`;

export const Column = styled.div`
    width: 200px; 
`;

export const Image = styled.img`
`;

export const Description = styled.p`
`;

export const Heading = styled.h3`
`;

export const Text = styled.h4`
`;
