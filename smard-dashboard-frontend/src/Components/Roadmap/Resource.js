import { useEffect, useState } from "react";
import "./path.css";
import url from "./../../url";
import React from "react";
import axios from "axios";
import {
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileImage,
  FaFileAlt,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

export default function Resource(props) {
  // const {classId} = useParams();

  const [resource, setResource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addClassState, setAddClassState] = useState(false);
  console.log(props.topic);

  useEffect(() => {
    // Fetch the data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${url.url}/api/v1/resource/getAllResource/${props.topic}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("resource", data);
        setResource(data.resource); // Assuming the classes are returned in the user data
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [props.topic, resource[0]?.name?.length]);

  const getFileIcon = (filename) => {
    const extension = filename?.split(".").pop().toLowerCase();
    console.log(extension);
    switch (extension) {
      case "pdf":
        return <FaFilePdf size={30} color="brown" />;
      case "docx":
      case "doc":
        return <FaFileWord size={30} color="blue" />;
      case "png":
      case "jpg":
      case "jpeg":
        return <FaFileImage size={30} color="green" />;
      default:
        return <FaFileAlt size={30} />; // Generic file icon
    }
  };

  console.log(resource)
  // Function to handle deletion
  const handleDelete = async (resourceId, filename) => {
    console.log(filename)
    try {
      const response = await axios.delete(`http://127.0.0.1:8080/api/v1/resource/deleteResource/${resourceId}/${filename}`);
      if (response.status === 200) {
        alert("Resource deleted successfully.");
        // Optionally, you could refresh the list or update the state here to remove the item from the list
      } else {
        alert("Failed to delete the resource.");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting resource.");
    }
  };

  return (
    <>
      <div className="resource-cont">
        <div className="resource">
            {resource.length>0 ? (
          <ul>
            {resource?.map((data, i) => (
              <li key={i} className="resource-item">
                <ul>
                  {data.name?.map((fileName, j) => (
                    <li key={j} className="file-item">
                      {/* Display icon based on the file extension */}
                      <span className="file-icon">{getFileIcon(fileName)}</span>

                      {/* Display resource name */}
                      <span className="resource-name">
                        {fileName.split(" ").length > 1
                          ? fileName.split(" ")[0] +
                            "." +
                            fileName?.split(".")[1]
                          : fileName?.split(" ")}
                      </span>

                      {/* Delete icon */}
                      <span
                        className="delete-icon"
                        onClick={() => handleDelete(data._id, fileName?.replace(/\s/g, ''))}
                      >
                        <FaTimes size={20} color="red" />
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
            ):(
                <div className="nothing-resource">
                    Nothing to show
                    </div>
            )
        }
        </div>
        <button onClick={() => props.addResource(true)}>Add resource</button>
      </div>
    </>
  );
}
