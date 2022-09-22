import React, { useState } from 'react';
import styled from 'styled-components';
import * as Settings from '$Settings';

const Text = ({ id, name }) => {
    const [value, setValue] = useState(Settings.get(name));

    const handleChange = (event) => {
        setValue(event.target.value);
        // Settings.set(name, input.current.checked);
    };

    //TODO Add reset button option in settings.js, css fix, instaed of chrome-... = default

    return (
        <Wrapper>
            <Input id={id} value={value} onChange={handleChange} />
            <Label type="text" htmlFor={id}></Label>
        </Wrapper>
    );
};

export default Text;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    & input {
        display: none;
    }
`;

const Input = styled.input``;

const Label = styled.textarea`
    resize: none;
    height: 25px;
    width: 350px;
    border-radius: 100px;
    border: 2px solid var(--te-purple-color-light);
    background: var(--te-black);
    color: white;
    display: flex;
    padding: 0 10px;
`;
