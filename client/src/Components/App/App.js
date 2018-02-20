import React, { Component } from 'react';
import './App.css';
import CandidatesBar from '../../Containers/CandidatesBar/CandidatesBar';
import CandidateDetails from '../../Containers/CandidateDetails/CandidateDetails';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {initialCandidatesFetch, getAllContributions, getStateTotals} from '../../Helper/helper';
import * as actions from '../../Actions/';
import DataMap from '../../Containers/Map/Map'


// import { VictoryBar } from 'victory';


export class App extends Component {
  constructor() {
    super();
  }

  componentDidMount = async () => {
 
    const contributionData = await getAllContributions();

    if(!localStorage.contributions){
      const contributionData = await getAllContributions();
      localStorage.setItem('contributions', JSON.stringify(contributionData))
      this.props.handleContributions(contributionData);
    } else {
      const storageContributionData = JSON.parse(localStorage.getItem('contributions')) 
      this.props.handleContributions(storageContributionData);
    }

    if(!localStorage.expenditures){
      const expenditureData = await initialExpenditureFetch();
      localStorage.setItem('expenditures', JSON.stringify(expenditureData))
      this.props.handleExpenditures(expenditureData);
    } else {
      const storageExpenditureData = JSON.parse(localStorage.getItem('expenditures'))
      this.props.handleExpenditures(storageExpenditureData);
    }
    // const contributionData = await getAllContributions();
    const candidateData = await initialCandidatesFetch();
    const stateTotalData = await getStateTotals();

    this.props.handleStateTotals(stateTotalData)
    this.props.handleCandidates(candidateData);
    // this.props.handleContributions(contributionData);
    // localStorage.setItem('contributions', contributionData)
  }


  render () {
    return (

      <div className="App">
        <Route exact path = '/' component = {CandidatesBar} />

        <Route exaxt path = '/' component = {DataMap} />
        <Route exact path = '/' component = { BarGraph } />

        <Route path = '/candidates/:id' render = {({match}) => {
          const candidateObject = this.props.candidates;
          const {id} = match.params;

          const candidateDetail = 
          Object.keys(candidateObject).find(candidate => candidateObject[candidate].committee_id === id);
        
          return <CandidateDetails />;
          
        }} />
    
      </div>
    );
  }

}

const mapStateToProps = state => ({
  candidates: state.candidates,
  stateTotals: state.stateTotals
})

const mapDispatchToProps = dispatch => {
  return {
    handleCandidates: candidates => {
      dispatch(actions.addCandidatesToStore(candidates))
    },
    handleContributions: contributions => {
      dispatch(actions.addContributionsToStore(contributions))
    },
    handleStateTotals: stateTotals => {
      dispatch(actions.addStateTotalsToStore(stateTotals))
    },
    handleExpenditures: expenditures => {
      dispatch(actions.addExpendituresToStore(expenditures))

    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
