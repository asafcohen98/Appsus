


export function ColorPalette({ onSetColor }) {
    return (
        <div className="color-palette">
            <button className="color-1 fas fa-circle clean-btn" onClick={() => onSetColor('#f94144')}></button>
            <button className="color-2 fas fa-circle clean-btn" onClick={() => onSetColor('#adb5bd')}></button>
            <button className="color-3 fas fa-circle clean-btn" onClick={() => onSetColor('#f8961e')}></button>
            <button className="color-4 fas fa-circle clean-btn" onClick={() => onSetColor('#f9c74f')}></button>
            <button className="color-5 fas fa-circle clean-btn" onClick={() => onSetColor('#1b4332')}></button>
            <button className="color-6 fas fa-circle clean-btn" onClick={() => onSetColor('#ffe66d')}></button>
            <button className="color-7 fas fa-circle clean-btn" onClick={() => onSetColor('#577590')}></button>
            <button className="color-8 fas fa-circle clean-btn" onClick={() => onSetColor('#61a5c2')}></button>
            <button className="color-9 fas fa-circle clean-btn" onClick={() => onSetColor('#9d4edd')}></button>
            <button className="color-10 fas fa-circle clean-btn" onClick={() => onSetColor('#ffff')}></button>
        </div>
    )
}