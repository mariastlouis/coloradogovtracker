import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import * as actions from '../../Actions/';
import { getSelectedCandidate } from '../../Helper/helper';
import Card from '../Card/Card.js'


class ContributionContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyDisplayed: []
    }
  }


componentWillMount() {
  if(this.props.contributions){
     const sortedContributions = this.props.contributions.sort((a, b) => {
      return b.contribution_amount - a.contribution_amount;
    });
    this.setState({currentlyDisplayed:this.props.contributions})
  }
}

componentWillReceiveProps(nextProps) {
  if(this.props != nextProps) {
     const sortedContributions = nextProps.contributions.sort((a, b) => {
      return b.contribution_amount - a.contribution_amount;
    });
    this.setState({currentlyDisplayed: nextProps.contributions})
  }
}

  searchContributors = (event) => {
    let contributions = this.props.contributions;
    let searchValue = event.toUpperCase();
    let contributionFilter = contributions.filter(contribution => contribution.donor_last.toUpperCase().includes(searchValue))
  
    this.setState({currentlyDisplayed: contributionFilter})
  
  }

    sortHighContributions = () => {
    const sortedContributions = this.state.currentlyDisplayed.sort((a, b) => {
      return b.contribution_amount - a.contribution_amount;
    });
    this.setState({currentlyDisplayed: sortedContributions});
  }



  mapContributions = (contributions, index) => {
    if(contributions) {
      

      const contributionMap = contributions.map((contribution, index) => {
        return (
          <Card 
            id = {contribution.id}
            amount = {contribution.contribution_amount}
            firstName = {contribution.donor_first}
            lastName = {contribution.donor_last}
            amount = {contribution.contribution_amount}
            // city = {contribution.donor_city}
            // state = {contribution.donor_state}
            // zip = {contribution.donor_zip}
            date = {contribution.contribution_date}
            // employer = {contribution.donor_employer}
            occupation = {contribution.donor_occupation}
            // contributionType = {contribution.contribution_type} 
            />
        )
      })
        return contributionMap;
    }
  }

  render () {
    return (
      <div className = "contribution-container">
        <button onClick = {this.sortHighContributions}>Highest Contributions</button>
         <div className = "search-bar">
          <input 
            className = "search-field"
            onChange = {event => this.searchContributors(event.target.value)}
            type = "text"
            placeholder = "Search Contributors" />
        </div>
         <div> {this.mapContributions(this.state.currentlyDisplayed)}</div> 
      </div>
    )
  }
}

export default (ContributionContainer)