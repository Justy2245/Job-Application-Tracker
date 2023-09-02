import React, {useState} from "react";

const Input = ({ app }) => {
    const [apps, setApps] = useState(app);

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
                    <input type="text" className="form-control" placeholder ='Enter Job Title' name = 'name' />
                    <input type="text" className="form-control mt-2 mb-2" placeholder ='Enter Company Name' />
                    <input type="text" className="form-control" placeholder ='Enter Location' />
                    <input type="text" className="form-control mt-2 mb-2" placeholder ='Enter Date Applied' />
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal">
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