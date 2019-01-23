import styled from 'styled-components'

const HeaderText = styled.div`

  color: white;
  
  padding: ${props => props.fatpadding ? '20px' : '0px'};
  display: ${props => props.inline ? 'inline-block' : 'block'};

  h1 {
    font-size: 35px;
  };
`

export default HeaderText;