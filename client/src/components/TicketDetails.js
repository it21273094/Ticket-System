import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TicketDetails = () => {
  const [post, setTicket] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4003/ticket/${id}`).then((res) => {
      if (res.data.success) {
        setTicket(res.data.post);
      }
    });
  }, [id]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h4>{post.topic}</h4>
      <hr />

      <dl className="row">
        <dt className="col-sm-3">Description</dt>
        <dd className="col-sm-9">{post.description}</dd>
        <dt className="col-sm-3">Post Category</dt>
        <dd className="col-sm-9">{post.postCategory}</dd>
      </dl>
    </div>
  );
};

export default TicketDetails;
