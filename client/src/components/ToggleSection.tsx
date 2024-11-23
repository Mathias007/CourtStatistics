import React, { useState } from "react";

interface ToggleSectionProps {
    title: string;
    children: React.ReactNode;
}

const ToggleSection: React.FC<ToggleSectionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="toggle-section">
            <div className="toggle-header" onClick={() => setIsOpen(!isOpen)}>
                <h2>{title}</h2>
                <button>{isOpen ? "▲" : "▼"}</button>
            </div>
            {isOpen && <div className="toggle-content">{children}</div>}
        </div>
    );
};

export default ToggleSection;
