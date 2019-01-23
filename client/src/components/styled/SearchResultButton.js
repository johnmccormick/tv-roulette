import styled from 'styled-components'
import SegmentStyle from './SegmentStyle'

const SearchResultButton = styled.button`
    ${SegmentStyle};
    font-family: inherit;
    font-size: 20px;
    color: white;
    padding: 13px 10px 17px;
    border: 0;
    margin: 0;
    width: 500px;
    background: rgba(0, 0, 0, 0.4) repeat scroll 0% 0%;
    cursor: pointer;
`
export default SearchResultButton;