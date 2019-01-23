import React from 'react'

import * as URLs from './../URLs'

import GenericButton from './styled/GenericButton'
import HeaderText from './styled/HeaderText'
import SegmentWrapper from './styled/SegmentWrapper';
//import SegmentWrapper from './styled/SegmentWrapper'

function SpinButton(props) {
	if (props.pickedShow != null) {
		return (
			<GenericButton className="spin-button" onClick={props.spin}>Spin</GenericButton>
		);
	} else {
		return (null);
	}
}

/*
function Seasons(props) {
	const numSeasons = props.numSeasons;
	let seasonColumns = Array(0);
	if (numSeasons != null) {
		for (let i = 1; i <= numSeasons; i++) {
			seasonColumns.push (
				<div key={i} className={`season-column ${(i === props.pickedSeason ? "picked-season" : "")}`}>
					<p>
					{(i === props.pickedSeason ? '--> ' : '')}
					Season {i}
					</p>
				</div>
			);
		}
		return (seasonColumns);
	} else {
		return (null);
	}
}

function Episodes(props) {
	const numEpisodes = props.numEpisodes;
	let episodeColumns = Array(0);
	if (numEpisodes != null) {
		for (let i = 0; i < numEpisodes; i++) {
			episodeColumns.push (
				<div key={i} className={`episode-column ${(i === props.pickedEpisode ? "picked-episode" : "")}`}>
					<p>
					{(i === props.pickedEpisode ? '--> ' : '')}
					{i + 1}. {props.seasonEpisodesData[i].name}
					</p>
				</div>
			);
		}
		return (episodeColumns);
	} else {
		return (null);
	}
}
*/

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
		return (
			<div className="episode-info-inner">
				<HeaderText fatpadding>
					<h2>Your pick is</h2>
					<h1>{title}</h1>
				</HeaderText>
				{stillImage}
				<HeaderText fatpadding>
					<h2>{showName}</h2>
					<h2>Season {seasonNumber}</h2>
					<h3>Episode {episodeNumber}</h3>
				</HeaderText>
				{props.showSummary ? 
					<SegmentWrapper rounded>
						<p>
							{overview}
						</p>
					</SegmentWrapper>
				: null}
				<GenericButton onClick={() => props.toggleSummary()}>{props.showSummary ? 'Hide summary' : 'Show summary'}</GenericButton>
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
			showSummary: false,
		});
	}

	pickedShowText() {
		return (
			<p>
				{this.props.pickedShow.name}
			</p>
		);
	}

	pickedShowImg() {
		if (this.props.pickedShow.poster_path != null) {
			const posterURL = this.props.pickedShow.poster_path;
			return (
				<img src={URLs.IMAGES+posterURL} height="512px" alt="Picked show poster"></img>
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
					<HeaderText fatpadding>
						<h1>
							{this.pickedShowText()}
						</h1>
					</HeaderText>
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
				<div>
					{this.pickedResult()}
					<SpinButton pickedShow={this.props.pickedShow} spin={this.props.spin}/>
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
				<div className="episode-info">
					<Episode pickedShow={this.props.pickedShow} pickedEpisodeData={this.props.pickedEpisodeData} showSummary={this.state.showSummary} toggleSummary={this.toggleSummary.bind(this)}/>
					<SpinButton pickedShow={this.props.pickedShow} spin={this.props.spin}/>
				</div>
			);
		}
	}

	render() {
		return (
			<div className='roulette'>
				{this.renderUI()}
				<GenericButton onClick={() => this.props.newShow()}>New show</GenericButton>
			</div>
		);
	}
}

export default Roulette;