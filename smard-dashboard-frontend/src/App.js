import logo from './logo.svg';
import './App.css';
import TrackInteractions from "./Components/PdfViewer/TrackInteractions";
import TrackInteractionsCont from './Components/PdfViewer/TrackInteractionsCont';
import ZigZagPath from './Components/Roadmap/Path';
import TrackVideo from './Components/VideoViewer/TrackVideo';
import TrackVideoCont from './Components/VideoViewer/TrackVideoCont';
import Sidebar from './Components/HomePage/Sidebar';
import Navbar from './Components/HomePage/Navbar';
import Body from './Components/HomePage/Body';
import url from "./url";
import { useEffect, useState, createContext } from "react";
import CreateClass from './Components/HomePage/CreateClass';
import LearningRoadmap from './Components/Roadmap/LearningRoadmap';
import App2 from './Components/Roadmap/Appan2';
import Appan2 from './Components/Roadmap/Appan2';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Components/HomePage/Main';


const context = createContext();
const context2 = createContext();
function App() {


  console.log(url.url);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addClassState, setAddClassState] = useState(false);

  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${url.url}/api/v1/teacher/meTeacher`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setClasses(data.teacher); // Assuming the classes are returned in the user data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  let name = "alap"


  function addClass(e){
    setAddClassState(e)
  }

  return (

<Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/class/:classId" element={<Appan2 />} />
        <Route path="/viewPdf/:fileUrl" element={<TrackInteractionsCont />} />
      </Routes>
      {/* <Main/> */}
    </Router>
  );
}

export default App;
export {context, context2};
