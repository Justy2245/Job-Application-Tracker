import React, {useState} from "react";

const Input = ({ app }) => {
    const [apps, setApps] = useState(app);

    const addApp = async event => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/apps', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(apps)
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target='#mainModal'>
                Add New App
            </button>
        </div>

        <div className="modal" id ='mainModal'>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Add New Application</h4>
                </div>
                <form className="modal-body">
                    <input type="text" className="form-control" placeholder ='Enter Job Title' name = 'title' onChange ={event => setApps({...app, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control mt-2 mb-2" placeholder ='Enter Company Name' name = 'company' onChange ={event => setApps({...app, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control" placeholder ='Enter Location' name = 'location' onChange ={event => setApps({...app, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control mt-2 mb-2" placeholder ='Enter Date Applied' name = 'date_applied' onChange ={event => setApps({...app, [event.target.name]: event.target.value})}/>
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick = {event => addApp(event)}>
                        Add
                    </button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default Input;