import styled from 'styled-components'

const TextInput = styled.input`
    width: 500px;
    height: 56px;
    position: relative;
    padding: 0px 16px;
    border: none;
    border-radius: 4px;
    font-family: 'Gotham SSm A', 'Gotham SSm B', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    background-color: transparent;
    color: white;
    outline: none;
    box-shadow: 0px 4px 20px 0px transparent;
    background-color: rgba(255,255,255,0.3);
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out, 0.1s padding ease-in-out;
    -webkit-appearance: none;

    &:hover {
        background-color: rgba(255, 255, 255, 0.45);
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.05);
    };
};
`

export default TextInput;