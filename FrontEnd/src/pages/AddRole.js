import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";


export function postSingleElement() {
    const param = useParams();
    const id = param.id;
    const [post, setPost] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    useEffect(() => {
      setFetchPending(true);
      (async() => {
          try{
          const response = await fetch(`http://localhost:5144/api/Post/${id}`);
          const post = await response.json();
          setPost(post);
      } 
      catch(error){
          console.log(error);
      }
      finally{
          setFetchPending(false);
      }
      })();
  },[id]);
    
    

    return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending || !post.id ? (<div className='spinner-border'></div>) : (
      <div className="card col-sm-8 d-inline-block p-2" style={{borderRadius: '20px', backgroundColor: '#0A2234', color: 'white'}}>
        <div className="card-body">
          <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>{post.title}</h2>
          <p style={{ textAlign: 'center', fontSize: '20px' }}>{post.category}</p>
            <img src={post.image} alt={post.image} style={{maxWidth: '80%', maxHeight: '100%', objectFit: 'cover', alignSelf: 'center', borderRadius: '10px' }}/>
          <h3 style={{ textAlign: 'center' }} className='mt-3 mb-3'>{post.content}</h3>
          <h5 style={{ textAlign: 'center'}} className="mb-3">Photo by: {post.author}</h5>
          <div>
          <NavLink to={`/Delete-Post/${id}`} className="p-2">
            
            <button type="button" className="btn btn-outline-danger"><i class="bi bi-trash3"></i> Delete</button>
          </NavLink>
          <NavLink to={`/Modify-Post/${id}`} className="p-2">

            <button type="button" className="btn btn-outline-primary"><i class="bi bi-pencil-square"></i> Modify</button>
          </NavLink>
          <NavLink to={`/`} className="p-2">

            <button type="button" className="btn btn-outline-secondary"><i class="bi bi-arrow-left"></i> Back</button>
          </NavLink>
          </div>
        </div>
      </div> 
      )}
    </div>
    );
}

/*
<NavLink to={`/Delete-Post/${id}`}>
  <button type="button" className="btn btn-danger">Törlés</button>
</NavLink>
<NavLink to={`/Modify-Post/${id}`}>
  <button type="button" className="btn btn-primary">Módosítás</button>
</NavLink>
<NavLink to={`/`}>
  <button type="button" className="btn btn-outline-secondary">Vissza</button>
</NavLink>



  useEffect(() => {
      const fetchItem = async () => {
        try {
          await axios.GET(`https://localhost:7051/api/Post/${post.id}`) 
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
          if (!response.ok) {
            throw new Error('Failed to fetch item');
          }
          const data = await response.json();
          setPost(data);
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      };
      fetchItem();
    }, [id]);


  useEffect(() => {
      setFetchPending(true);
      (async() => {
          try{
          const response = await fetch(`http://localhost:7051/api/Post/id?Id=01a504cd-187c-49e3-8b67-b5dd45359822`);
          const post2 = await response.json();
          setPost(post2);
      } 
      catch(error){
          console.log(error);
      }
      finally{
          setFetchPending(false);
      }
      })();
  },[id]);




    
*/ 
export default postSingleElement;