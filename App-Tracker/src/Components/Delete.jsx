const Delete = ({ app }) => {

    //delete application based on jobapp_id
    const deleteApp = async (id) => {
        const confirmDelete = window.confirm('Do you want to delete');
        if(confirmDelete === true)
        {
            try {
            const response = await fetch(`http://localhost:5000/apps/${id}`, {
                method: 'DELETE',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(app)
            });
            window.location = '/';
            } catch (error) {
                console.error(error.message);
            }
        }
    }

    return (
        <>
        <button onClick = {() => deleteApp(app.jobapp_id)}>Delete</button>
        </>
    )
};

export default Delete;