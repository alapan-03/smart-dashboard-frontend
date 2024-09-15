import logo from './logo.svg';
import './App.css';
import TrackInteractions from "./Components/PdfViewer/TrackInteractions";
import TrackInteractionsCont from './Components/PdfViewer/TrackInteractionsCont';
import ZigZagPath from './Components/Roadmap/Path';
import TrackVideo from './Components/VideoViewer/TrackVideo';
import TrackVideoCont from './Components/VideoViewer/TrackVideoCont';
// import { PDFViewer } from '@react-pdf/renderer';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

function App() {
  return (
    <div className="App">
      {/* <TrackInteractionsCont/> */}
      {/* <ZigZagPath/> */}
      <TrackVideoCont/>
    </div>
  );
}

export default App;
