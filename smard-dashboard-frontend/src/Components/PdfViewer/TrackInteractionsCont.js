import { useRef } from "react"
import TrackInteractions from "./TrackInteractions";
import "./style.css"

export default function TrackInteractionsCont(second) {
  return (
    <div className="popupStyle">
      <div className="popupContentStyle">
        <TrackInteractions/>
        {/* <button onClick={closePopup}>Close Popup</button> */}
      </div>
    </div>
  );
};


