import { useState, useEffect } from "react";


export default function  MessageBox ({ displayText, onDismiss, isLoading }) {
    const [showSpeechBubble, setShowSpeechBubble] = useState(false);

    useEffect(() => {
        if (displayText) {
            setShowSpeechBubble(true);
        } else {
            setShowSpeechBubble(false)
        }
    }, [displayText])

    const handleClick = () => {
        setShowSpeechBubble(false);
        if (onDismiss) {
            onDismiss();
        }
    }

    if (isLoading) {
        return (
            <div className='tennis-loader'>
                <div className='tennis-court'>
                    <div className='tennis-ball' />
                </div>
            </div>
        );
    }

    if (displayText && showSpeechBubble) {
        return (
            <div className='speech-bubble'>
                <div 
                    className='speech-bubble-content' 
                    style={{ whiteSpace: 'pre-line' }} 
                    onClick={handleClick}>
                    {displayText} 
                </div>
            </div>
        );
    }
    return null;
}