import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function EditTicket(props) {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [postCategory, setPostCategory] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4003/ticket/${id}`).then((res)=>{
      if(res.data.success){
        setTopic(res.data.ticket.topic);
        setDescription(res.data.ticket.description);
        setPostCategory(res.data.ticket.postCategory);
      }
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "topic") {
      setTopic(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "postCategory") {
      setPostCategory(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    const data = {
      topic: topic,
      description: description,
      postCategory: postCategory,
    };
    
    axios.put(`http://localhost:4003/ticket/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Ticket Update Successfully");
        setTopic("");
        setDescription("");
        setPostCategory("");
      }
    });
  };

  return (
    <div className="col-md-8 mt-4 mx-auto">
      <h1 className="h3 mb-3 front-weight-normal">Edit post</h1>
      <form className="needs-validation" noValidate>
        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Topic</label>
          <input
            type="text"
            className="form-control"
            name="topic"
            placeholder="Enter topic"
            value={topic}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Description</label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Enter Description"
            value={description}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "15px" }}>
          <label style={{ marginBottom: "5px" }}>Post Category</label>
          <input
            type="text"
            className="form-control"
            name="postCategory"
            placeholder="Enter Post Category"
            value={postCategory}
            onChange={handleInputChange}
          />
        </div>

        <button
          className="btn btn-success"
          type="submit"
          style={{ marginTop: "15px" }}
          onClick={onSubmit}
        >
          <i className="far fa-check-square"></i>
          &nbsp;Update
        </button>
      </form>
    </div>
  );
}
