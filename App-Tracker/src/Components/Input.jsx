import React, {useState} from "react";

const Input = ({ app }) => {
    const [apps, setApps] = useState(app);

    return (
        <>
        <div>
            <button type = "button"> Add Application</button>
        </div>
        </>
    )
};

export default Input;