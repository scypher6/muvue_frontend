import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class LineChart extends Component {


    chartData = () => {

        /**************** TOP LIKED MOVIES ******************/
        let toplikedMovies = this.props.topLiked.map( value => {
            let newVal = value.props.children[1]
            return newVal.slice(0, newVal.length-4)
        })

        let numLikes = this.props.topLiked.map( value => {
            let newVal = value.props.children[1]
            return parseInt(newVal.slice(newVal.length-3, newVal.length-1))
        })

        /**************** TOP FAVED MOVIES ******************/

        let topFavedMovies = this.props.topFaved.map( value => {
            let newVal = value.props.children[1]
            return newVal.slice(0, newVal.length-4)
        })

        let numFavs = this.props.topFaved.map( value => {
            let newVal = value.props.children[1]
            return parseInt(newVal.slice(newVal.length-3, newVal.length-1))
        })

        const data = {
            labels: toplikedMovies,
            datasets: [
                {
                    label: 'Most Favorited movies',
                     data: numFavs,
                     borderColor: ['darkorchid'],
                     backgroundColor: ['mediumpurple'],
                     pointBackgroundColor: ['black'],
                     pointBorderColor: ['darkorchid']
                    },
                    {
                     label: 'Most liked movies',
                     data: numLikes,
                     borderColor: ['green'],
                     backgroundColor: ['lightseagreen'],
                     pointBackgroundColor: ['black'],
                     pointBorderColor: ['green']
                }

            ]
        }

        return data;
    }
    
    
    render() {
            // console.log("PROPS", this.props.topLiked)
            return (
                <div className='chart'>  
                    <Line data={this.chartData} />
                </div>
            )
}


}