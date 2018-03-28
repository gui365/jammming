import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
  constructor(props){
    super(props);
    this.removeTrack = this.removeTrack.bind(this);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="TrackList">
// I've done a lot of reasearch and debugging but I really can't figure out this part...
// TypeError: Cannot read property 'map' of undefined
      {this.props.tracks.map(track => {
          return <Track track={track}
                        key={track.id}
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove} />
        })
      }
      </div>
    );
  }
}

export default TrackList;
