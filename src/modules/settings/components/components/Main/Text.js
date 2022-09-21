import React, { useRef } from 'react';
import styled from 'styled-components';
import * as Settings from '$Settings';

const Text = ({ id, name }) => {
    const input = useRef();

    console.info('[te]', Settings.get(name));

    const handleChange = () => {
        // Settings.set(name, input.current.checked);
    };

    //TODO Add reset button option in settings.js, css fix, instaed of chrome-... = default

    return (
        <Wrapper>
            <Input onChange={handleChange} ref={input} id={id} />
            <Label value={Settings.get(name)} htmlFor={id}></Label>
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
    border: 2px solid var(--te-gray-color-dark);
    background: var(--te-black);
    color: white;
    display: flex;
    padding: 0 10px;
`;
