import React from 'react'

import * as URLs from './../URLs'

const WAIT_INTERVAL = 600;
const ENTER_KEY = 13;
const MAX_RESULTS = 7;

function SearchInput(props) {
  return (
    <input className="text-input" name="search-input" onChange={props.handleSearchChange.bind(this)} on onFocus={props.handleFocus.bind(this)} onKeyDown={props.handleSearchKeyDown.bind(this)} value={props.searchInputValue} label="Show" type="text" placeholder="Pick a show"/>
  );
}

class SearchResults extends React.Component {
  searchedShowText(i) {
    return (
      <p className="search-title">
        {this.props.searchResults[i].original_name}
      </p>
    );
  }
  
  searchedShowYear(i) {
    var date = this.props.searchResults[i].first_air_date;

    if (date) {
      var year = date.substring(0, 4);

      return (
        <p className="search-year">
          {year}
        </p>
      );
    } else {
      return (
        <p className="search-year">
          ?
        </p>
      ) 
    }
    
  }

  searchedShowImg(i) {
    if (this.props.searchResults[i].poster_path != null) {
      return (
        <img className="button-img" src={URLs.IMAGES+this.props.searchResults[i].poster_path} alt="TV Poster" />
      );
    } else {
      return (
        <div className="button-img" />
      );
    }
  }

  render() {
    let numSearchResults = this.props.numSearchResults;
    if (numSearchResults > MAX_RESULTS) { 
      numSearchResults = MAX_RESULTS; 
    }
    let resultRows = Array(0);
    if (numSearchResults > 0) {
      resultRows.push (
        <div className="search-result result-header" key='0'>
          <p>Search Results</p>
        </div>
      );
      for (let i = 0; i < numSearchResults; i++)
      {
        resultRows.push (
          <div key={i+1}>
            <button className="search-result result-button" onClick={() => this.props.pickShow(i)}>
                {this.searchedShowImg(i)}
                {this.searchedShowText(i)}
                {this.searchedShowYear(i)}
            </button>
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
      displaySearch: false
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

  handleFocus(e) {
    this.setState({displaySearch: true})
  }

  render() {
    return (
      <div className="search">
        <SearchInput handleSearchChange={this.handleSearchChange.bind(this)} handleFocus={this.handleFocus.bind(this)} handleSearchKeyDown={this.handleSearchKeyDown.bind(this)} searchInputValue={this.props.searchInputValue} />
        {this.state.displaySearch ? <SearchResults searchResults={this.props.searchResults} numSearchResults={this.props.numSearchResults} pickShow={this.pickShow.bind(this)}/> : null}
      </div>
    );
  }
}

export default Search;