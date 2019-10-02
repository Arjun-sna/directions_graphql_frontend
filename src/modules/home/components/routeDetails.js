import React from "react";
import styles from "../styles.scss";

export default ({ data }) => (
  <div>
    <div className={styles["route-detail-section"]}>
      <div className={styles["section-header"]}>Fare Details</div>
      {data.fare ? (
        <div className={styles["route-details-container"]}>
          {`Trip Fare: ${data.fare.currency} ${data.fare.fareValue}`}
        </div>
      ) : (
        <div className={styles["route-details-container"]}>
          <span className={styles["detail-text"]}>
            Fare data not available for this route
          </span>
        </div>
      )}
    </div>
    <div className={styles["route-detail-section"]}>
      <div className={styles["section-header"]}>Trip Details</div>
      <div className={styles["route-details-container"]}>
        <div>
          <span className={`${styles["highlight"]} ${styles["start"]}`}>
            From
          </span>
          <span className={styles["detail-text"]}>
            {data.tripData.departure.address}
          </span>
        </div>
        <div>
          <span className={`${styles["highlight"]} ${styles["end"]}`}>To</span>
          <span className={styles["detail-text"]}>
            {data.tripData.arrival.address}
          </span>
        </div>
        <div>
          <span className={styles["highlight"]}>Duration</span>
          <span className={styles["detail-text"]}>
            {data.tripData.tripDuration.formattedValue}
          </span>
        </div>
        <div>
          <span className={styles["highlight"]}>Distance</span>
          <span className={styles["detail-text"]}>
            {data.tripData.tripDistance.formattedValue}
          </span>
        </div>
      </div>
    </div>
    <div className={styles["route-detail-section"]}>
      <div className={styles["section-header"]}>Route</div>
      {data.steps.map((step, index) => {
        return (
          <div key={index} className={styles["route-details-container"]}>
            <div className={styles["highlight"]}>{step.stepTravelMode}</div>
            <div dangerouslySetInnerHTML={{ __html: step.stepInstruction }} />
            <div>
              <span>Duration </span>
              <span>{step.stepDuration.formattedValue}</span>
            </div>
            <div>
              <span>Distance </span>
              <span>{step.stepDistance.formattedValue}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
