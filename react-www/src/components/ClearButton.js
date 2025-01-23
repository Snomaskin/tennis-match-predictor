import './styles/ClearButton.css'

export default function ClearButton({ inputValue, onClear }) {
    const buttonStyle = {
        opacity: inputValue ? 1 : 0,
        pointerEvents: inputValue ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
    }
        
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