import React, { Component } from 'react';
import Rating from 'react-rating';
import {QuizPart2} from './quiz2.js';
import { PlaylistComponent } from "./PlaylistComponent";

export class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSure: true,
      
      acousticness: 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      loudness: 0,
      valence: 0,
      tempo: 0,
      acousticnessWeight: 0,
      danceabilityWeight: 0,
      energyWeight: 0,
      instrumentalnessWeight: 0,
      loudnessWeight: 0,
      valenceWeight: 0,
      tempoWeight: 0,

      num_songs:0,
      inputsAcc:[],

      songData:{},

      finalData:null,
      final:false

    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({ name: event.target.value });
  // }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
  //     .then(response => response.json())
  //     .then(state => this.setState(state));
  // }

  organizeInputs = () => {
    return ({
      acousticness: this.state.acousticness,
      danceability: this.state.danceability,
      energy: this.state.energy,
      instrumentalness: this.state.instrumentalness,
      loudness: this.state.loudness,
      valence: this.state.valence,
      tempo: this.state.tempo,
      acousticnessWeight: this.state.acousticnessWeight,
      danceabilityWeight: this.state.danceabilityWeight,
      energyWeight: this.state.energyWeight,
      instrumentalnessWeight: this.state.instrumentalnessWeight,
      loudnessWeight: this.state.loudnessWeight,
      valenceWeight: this.state.valenceWeight,
      tempoWeight: this.state.tempoWeight,
      numSongs:this.props.songCount
    })
  }

  callGenerateSong = () => {
    if(this.state.isloading){
      return
    }
    this.setState({isloading:true})
    fetch('http://localhost:3001/getRandomSong')
    .then((response) => {
      return response.json();
    })
    .then((track) => {
      let data = track.tracks
      console.log(data)
      this.setState({isloading:false,
        songData:data,
        hasSongsToDisplay: true,
        isSure:false,

    })
  })
}

   generatePlaylist = scoresAndWeights => {
     const { numSongs, acousticness, acousticnessWeight, danceability, danceabilityWeight, energy, energyWeight, 
      instrumentalness, instrumentalnessWeight, loudness, loudnessWeight, valence, valenceWeight, tempo, tempoWeight } = scoresAndWeights;
      console.log(scoresAndWeights);
    if(this.state.isloading){
      return
    }
    this.setState({isloading:true})
    fetch(`http://localhost:3001/genPlaylist?numSongs=${encodeURIComponent(numSongs)}&acousticness=${encodeURIComponent(acousticness)}&acousticnessWeight=${encodeURIComponent(acousticnessWeight)}
    &danceability=${encodeURIComponent(danceability)}&danceabilityWeight=${encodeURIComponent(danceabilityWeight)}&energy=${encodeURIComponent(energy)}&energyWeight=${encodeURIComponent(energyWeight)}&instrumentalness=${encodeURIComponent(instrumentalness)}
    &instrumentalnessWeight=${encodeURIComponent(instrumentalnessWeight)}&loudness=${encodeURIComponent(loudness)}&loudnessWeight=${encodeURIComponent(loudnessWeight)}&valence=${encodeURIComponent(valence)}&valenceWeight=${encodeURIComponent(valenceWeight)}
    &tempo=${encodeURIComponent(tempo)}&tempoWeight=${encodeURIComponent(tempoWeight)}`)
    .then((response) => {
      console.log(response)
      return response.json();
    })
    .then((playlist) => {
      // let data = track.tracks
      console.log(playlist)
      this.setState({isloading:false,
        finalData:playlist,
        final:true

    })
  })
   }



  sure = () => {
    const buttonStyle = {
      color: 'black',
      border: 'none',
      backgroundColor: '#e7e7e7',
      margin: '15px',
      borderRadius: '5px',
      padding: '15px 32px',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'inline-block',
      fontSize: '16px'
    }
    const rowStyle = {
      margin: '15px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }
    const columnStyle = {
      margin: '20px',
      display: 'flex',
      flexDirection: 'column'
    }
    return(<>
  <div style={rowStyle}><h1>Rate the following to reflect how you'd like your music.</h1></div>
  <div style={{...rowStyle, marginTop: '-20px'}}><h5>Only select qualities you care about.</h5></div>
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
  <div style={rowStyle}>
  <div style={columnStyle}>
  <h3> Acousticness Level </h3>
  <Rating initialRating={this.state.acousticness} start={0} stop={10} onChange={value => {this.setState({acousticness:value})}}/>
  <h5> How important is acousticness to you? </h5>
  <Rating initialRating={this.state.acousticnessWeight} start={0} stop={10} onChange={value => {this.setState({acousticnessWeight:value})}}/>
 
  <h3> Danceability  </h3>
  <Rating initialRating={this.state.danceability} start={0} stop={10} onChange={value => {this.setState({danceability:value})}}/>
  <h5> How important is danceability to you? </h5>
  <Rating initialRating={this.state.danceabilityWeight} start={0} stop={10} onChange={value => {this.setState({danceabilityWeight:value})}}/>

  <h3> Energy Level </h3>
  <Rating initialRating={this.state.energy} start={0} stop={10} onChange={value => {this.setState({energy:value})}}/>
  <h5> How important is the energy level to you? </h5>
  <Rating initialRating={this.state.energyWeight} start={0} stop={10} onChange={value => {this.setState({energyWeight:value})}}/>

  <h3> Instrumentalness (less vocals)</h3>
  <Rating initialRating={this.state.instrumentalness} start={0} stop={10} onChange={value => {this.setState({instrumentalness:value})}}/>
  <h5> How important is the instrumentalness to you? </h5>
  <Rating initialRating={this.state.instrumentalnessWeight} start={0} stop={10} onChange={value => {this.setState({instrumentalnessWeight:value})}}/>
</div>


  <div style={columnStyle}>
  <h3> Happiness Level </h3>
  <Rating initialRating={this.state.valence} start={0} stop={10} onChange={value => {this.setState({valence:value})}}/>
  <h5> How important is happiness level to you? </h5>
  <Rating initialRating={this.state.valenceWeight} start={0} stop={10} onChange={value => {this.setState({valenceWeight:value})}}/>

  <h3> Tempo (low to high)</h3>
  <Rating initialRating={this.state.tempo} start={0} stop={10} onChange={value => {this.setState({tempo:value})}}/>
  <h5> How important is the tempo to you? </h5>
  <Rating initialRating={this.state.tempoWeight} start={0} stop={10} onChange={value => {this.setState({tempoWeight:value})}}/>

  <h3> Loudness </h3>
  <Rating initialRating={this.state.loudness} start={0} stop={10} onChange={value => {this.setState({loudness:value})}}/>
  <h5> How important is the loudness to you? </h5>
  <Rating initialRating={this.state.loudnessWeight} start={0} stop={10} onChange={value => {this.setState({loudnessWeight:value})}}/>
  </div>

  </div>
  <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
  <div style={{ display: 'flex', justifyContent: 'center'}}><button style={buttonStyle} onClick={() => {this.generatePlaylist(this.organizeInputs())}}>Generate my playlist</button></div>
  </div></div>
</>)}




  render() {
    if(this.state.final){
      return (<>
        <h3>Here is your result! Enjoy your new playlist.</h3>
        <PlaylistComponent playlist={this.state.finalData} />
      </>)
      
    }

    return (
      <div style={{ display: "inline-block" }}>
        {!this.props.isSure && !this.state.hasSongsToDisplay && this.callGenerateSong()}
      {this.state.isSure && this.sure()}
      {this.state.hasSongsToDisplay && 
            <QuizPart2 songData={this.state.songData} numbersongs={this.props.songCount} generatePlaylist={this.generatePlaylist}/>}
      </div>
    )}
}