// ProductManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "./pics/elogo-removebg-preview.png";
import { FaSearch, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { Carousel, Row, Col, Modal,  Navbar, Nav,  Form, Button} from 'react-bootstrap';
import "./styles.scss"
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', imgsrc: '' });
  const [editingId, setEditingId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [notification, setNotification] = useState('');
  const navigate = useNavigate(); 
  const handleLogout = () => {
    // Clear authentication tokens or session data
    localStorage.removeItem('authToken'); // Example: Remove auth token from localStorage
    navigate('/'); // Redirect to login page
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await axios.put(`http://localhost:5000/products/${editingId}`, form);
      } else {
        await axios.post('http://localhost:5000/products', form);
      }
      setForm({ name: '', description: '', price: '', imgsrc: '' });
      setEditingId(null);
      fetchProducts();
      setShowPopup(false);
      setNotification('Product added/updated successfully!');
      setTimeout(() => setNotification(''), 3000);
    } catch (err) {
      console.error(err);
      setNotification('Failed to add/update product.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleEdit = (id) => {
    const product = products.find(p => p.id === id);
    if (product) {
      setForm({ name: product.name, description: product.description, price: product.price, imgsrc: product.imgsrc });
      setEditingId(id);
      setShowPopup(true);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/products/${id}`);
        fetchProducts();
        setNotification('Product deleted successfully!');
        setTimeout(() => setNotification(''), 3000);
      } catch (err) {
        console.error(err);
        setNotification('Failed to delete product.');
        setTimeout(() => setNotification(''), 3000);
      }
    }
  };

  return (
    <div className='sass'>
                <header>
        <Navbar expand="lg" className="fill">
        <Navbar.Brand href="#">
        <img
          src={logo}
          alt="Your Brand"
          style={{ width: '120px', height: 'auto', }} 
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        {/* <Form inline className="ml-auto" onSubmit={handleSearchSubmit}>
  <div className="input-group">
    <Form.Control
      type="text"
      placeholder="Search products"
      value={searchQuery}
      onChange={handleSearch}
      className="form-control"
    />
    <div className="input-group-append">
      {searchQuery && (
        <Button variant="link" onClick={clearSearch} className="search-icon">
          <FaTimes />
        </Button>
      )}
      <Button variant="outline-success" type="submit">
        <FaSearch />
      </Button>
    </div>
  </div>
</Form> */}
           <Nav.Link onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </Nav.Link>
          <Nav.Link href="#" onClick={() => setShowPopup(true)}>Product</Nav.Link>
           {/* <Nav.Link onClick={handleLogout}>
                    <FaSignOutAlt /> Logout
                  </Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
        </header><br></br><br></br><br></br><br></br><br></br>
   <div>          <section id="products">
      <h2>Product Management</h2>
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card text-center" style={{ border: 'none' }}>
              <img src={product.imgsrc} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title"><b>{product.name}</b></h5>
                <p className="card-text">{product.description}</p>
                <h5>₹ {product.price}</h5>
                <Button variant="warning" onClick={() => handleEdit(product.id)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
</section>
      {notification && (
        <div className="notification">{notification}</div>
      )}

      <Modal show={showPopup} onHide={() => setShowPopup(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={form.name} onChange={handleFormChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" id="description" name="description" value={form.description} onChange={handleFormChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input type="text" className="form-control" id="price" name="price" value={form.price} onChange={handleFormChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="imgsrc">Image URL</label>
              <input type="text" className="form-control" id="imgsrc" name="imgsrc" value={form.imgsrc} onChange={handleFormChange} required />
            </div>
            <Button type="submit" variant="primary">{editingId ? "Update Product" : "Add Product"}</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>       
    </div>  
  );
};

export default ProductManagement;
