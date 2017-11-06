/* @flow */
import * as React from 'react';
import { withStyles, withTheme } from 'material-ui/styles';
import Layout from '../components/Layout.js';
import GoogleMapReact from 'google-map-react';
import { geolocated } from 'react-geolocated';
import withRoot from '../components/withRoot';

const UserLocationMarker = (props:{lat:number, lng:number}) => (
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
      <circle cx={10} cy={10} r={5} fill="none" stroke="#007ac7" strokeWidth={5}/>
    </svg>
  </div>
);


const MapPage = (props:{classes:Object}) => (
  <Layout>
    <GoogleMapReact
      bootstrapURLKeys={{key: "AIzaSyAJU4lTS2jKN-0NKs2M6CRiMDmFBPzncKg"}}
      center = {{ lat: 30.164052, lng: -97.721557 }}
      defaultZoom = {18}
    >
      {
        props.coords &&
        <UserLocationMarker
          lat={props.coords.latitude}
          lng={props.coords.longitude}
        />
      }
    </GoogleMapReact>
  </Layout>
);

const styles = theme => ({
});

export default withRoot((withTheme()(withStyles(styles)(geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(MapPage)))));
