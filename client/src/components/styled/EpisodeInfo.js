import styled from 'styled-components'
import SegmentStyle from './SegmentStyle'

const EpisodeInfo = styled.div`
    display: grid;
    grid-template-rows: 2;
    margin: 10px;

    .grid-box-1 {
        grid-row: 1
    }

    .grid-box-inner {
        grid-row: 2;
        display: grid;
        grid-template-columns: 2;
        ${SegmentStyle};
        border-radius: 3px;
        padding: 15px;
    }

    .grid-box-inner-1 {
        grid-column: 1;
    }
    .grid-box-inner-2 {
        grid-column: 2;
        padding: 5px 20px;
    }
`
export default EpisodeInfo;