import { useState } from 'react';

const Edit = ({ app }) => {
    
    const [apps, setApps] = useState(app);

    //fix the formatting of date, since the date has a timestamp after the date
    const fixDate = (date) => {
        date = date.slice(0, 10);
        return date;
    };

    const editApp = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/apps/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(apps)
            });
        window.location = '/';
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <>
        <div>
            <button type="button" data-bs-toggle="modal" data-bs-target='#editModal'>
                Edit
            </button>
        </div>

        <div className="modal" id ='editModal'>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Edit Application</h4>
                </div>
                <form className="modal-body">
                    <input type="text" className="form-control" value ={`${apps.title}`} name = 'title' onChange ={event => setApps({...apps, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control mt-2 mb-2" value ={`${apps.company}`} name = 'company' onChange ={event => setApps({...apps, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control" value ={`${apps.location}`} name = 'location' onChange ={event => setApps({...apps, [event.target.name]: event.target.value})}/>
                    <input type="text" className="form-control mt-2 mb-2" value = {fixDate(apps.date_applied)} name = 'date_applied' onChange ={event => setApps({...apps, [event.target.name]: event.target.value})}/>
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-warning" data-bs-dismiss="modal" onClick = {event => editApp(event)}>
                        Edit
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

export default Edit;