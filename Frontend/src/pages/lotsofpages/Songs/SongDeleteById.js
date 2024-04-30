/*COPY PASTE */
/*
https://localhost:7106/api/Song/deletebyid
*/
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";

export function SongDeleteById() {
    const navigate = useNavigate();
    const param = useParams();
    const postid = param.id;

    return(
        <form onSubmit={
                (event) => {
                    event.persist();
                    event.preventDefault();
                    fetch(`https://localhost:7106/api/Song/deletebyid/${postid}`, {
                    method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(navigate('/'))
            .catch(error => console.error('Error:', error));
            }
        }>
            <div className="p-5 m-auto text-center content bg-ivory">
            <h1>Are you sure you want to delete the post?</h1>

                <div className='form-group row text-center'>

                    <div className="col">
                    </div>
                    <div className="col-6">
                    <button type="submit" className="btn btn-outline-danger ms-2"><i class="bi bi-emoji-dizzy"></i> Yes</button>
                    <button className="btn btn-outline-primary ms-2" onClick={() => navigate(`/Posts/${postid}`) }><i class="bi bi-emoji-smile"></i> No</button>
                    </div>
                    <div className="col">
                    </div>
                </div>
            </div>
        
        </form>
    );
}
export default SongDeleteById;