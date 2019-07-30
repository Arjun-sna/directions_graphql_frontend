import React, { useState } from 'react';
import Script from 'react-load-script';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LocationSearch from '~/components/locationSearch';
import styles from './styles.scss';
import { GET_DIRECTION } from '../app/gqlQueries';
import Loader from '~/components/loader';
import RouteDetails from './components/routeDetails';

const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`;
const fetchGraphqlError = (errorObject = {}) => {
  if (errorObject.graphQLErrors && errorObject.graphQLErrors.length) {
    return errorObject.graphQLErrors[0].message;
  }
}

export default () => {
  const [isGoogleLibraryScriptLoaded, setGoogleLibraryScriptLoaded] = useState(false);
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndpoint] = useState(null);
  const getQueryVariables = () => ({
    coordinates: {
      startLat: startPoint.latitude,
      startLng: startPoint.longitude,
      endLat: endPoint.latitude,
      endLng: endPoint.longitude
    },
    travelMode: "driving"
  })
  const handleScriptLoad = () => setGoogleLibraryScriptLoaded(true);
  
  if (!isGoogleLibraryScriptLoaded) {
    return (
      <div>
        <Script
          url={scriptUrl}
          onLoad={handleScriptLoad}
        />
        Loading...
      </div>
    )
  }

//   const response = {"data":{"direction":{"fare":null,"tripData":{"arrival":{"address":"circle, 2nd floor, Hoodi, Bengaluru, Karnataka 560048, India","location":{"latitude":12.9900018,"longitude":77.71328400000002,"__typename":"Coords"},"__typename":"OtherPointDetails"},"departure":{"address":"38, Intermediate Ring Rd, Koramangala 4th Block, Koramangala, Bengaluru, Karnataka 560095, India","location":{"latitude":12.9352392,"longitude":77.6244486,"__typename":"Coords"},"__typename":"OtherPointDetails"},"tripDuration":{"formattedValue":"38 mins","rawValue":2301,"__typename":"TypedData"},"tripDistance":{"formattedValue":"17.5 km","rawValue":17467,"__typename":"TypedData"},"__typename":"TripData"},"steps":[{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"0.5 km","rawValue":492,"__typename":"TypedData"},"stepDuration":{"formattedValue":"1 min","rawValue":71,"__typename":"TypedData"},"startLocation":{"latitude":12.9900018,"longitude":77.71328400000002,"__typename":"Coords"},"endLocation":{"latitude":12.9877838,"longitude":77.70946789999999,"__typename":"Coords"},"polyline":"obhnA_kiyMZh@^~@Vf@Xj@LXNh@ANAL@H@JDHFJJRTh@x@fB^LHDLHLVXb@f@nA\\l@@DDD?@JPJN","stepInstruction":"Head <b>southwest</b> on <b>Hoodi Main Rd</b><div style=\"font-size:0.9em\">Pass by Esskay (on the right)</div>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"0.3 km","rawValue":327,"__typename":"TypedData"},"stepDuration":{"formattedValue":"1 min","rawValue":52,"__typename":"TypedData"},"startLocation":{"latitude":12.9877838,"longitude":77.70946789999999,"__typename":"Coords"},"endLocation":{"latitude":12.9851627,"longitude":77.7082751,"__typename":"Coords"},"polyline":"stgnAeshyMBFNR@BJJJHVPj@VzB~@pBp@ZH@@b@DJBTBT@`@@NA","stepInstruction":"Keep <b>right</b> to stay on <b>Hoodi Main Rd</b><div style=\"font-size:0.9em\">Pass by FRESHETERIA (on the right)</div>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"0.6 km","rawValue":562,"__typename":"TypedData"},"stepDuration":{"formattedValue":"1 min","rawValue":88,"__typename":"TypedData"},"startLocation":{"latitude":12.9851627,"longitude":77.7082751,"__typename":"Coords"},"endLocation":{"latitude":12.9801872,"longitude":77.70903229999999,"__typename":"Coords"},"polyline":"gdgnAwkhyMN?fCEb@?p@?tAA|@AnAGf@ERCn@ITEx@OFAPCdAOh@KrAUv@MZGLCRG","stepInstruction":"At Jn of Graphite, continue onto <b>Graphite India Main Rd</b>/<b>Kundalahalli Main Rd</b><div style=\"font-size:0.9em\">Pass by Cult Hoodi (on the left)</div>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"0.2 km","rawValue":226,"__typename":"TypedData"},"stepDuration":{"formattedValue":"1 min","rawValue":46,"__typename":"TypedData"},"startLocation":{"latitude":12.9801872,"longitude":77.70903229999999,"__typename":"Coords"},"endLocation":{"latitude":12.9796234,"longitude":77.70702750000001,"__typename":"Coords"},"polyline":"eefnAmphyMHZfBrJ","stepInstruction":"Turn <b>right</b> at Fastener Manufacturers","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"0.7 km","rawValue":654,"__typename":"TypedData"},"stepDuration":{"formattedValue":"1 min","rawValue":76,"__typename":"TypedData"},"startLocation":{"latitude":12.9796234,"longitude":77.70702750000001,"__typename":"Coords"},"endLocation":{"latitude":12.9740466,"longitude":77.70894779999999,"__typename":"Coords"},"polyline":"safnA}chyMnCc@|FqAzDeAfD}@fJeC","stepInstruction":"Turn <b>left</b> onto <b>2nd Main Rd</b><div style=\"font-size:0.9em\">Pass by Divyasai Realators (on the right)</div>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"0.2 km","rawValue":181,"__typename":"TypedData"},"stepDuration":{"formattedValue":"1 min","rawValue":30,"__typename":"TypedData"},"startLocation":{"latitude":12.9740466,"longitude":77.70894779999999,"__typename":"Coords"},"endLocation":{"latitude":12.9734347,"longitude":77.7073973,"__typename":"Coords"},"polyline":"y~dnA}ohyMzBtH","stepInstruction":"Turn <b>right</b> at Annamalai University LC distance eduation onto <b>3rd Cross Rd</b><div style=\"font-size:0.9em\">Pass by SECUSERVE (on the right)</div>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"94 m","rawValue":94,"__typename":"TypedData"},"stepDuration":{"formattedValue":"1 min","rawValue":15,"__typename":"TypedData"},"startLocation":{"latitude":12.9734347,"longitude":77.7073973,"__typename":"Coords"},"endLocation":{"latitude":12.97424,"longitude":77.7071267,"__typename":"Coords"},"polyline":"}zdnAgfhyMaDt@","stepInstruction":"Turn <b>right</b> onto <b>3rd Main Rd</b>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"1.0 km","rawValue":1021,"__typename":"TypedData"},"stepDuration":{"formattedValue":"3 mins","rawValue":177,"__typename":"TypedData"},"startLocation":{"latitude":12.97424,"longitude":77.7071267,"__typename":"Coords"},"endLocation":{"latitude":12.9733264,"longitude":77.6987353,"__typename":"Coords"},"polyline":"_`enAqdhyM?DG~ACj@?@KnG?PKxAGfACb@?L@H@JBFBBFHHFtBbAVLLHDF@@@@@B@BBLNhADLVv@d@xAPf@DVb@~An@fCF`@@F?B?BADADEHOXS^[t@EJGNEJg@|@GHEDEDIDKD","stepInstruction":"Turn <b>left</b> onto <b>Doddanekkundi Industrial Area Rd</b>/<b>Outer Ring Rd - Whitefield Rd Bypass</b><div style=\"font-size:0.9em\">Continue to follow Doddanekkundi Industrial Area Rd</div><div style=\"font-size:0.9em\">Pass by BigBasket Warehouse (on the right)</div>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"0.2 km","rawValue":200,"__typename":"TypedData"},"stepDuration":{"formattedValue":"1 min","rawValue":34,"__typename":"TypedData"},"startLocation":{"latitude":12.9733264,"longitude":77.6987353,"__typename":"Coords"},"endLocation":{"latitude":12.974849,"longitude":77.697761,"__typename":"Coords"},"polyline":"izdnAcpfyMoHbE","stepInstruction":"Continue onto <b>Service Rd</b>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"5.3 km","rawValue":5335,"__typename":"TypedData"},"stepDuration":{"formattedValue":"9 mins","rawValue":556,"__typename":"TypedData"},"startLocation":{"latitude":12.974849,"longitude":77.697761,"__typename":"Coords"},"endLocation":{"latitude":12.9323183,"longitude":77.68781849999999,"__typename":"Coords"},"polyline":"ycenA_jfyMJPvBgA|BoAHElBaAVO^QJEp@]tAq@nBaAbDaBpCuADCfGaDbAi@`Ac@`A]dA]\\EjAId@At@@|ADnBLlDPxCTZB\\BfAJrALnFb@jFh@j@D`@@z@FZ@\\?`@A|BAp@?P@x@@L@fAB\\@VB`@DzBd@jDr@hKzAxCd@fBXlBVvFr@|Fl@x@LxATn@H`AT\\H`AVdB`@dBb@l@Ll@NfKhC`@Jn@Nr@T`@Lf@TdAh@bAh@x@`@p@XHDHDtAj@fDbBvAv@nBnAdAx@j@d@FHvBfCjBzBTXjBlBtDdE`AdAbCpC`CjCtC`DpEbF","stepInstruction":"Sharp <b>left</b> at Syed Enterprises onto <b>NH 44</b><div style=\"font-size:0.9em\">Pass by The Navigators (on the right in 700&nbsp;m)</div>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"4.0 km","rawValue":4037,"__typename":"TypedData"},"stepDuration":{"formattedValue":"6 mins","rawValue":381,"__typename":"TypedData"},"startLocation":{"latitude":12.9323183,"longitude":77.68781849999999,"__typename":"Coords"},"endLocation":{"latitude":12.9236971,"longitude":77.6541475,"__typename":"Coords"},"polyline":"_z|mA{kdyMzBjCp@v@zFbHPX\\h@\\r@Th@p@dBj@~AjA|CvA~Dx@zBVp@p@hBt@hBHRRf@rBxFbD|I^~@L\\N`@xCtH^hATl@d@rAvApElBjFp@pB`@`AbAlClBjFf@rAzEfMBFPp@BR@P@L?X?NAZ?FG`@CREXe@hC_ApEOr@Mn@c@xC_@`Ca@zBo@hCaA|D_AhD_AxDc@fBWtAMz@In@E\\[fD","stepInstruction":"Keep <b>right</b> to stay on <b>NH 44</b><div style=\"font-size:0.9em\">Pass by Devarabisanahalli (Towards Central Silk Board) (on the left)</div>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"2.3 km","rawValue":2301,"__typename":"TypedData"},"stepDuration":{"formattedValue":"6 mins","rawValue":374,"__typename":"TypedData"},"startLocation":{"latitude":12.9236971,"longitude":77.6541475,"__typename":"Coords"},"endLocation":{"latitude":12.9247884,"longitude":77.6337023,"__typename":"Coords"},"polyline":"cd{mAmy}xMUl@Mx@In@Gf@SjBa@lDAPYfBCPABANATARAN?J?f@Mv@E`@Ef@Cb@Gh@?r@?LB|@Dv@@n@DpB@VDx@Bd@@NDz@?P?L?X?l@@pC@^D\\BP@H@DFVx@hD\\hBNz@BNj@nDZ`BT|@@LCRALI\\kAnEIReBhFCFA@ADELKTABGNWb@[b@S^Yh@KXEJCJA@I\\GZAHEf@?L?F@P@VNtAPxB^fEHbABPD|@","stepInstruction":"Slight <b>right</b> at Catacient Consulting Pvt. Ltd. onto <b>Sarjapur Main Rd</b><div style=\"font-size:0.9em\">Pass by International Parcels (on the left in 500&nbsp;m)</div>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"36 m","rawValue":36,"__typename":"TypedData"},"stepDuration":{"formattedValue":"1 min","rawValue":9,"__typename":"TypedData"},"startLocation":{"latitude":12.9247884,"longitude":77.6337023,"__typename":"Coords"},"endLocation":{"latitude":12.9250061,"longitude":77.6335821,"__typename":"Coords"},"polyline":"}j{mAsyyxMBNQB]B","stepInstruction":"Turn <b>right</b> at INDIAN BANK onto <b>80 Feet Rd</b>/<b>Mahatyagi Laksmidevi Rd</b>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"0.6 km","rawValue":580,"__typename":"TypedData"},"stepDuration":{"formattedValue":"2 mins","rawValue":112,"__typename":"TypedData"},"startLocation":{"latitude":12.9250061,"longitude":77.6335821,"__typename":"Coords"},"endLocation":{"latitude":12.924547,"longitude":77.6283205,"__typename":"Coords"},"polyline":"il{mA{xyxMBZVpCLxAXvBRdBd@bF?@?J?F?B?D@JDd@B^?Z?PATEZIb@G^Sz@","stepInstruction":"Turn <b>left</b> at Henkel Adhesives Technologies India Private Limited<div style=\"font-size:0.9em\">Pass by Krishna Gopal Dr (on the left)</div>","__typename":"DriveStep"},{"stepTravelMode":"DRIVING","stepDistance":{"formattedValue":"1.4 km","rawValue":1421,"__typename":"TypedData"},"stepDuration":{"formattedValue":"5 mins","rawValue":280,"__typename":"TypedData"},"startLocation":{"latitude":12.924547,"longitude":77.6283205,"__typename":"Coords"},"endLocation":{"latitude":12.9352392,"longitude":77.6244486,"__typename":"Coords"},"polyline":"mi{mA_xxxMiDo@}B[QASAGAyAK}E_@u@Ec@E}@I_EY_@CMAYAUCODQD_@La@L_@P_@LUFWHg@PSFe@PWJc@Tk@`@q@d@iA|@s@Z{AlAw@|@KPKNOVeApBM\\mBpDYl@g@v@IF","stepInstruction":"Turn <b>right</b> at Dats India onto <b>8th Main Rd</b><div style=\"font-size:0.9em\">Pass by Dental (on the left)</div><div style=\"font-size:0.9em\">Destination will be on the left</div>","__typename":"DriveStep"}],"__typename":"Direction"}}}
// const data = response.data.direction;
  return (
    <div>
      <div className={styles['search-input-wrapper']}>
        <LocationSearch
          placeholder='Enter start location...'
          onSelect={setStartPoint}/>
        <div className={styles['swap']}>
          <FontAwesomeIcon icon='exchange-alt' color='#00000099' size='lg' />
        </div>
        <LocationSearch
          placeholder='Enter end location...'
          onSelect={setEndpoint}/>
      </div>
      {
        (startPoint && endPoint) && (
          <Query
            query={GET_DIRECTION}
            variables={getQueryVariables()}
            >
            {
              ({ loading, error, data }) => {
                if (loading) {
                  return <Loader />
                }
                if (error) {
                  return <div>{ fetchGraphqlError(error) }</div>
                }
                console.log({data})
                return (
                  <RouteDetails data={data.direction}/>
                )
              }
            }
          </Query>
        )
      }
    </div>
  )
}
