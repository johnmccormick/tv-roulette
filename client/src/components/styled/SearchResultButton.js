import styled from 'styled-components'
import SegmentStyle from './SegmentStyle'

const SearchResultButton = styled.button`
    ${SegmentStyle};
    display: grid;
    grid-template-columns: 50px 410px;
    grid-template-rows: 1fr 1fr;
    align-items: start;

    font-family: inherit;
    font-size: 20px;
    color: white;
    padding: 5px;
    border: 0;
    margin: 1px 0;
    width: 500px;
    background: rgba(0, 0, 0, 0.4) repeat scroll 0% 0%;
    cursor: pointer;

    .grid-box-1 {
        grid-column: 1;
        grid-row: 1 / span 2;
    }
    .grid-box-2 {
        grid-column: 2;
        grid-row: 1;
    }
    .grid-box-3 {
        font-size: 70%;
        grid-column: 2;
        grid-row: 2;
    }

    img {
        height: 60px;
    }
`
export default SearchResultButton;