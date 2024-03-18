import React, { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import { updateDocument } from '../../firebase/firestore';

const CommentBox: React.FC<{
    highlightId: string;
    onSubmit: (comment: string, highlightId: string, screenshot: string) => void;
    position: { top: string; left: string };
    comment: string;
}> = ({ highlightId, onSubmit, position, comment }) => {
    const [inputComment, setInputComment] = useState(comment);

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputComment(event.target.value);
    };

    const handleCommentSubmit = async () => {
        const screenshot = await takeScreenshot();
        onSubmit(inputComment, highlightId, screenshot);
    };

    const takeScreenshot = async (): Promise<string> => {
        try {
            const canvas = await html2canvas(document.body);
            const quality = 0.4; 
            const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
            if (blob) {
                const compressedDataUrl = await new Promise<string>((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.readAsDataURL(blob);
                });
                return compressedDataUrl;
            } else {
                throw new Error('Failed to compress screenshot: Blob is null');
            }
        } catch (error) {
            console.error('Failed to take screenshot:', error);
            return '';
        }
    };
    // Calculate the top position for the comment box
    const commentTopPosition = parseInt(position.top) + 1; // Adjust the offset as needed

    return (
        <div
            style={{
                position: 'absolute',
                top: `${commentTopPosition}px`, // Use the calculated top position
                left: position.left,
                marginLeft: '5px',
                padding: '10px',
                border: '2px solid black',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 2,
                display: 'block',
                width: '450px',
                height: 130,

            }}
        >
            <p style={{ marginBottom: '10px', fontSize: '14px' }}>{`Leave a comment ${highlightId}`}</p>
            <textarea
                value={inputComment}
                onChange={handleCommentChange}
                placeholder="Type your comment here..."
                style={{
                    width: '90%',
                    padding: '8px',
                    marginBottom: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    height: '20%',
                    resize: 'none',
                }}
            />
            <button onClick={handleCommentSubmit} style={{ width: '100%', padding: '8px', borderRadius: '4px' }}>
                Submit
            </button>
        </div>
    );
};


interface HighlighterWriteToDBProps {
     department:string;
     studyId:string;
     ResearcherId:string
}

const HighlightDetector: React.FC<HighlighterWriteToDBProps> = ({department,studyId,ResearcherId}) => {
    const [highlightCounter, setHighlightCounter] = useState<number>(0);
    const [commentVisible, setCommentVisible] = useState<boolean>(false);
    const [currentHighlightId, setCurrentHighlightId] = useState<string | null>(null);
    const [highlightComments, setHighlightComments] = useState<Record<string, string>>({});
    const [urlDictionary, setUrlDictionary] = useState<Record<string, string>>({});
    const [commentBoxPosition, setCommentBoxPosition] = useState<{ top: string; left: string }>({
        top: '0',
        left: '0'
    });

    useEffect(() => {
        const handleHighlight = () => {
            const selection = window.getSelection();
            const selectedText = selection?.toString().trim();

            if (selectedText !== '') {
                const range = selection?.getRangeAt(0);
                const span = document.createElement('span');
                const currentCounter = highlightCounter + 1;
                const highlightId = `highlight_${currentCounter}`;
                const comment = highlightComments[highlightId];

                span.style.backgroundColor = 'yellow';
                span.textContent = selectedText;
                span.dataset.highlightId = highlightId;

                span.addEventListener('click', () => {
                    setCommentVisible(true);
                    setCurrentHighlightId(highlightId);
                });

                range?.deleteContents();
                range?.insertNode(span);

                const rect = span.getBoundingClientRect();
                const position = {
                    top: `${rect.bottom + window.scrollY}px`,
                    left: `${rect.left + window.scrollX}px`,
                };

                setCommentBoxPosition(position);
                setHighlightCounter(currentCounter);
                setCurrentHighlightId(highlightId);
                setCommentVisible(true);
            }
        };

        document.addEventListener('mouseup', handleHighlight);

        return () => {
            document.removeEventListener('mouseup', handleHighlight);
        };
    }, [highlightCounter, highlightComments]);

    const handleCommentSubmit = (comment: string, highlightId: string, screenshot: string) => {
        if (highlightId) {
            setHighlightComments(prevComments => ({
                ...prevComments,
                [highlightId]: comment,
            }));
            setCommentVisible(false);
        }

        setUrlDictionary(prevUrls => ({
            ...prevUrls,
            [highlightId]: screenshot,
        }));
    

    };

    useEffect(() => {
        console.log(urlDictionary);
        updateDocument(`departments/${department}/Researchers/${ResearcherId}/studies`, studyId , {'studyObj.EthicsApprovalObject.highlightScreenShots' : urlDictionary})
    }, [urlDictionary]);


    return (
        <div style={{ position: 'relative', zIndex: 1 }}>
            {commentVisible && currentHighlightId && (
                <CommentBox
                    highlightId={currentHighlightId}
                    onSubmit={handleCommentSubmit}
                    position={commentBoxPosition}
                    comment={highlightComments[currentHighlightId]}
                />
            )}
        </div>
    );
};

export default HighlightDetector;