import React, { useEffect, useState } from 'react';
import axios from 'axios';
import url from "./../../url";

function Leaderboard({ assignmentId }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`${url}/student/leaderboard/${assignmentId}`);
        console.log(response.data)
        setLeaderboard(response.data);
        console.log(leaderboard)
      } catch (error) {
        console.error('Error fetching leaderboard', error);
      }
    };

    fetchLeaderboard();
  }, [assignmentId]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((submission, index) => (
          <li key={submission._id}>
            {index + 1}. {submission.studentId.name} - {submission.correctAnswers} point - {submission.timeTaken} seconds
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Leaderboard