import React, { useState } from 'react';
import styled from 'styled-components';
import * as Settings from '$Settings';

const MultiText = ({ id, name }) => {
    // const [value, setValue] = useState(Settings.get(name));

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    //     // Settings.set(name, input.current.checked);
    // };

    return (
        <Wrapper>
            <Input type="text" id={id} />
            <Input type="text" id={id} />
        </Wrapper>
    );
};

export default MultiText;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    resize: none;
    height: 25px;
    width: 350px;
    border: 2px solid var(--te-purple-color-light);
    background: var(--te-black);
    color: white;
    display: flex;
    padding: 0 10px;
`;
