import React, { Component } from 'react';
import 'typeface-roboto';
import { Grid, LinearProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchItineraries } from '../../store/actions/itineraryActions';
// import { fetchActivities } from '../../store/actions/activityActions';

export class Itineraries extends Component {

    state = {
        itineraries: null,
        activities: null
       }
      
      // fetches cities from DB
      componentDidMount(){
        this.props.fetchItineraries();
        // this.props.fetchActivities();
      };
      
    render() {

        const itineraries = this.props.itineraries
        // const activities = this.props.activities

        if (itineraries !== null){
  
              return (
                <Grid item xs={12}>
                  <div>
                     
                </div>

                </Grid>
              );
              
        } else{
              return (
                <div>
                <LinearProgress color="secondary" />
                      </div>
                    )
              }
          }
      }

const mapStateToProps = (state) => {
    return {
    itineraries: state.itineraries,
    activities: state.activities
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
    fetchItineraries: itineraries => dispatch(fetchItineraries(itineraries)),
    // fetchActivities: activities => dispatch(fetchActivities(activities))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)