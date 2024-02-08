import React from "react";

interface TextProps {
    children?: string;
}

const Text: React.FC<TextProps> = ({ children }) => {
    return <div>{children}</div>;
};

export default Text;