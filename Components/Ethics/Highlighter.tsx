import React, { useEffect, useState } from 'react';

const CommentBox: React.FC<{
    highlightId: string;
    onSubmit: (comment: string, highlightId: string) => void; // Pass the highlightId to onSubmit
    position: { top: string; left: string };
}> = ({ highlightId, onSubmit, position }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        onSubmit(comment, highlightId); // Pass the highlightId to the parent component
        setComment('');
    };

    return (
        <div
            style={{
                position: 'absolute',
                top: position.top,
                left: position.left,
                marginLeft: '5px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: 'white',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 2,
                display: 'block', // Ensure the CommentBox is initially visible
            }}
        >
            <p style={{ marginBottom: '10px', fontSize: '14px' }}>{`Leave a comment ${highlightId}`}</p>
            <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Type your comment here..."
                style={{
                    width: '90%',
                    padding: '8px',
                    marginBottom: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    height: '100px',
                    resize: 'none',
                }}
            />
            <button onClick={handleCommentSubmit} style={{ width: '100%', padding: '8px', borderRadius: '4px' }}>
                Submit
            </button>
        </div>
    );
};

const HighlightDetector: React.FC = () => {
    const [highlightCounter, setHighlightCounter] = useState<number>(0);
    const [commentVisible, setCommentVisible] = useState<boolean>(false);
    const [currentHighlightId, setCurrentHighlightId] = useState<string | null>(null);
    const [highlightComments, setHighlightComments] = useState<Record<string, string>>({});

    const [commentBoxPosition, setCommentBoxPosition] = useState<{ top: string; left: string }>({
        top: '0',
        left: '0',
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

                span.style.backgroundColor = 'yellow'; // Change the color as needed
                span.textContent = selectedText;
                span.dataset.highlightId = highlightId; // Assign a unique ID

                span.addEventListener('click', () => {
                    setCommentVisible(true);
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

    const handleCommentSubmit = (comment: string, highlightId: string) => {
        if (highlightId) {
            setHighlightComments((prevComments) => ({
                ...prevComments,
                [highlightId]: comment,
            }));
            setCommentVisible(false);
        }
    };

    return (
        <div style={{ position: 'relative', zIndex: 1 }}>
            {commentVisible && currentHighlightId && (
                <CommentBox
                    highlightId={currentHighlightId}
                    onSubmit={handleCommentSubmit}
                    position={commentBoxPosition}
                />
            )}
        </div>
    );
};

export default HighlightDetector;