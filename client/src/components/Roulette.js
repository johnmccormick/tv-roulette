import React from 'react'

import * as URLs from './../URLs'

function SpinButton(props) {
	if (props.again === false) {
		return (
			<div className="generic-button spin-button" onClick={props.spin}><p>Spin</p></div>
		);
	} else {
		return (
			<div className="generic-button spin-button" onClick={props.spin}><p>Spin again</p></div>
		);
	}
}
function Episode(props) {
	const episodeData = props.pickedEpisodeData;
	if (episodeData != null)
	{
		const title = episodeData.name;
		const stillURL = episodeData.still_path;
		const stillImage = (stillURL != null ? <img src={URLs.IMAGES+stillURL} alt="Episode still" /> : null);
		const seasonNumber = episodeData.season_number;
		const episodeNumber = episodeData.episode_number;
		const overview = episodeData.overview;
		const showName = props.pickedShow.name;
		//const airDate = episodeData.air_date;
		return (
			<div className="episode-container">
				<div className="episode-header">
					<h2>Your pick is:</h2>
					<div className="header-text">
						<h1>{title}</h1>
					</div>
				</div>
				<div className="episode-info">
					<div className="episode-image">
						{stillImage}
					</div>
					<div className="episode-text">
						<h2 className="episode-show-name">{showName}</h2>
						<h3 className="episode-season">Season {seasonNumber}, Episode {episodeNumber}</h3> 
						<p>
							{overview}
						</p>
					</div>
				</div>
			</div>
		);
	} else {
		return (null);
	}
}

class Roulette extends React.Component {
	constructor(props) {
		super(props);
		this.state = ({
			showSummary: true,
		});
	}

	pickedShowImg() {
		if (this.props.pickedShow.poster_path != null) {
			const posterURL = this.props.pickedShow.poster_path;
			return (
				<img src={URLs.IMAGES+posterURL} alt="Picked show poster"></img>
			);
		} else {
			return (null);
		}
	}

	pickedResult() {
		if (this.props.pickedShow != null) {
			return (
				<div className='picked-show-result'>
					{this.pickedShowImg()}
					<h1>
						{this.props.pickedShow.name}
					</h1>
				</div>
			);
		} else {
			return '';
		}
	}

	toggleSummary() {
		const showSummary = !this.state.showSummary;
		console.log(showSummary);
		this.setState({
			showSummary: showSummary,	
		})
	}

	renderUI() {
		if (this.props.pickedEpisodeData === null) {
			return (
				<div className="roulette-content">
					{this.pickedResult()}
					<SpinButton pickedShow={this.props.pickedShow} spin={this.props.spin} again={false}/>
				</div>

				/*
				<div className="season-list">
					<Seasons numSeasons={this.props.numSeasons} pickedSeason={this.props.pickedSeason} />
				</div>
				<div className="episode-list">
					<Episodes numEpisodes={this.props.numEpisodes} pickedEpisode={this.props.pickedEpisode} seasonEpisodesData={this.props.seasonEpisodesData} />
				</div>
				*/
			);
		} else {
			return (
				<div className="episode">
					<Episode pickedShow={this.props.pickedShow} pickedEpisodeData={this.props.pickedEpisodeData} showSummary={this.state.showSummary} toggleSummary={this.toggleSummary.bind(this)}/>
					<SpinButton pickedShow={this.props.pickedShow} spin={this.props.spin} again={true}/>
				</div>
			);
		}
	}

	render() {
		return (
			<div className='roulette'>
				{this.renderUI()}
				<div className="generic-button" onClick={() => this.props.newShow()}><p>Back</p></div>
			</div>
		);
	}
}

export default Roulette;