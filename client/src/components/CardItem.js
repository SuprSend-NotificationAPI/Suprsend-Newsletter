import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function CardItem(props) {
  const [showModal, setShowModal] = useState(false);
  const [semail,ssetmail] = useState("");
  const [uemail,usetmail] = useState("");
  const host = "https://newsletter-backend-eta.vercel.app"
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
     setShowModal(false);
  };

  const handleChange1 = (event)=>{
      ssetmail(event.target.value);
  }

  const handleChange2 = (event)=>{
      usetmail(event.target.value);
  }


  const Subscribe = async()=>{
    const response = await fetch(`${host}/subscribe/${props.title}`,{
      method : "POST",
      headers:{
        'Content-Type':"application/json",
      },
      body : JSON.stringify({usermail : semail})
    })
    const json = await response.json();
    // console.log(json);
    setShowModal(false);
    props.showAlert(`${semail} added to list ${props.title} `,"success");
      ssetmail("");
    }
    

    const Unsubscribe =async()=>{
     const response = await fetch(`${host}/unsubscribe/${props.title}`,{
      method : "POST",
      headers:{
        'Content-Type':"application/json",
      },
      body : JSON.stringify({usermail : uemail})
    })
    const json = await response.json();
    // console.log(json);
    setShowModal(false);
    props.showAlert(`${uemail} removed from list ${props.title} `,"success");
    usetmail("");
  }


  const Broadcast = async()=>{
      const response = await fetch(`${host}/sendnotification/${props.title}`,{
      method : "POST",
      headers:{
        'Content-Type':"application/json",
      },
    })
    const json = await response.json();
    // console.log(json);
    setShowModal(false);
    props.showAlert("Message Broadcasted to the user","success");
  }

  return (
    <div>
      <div className='my-4 mx-4'>
        <div className="card">
          <img className="card-img-top" src={props.url} alt="Card image cap" style={{maxHeight:"14rem"}} />
          <div className="card-body">
            <h5 className="card-title">{props.title === "notasubscriber" ? "Don't Subscribe to any of these" : props.title}</h5>
            <p className="card-text">{props.desc}</p>
            <a href="#" className="btn btn-primary" onClick={handleModalOpen}>Open</a>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title === "notasubscriber"?"Don't Subscribe to any of the above but just add a user":props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  <div>
    {props.title === "notasubscriber"?
    <h6>Add user To Database</h6>:
    <h6>Subscribe to this newsletter</h6>
  }
    <div className="d-flex justify-content-between align-items-center">
      <input type="email" placeholder="Enter your email" onChange={handleChange1}
          value={semail} />
      <Button onClick={Subscribe} variant="primary">Subscribe</Button>
    </div>
  </div>

  <hr />

  <div>
  {props.title === "notasubscriber"?
    <h6>Remove User from the Database</h6>:
    <h6>Unsubscribe from this newsletter</h6>
  }

    <div className="d-flex justify-content-between align-items-center">
      <input type="email" placeholder="Enter your email" onChange={handleChange2}
          value={uemail} />
      <Button onClick={Unsubscribe} variant="danger">Unsubscribe</Button>
    </div>
  </div>

  <hr />

  <div>
    <h6>Broadcast a message</h6>
    <Button onClick={Broadcast} variant="secondary">Broadcast to All</Button>
  </div>
</Modal.Body>

      </Modal>
    </div>
  );
}
