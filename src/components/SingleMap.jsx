import React, { Component } from 'react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <iframe name="mapframe" width="425" height="350"
          src="https://www.google.com/maps?z=11&amp;f=d&amp;output=embed&amp;ll=40.7902,-73.9597">
        </iframe>
      </div>
    );
  }
}

export default SimpleMap;