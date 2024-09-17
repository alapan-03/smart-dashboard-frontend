import React, { useState } from 'react';

const YouTubeForm = () => {
    const [youtubeLink, setYoutubeLink] = useState('');
    const [iframeSrc, setIframeSrc] = useState('');
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        const videoId = extractVideoId(youtubeLink);
        if (videoId) {
            const src = `https://www.youtube.com/embed/${videoId}`;
            setIframeSrc(src); // Set the src for the iframe
        } else {
            setError('Invalid YouTube link');
            setIframeSrc(''); // Clear previous iframe src
        }
    };

    // Function to extract video ID from YouTube URL
    const extractVideoId = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:v\/|u\/\w\/|embed\/|watch\?v=)|youtu\.be\/)([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null; // Return video ID or null if invalid
    };

    return (
        <div>
            <h2>Enter YouTube Link</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter YouTube link"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                    required
                />
                <button type="submit">Verify & Extract</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {iframeSrc && (
                <div>
                    <h3>Embedded Video</h3>
                    <iframe
                        width="560"
                        height="315"
                        src={iframeSrc}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube Video"
                    ></iframe>
                </div>
            )}
        </div>
    );
};

export default YouTubeForm;
