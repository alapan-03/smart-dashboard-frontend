import { useRef } from "react"
import TrackInteractions from "./TrackInteractions";

export default function TrackInteractionsCont(second) {
  return (
    <div style={popupStyle}>
      <div style={popupContentStyle}>
        <TrackInteractions/>
        {/* <button onClick={closePopup}>Close Popup</button> */}
      </div>
    </div>
  );
};

// Basic styles for the popup and its content
const popupStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const popupContentStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  textAlign: 'center',
}
