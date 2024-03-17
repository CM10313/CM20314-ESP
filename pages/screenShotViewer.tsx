import React, { useState, useEffect } from 'react';
import ScreenshotSlider from '../Components/screenshotSlider';
import { fetchDocumentById } from '../firebase/firestore';
import { useRouter } from 'next/router';

const ScreenshotViewer: React.FC = () => {
    const router = useRouter();
    const [imageUrls, setImageUrls] = useState([]);

    const department = router.query.department;
    const studyId = router.query.studyId;
    const ResearcherId = router.query.ResearcherId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from Firestore
                const data = await fetchDocumentById(
                    `departments/${department}/Researchers/${ResearcherId}/studies`,
                    studyId
                );
                // Extract image URLs from fetched data
                const highlightScreenShots = data?.studyObj.EthicsApprovalObject.highlightScreenShots || {};
                console.log(highlightScreenShots);

                // Extract URLs from the highlightScreenShots object
                const urls = Object.values(highlightScreenShots);

                // Set the imageUrls state with the extracted URLs
                setImageUrls(urls);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Call the fetchData function
        fetchData();
    }, []); // Empty dependency array ensures useEffect runs only once

    return (
        <div>
            <ScreenshotSlider imageUrls={imageUrls} />
        </div>
    );
};

export default ScreenshotViewer;