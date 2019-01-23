import React from 'react'

// import * as URLs from './../URLs'

import TextInput from './styled/TextInput'
import SearchWrapper from './styled/SearchWrapper'
import SegmentWrapper from './styled/SegmentWrapper'
import SearchResultButton from './styled/SearchResultButton'

const WAIT_INTERVAL = 600;
const ENTER_KEY = 13;
const MAX_RESULTS = 7;

function SearchInput(props) {
  return (
    <TextInput name="search-input" onChange={props.handleSearchChange.bind(this)} onKeyDown={props.handleSearchKeyDown.bind(this)} value={props.searchInputValue} label="Show" type="text" placeholder="Pick a show"/>
  );
}

class SearchResults extends React.Component {
  searchedShowText(i) {
    return (
      <p key={i}>
        {this.props.searchResults[i].name}
      </p>
    );
  }
  
/*
  searchedShowImg(i) {
    if (this.props.searchResults[i].poster_path != null) {
      return (
        <img src={URLs.IMAGES+this.props.searchResults[i].poster_path} height="256px" alt="Search result poster"></img>
      );
    } else {
      return (null);
    }
  }
*/

  render() {
    let numSearchResults = this.props.numSearchResults;
    if (numSearchResults > MAX_RESULTS) { 
      numSearchResults = MAX_RESULTS; 
    }
    let resultRows = Array(0);
    if (numSearchResults > 0) {
      resultRows.push (
        <SegmentWrapper>
          <p>Search Results</p>
        </SegmentWrapper>
      );
      for (let i = 0; i < numSearchResults; i++)
      {
        resultRows.push (
          <div>
            <SearchResultButton key={i} onClick={() => this.props.pickShow(i)}>
              {this.searchedShowText(i)}
            </SearchResultButton>
          </div>
        );
      }
      return (resultRows);
    } else {
      return (null);
    }
  }
}


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: null,
    }
  }

  componentWillMount() {
    this.timer = null;
  }

  handleSearchChange(event) {
    const searchString = document.getElementsByName('search-input')[0].value;
    this.props.updateSearchInputValue(searchString);
    this.setState({
      searchString,
    });
    clearTimeout(this.timer);
    this.timer = setTimeout(this.triggerSearch.bind(this), WAIT_INTERVAL);
  }

  handleSearchKeyDown(event) {
    if (event.keyCode === ENTER_KEY) {
        clearTimeout(this.timer);
        this.triggerSearch();
      }
    }

  triggerSearch() {
    this.props.updateSearch(this.state.searchString);
  }

  clearSearchInput() {
    this.searchInput.value = '';
  }

  pickShow(i) {
    this.props.pickShow(i);
    clearTimeout(this.timer);
  }

  render() {
    return (
      <SearchWrapper>
        <SearchInput handleSearchChange={this.handleSearchChange.bind(this)} handleSearchKeyDown={this.handleSearchKeyDown.bind(this)} searchInputValue={this.props.searchInputValue} />
        <SearchResults searchResults={this.props.searchResults} numSearchResults={this.props.numSearchResults} pickShow={this.pickShow.bind(this)}/>
      </SearchWrapper>
    );
  }
}

export default Search;