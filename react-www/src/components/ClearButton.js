export default function ClearButton({ inputValue, onClear }) {
    const buttonStyle = {
        opacity: inputValue ? 1 : 0,
        pointerEvents: inputValue ? 'auto' : 'none'
    };

    return (
        <span 
            className="clear-button" 
            style={buttonStyle}
            onClick={() => {
                onClear();
            }}>
                X
        </span>
    )
}