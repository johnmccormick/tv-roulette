import React from 'react'

import MainHeader from './components/MainHeader'
import Search from './components/Search'
import Roulette from './components/Roulette'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputValue: '',
      searchString: null,
      numSearchResults: null,
      searchResults: null,
      pickedShow: null,
      numSeasons: null,
      pickedSeason: null,
      seasonOffset: null,
      numEpisodes: null,
      pickedEpisode: null
    }
  }

  updateSearch(searchString) {
    this.setState ({
      searchString: searchString
    }, () => {
      this.searchShow();
    });
  }

  searchShow = async () => {
    const showToSearch = this.state.searchString;
    const api_call = await fetch('/api/search?name='+showToSearch);
    const data = await api_call.json();
    if (data.total_results > 0) {
      this.setState({
        numSearchResults: data.results.length,
        searchResults: data.results,
      })
    } else {
      this.setState({
        numSearchResults: 0,
        searchResults: null,
      })
    }
  }

  pickShow(i) {
    const searchResults = this.state.searchResults;
    this.setState({
      pickedShow: searchResults[i],
    }, () => {
      this.clearSearch()
    });
  }

  clearSearch() {
    this.setState({
      searchResults: null,
      numSearchResults: 0,
      searchString: '',
      searchInputValue: '',
      numSeasons: null,
      pickedSeason: null,
      seasonOffset: null,
      seasonEpisodesData: null,
      numEpisodes: null,
      pickedEpisode: null,
      pickedEpisodeData: null,
    })
  }

  updateSearchInputValue(searchString) {
    this.setState({
      searchInputValue: searchString,
    })
  }

  spin = async () => {
    const showID = this.state.pickedShow.id;
    let api_call = await fetch('/api/show?id='+ showID);
    let data = await api_call.json();
    const numSeasons = data.number_of_seasons;
    let pickedSeason = Math.random() * (numSeasons);
    pickedSeason = Math.floor(pickedSeason) + 1;
    const seasonOffset = (data.seasons.length > numSeasons ? 1 : 0);
    this.setState({
      numSeasons,
      pickedSeason,
      seasonOffset,
    });

    api_call = await fetch('/api/season?showid='+showID+'&season='+pickedSeason);
    data = await api_call.json();
    const numEpisodes = data.episodes.length;
    const seasonEpisodesData = data.episodes;
    let pickedEpisode = Math.random() * (numEpisodes);
    pickedEpisode = Math.floor(pickedEpisode);
    const pickedEpisodeData = seasonEpisodesData[pickedEpisode];
    this.setState({
      numEpisodes,
      seasonEpisodesData,
      pickedEpisode,
      pickedEpisodeData
    });
  }

  newShow() {
    this.setState({
      searchInputValue: '',
      searchString: null,
      numSearchResults: null,
      searchResults: null,
      pickedShow: null,
      numSeasons: null,
      pickedSeason: null,
      seasonOffset: null,
      numEpisodes: null,
      pickedEpisode: null
    })
  }

  render() {
    if (this.state.pickedShow === null) {
      return(
        <div className={`App ${this.state.searchInputValue.trim() === "" && this.state.searchResults === null ? "centered" : ""}`}>
          <MainHeader />
          <Search searchShow={this.searchShow} updateSearch={this.updateSearch.bind(this)} searchResults={this.state.searchResults} numSearchResults={this.state.numSearchResults} pickShow={this.pickShow.bind(this)} searchInputValue={this.state.searchInputValue} updateSearchInputValue={this.updateSearchInputValue.bind(this)} />
        </div>
      );
    } else {
      return(
        <div className="App">
        <MainHeader />
          <Roulette pickedShow={this.state.pickedShow} spin={this.spin.bind(this)} numSeasons={this.state.numSeasons} pickedSeason={this.state.pickedSeason} numEpisodes={this.state.numEpisodes} pickedEpisode={this.state.pickedEpisode} seasonEpisodesData={this.state.seasonEpisodesData} pickedEpisodeData={this.state.pickedEpisodeData} newShow={this.newShow.bind(this)}/>
        </div>
      );
    }
  }
}

export default App;