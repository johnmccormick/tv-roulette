import styled from 'styled-components'
import SegmentStyle from './SegmentStyle'

const SegmentWrapper = styled.div`
  ${SegmentStyle};
  padding: 20px;
  border-radius: ${props => props.rounded ? '3px' : '0'};
`
export default SegmentWrapper;