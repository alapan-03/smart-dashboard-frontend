import { useState } from "react";
import Navbar from "../HomePage/Navbar";
import Sidebar from "../HomePage/Sidebar";
import LearningRoadmap from "./LearningRoadmap";
import CreateTopic from "./CreateTopic";
import FileUpload from "./FileUpload";
import YouTubeForm from "./YoutubeForm";
import Resource from "./Resource";

export default function Appan2(props) {

    const [addTopicState, setAddTopicState] = useState(false);
    const [topicId, setTopicId] = useState();
    const [resource, setAddResourceSt] = useState(false);

    function addTopic(e){
        setAddTopicState(e)
    }

    function setTopic(e){
        setTopicId(e)
    }

    function setAddResource(e){
        setAddResourceSt(e)
    }

    return(
        <div className="appan-cont">
        <Navbar addTopicProp={addTopic}/>
        <div className="appan">
        <Sidebar/>
        <LearningRoadmap setTopic={setTopic}/>
        {addTopicState && 
        <div >
        <CreateTopic addTopicProp={addTopic}/>
        </div>
        }
        {/* <FileUpload topicId={topicId}/>
        <YouTubeForm/> */}

        <Resource topic={topicId} addResource={setAddResource}/>

        {resource && 
        <div>
        <FileUpload addResource={setAddResource}/>
        <YouTubeForm/>
        </div>
        }

        </div>
        </div>
    )
}