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
        {
          this.props.tracks.map(track => {
            return <Track track={track}
                          key={track.id}
                          onAdd={this.props.onAdd}
                          isRemoval={this.props.isRemoval}
                          onRemove={this.props.onRemove} />
          })
        }
      </div>
    );
  }
}

export default TrackList;
