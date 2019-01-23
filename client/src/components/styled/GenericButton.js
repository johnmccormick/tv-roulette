import styled from 'styled-components'
import SegmentStyle from './SegmentStyle'

const GenericButton = styled.button`
    ${SegmentStyle};
    border: solid white 1px;
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
    font-size: 20px;
    padding: 7px 20px 10px;
    margin: 15px;
`

export default GenericButton;