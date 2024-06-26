import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // Replace with your Firebase storage instance import
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
// Admin page component

function Admin() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    setSelectedImage(selectedFile);
    setImageUrl(URL.createObjectURL(selectedFile)); // Simulate image preview
  };
    const showEditSite = () => {
        hideAll();
        document.getElementById('edit-site').style.display = 'block';
    };



    const showBlogs = () => {
        hideAll();
        document.getElementById('blogs').style.display = 'block';
    };

    const showGallery = () => {
        hideAll();
        document.getElementById('gallery').style.display = 'block';
    };



    const hideAll = () => {
        document.getElementById('edit-site').style.display = 'none';

        document.getElementById('blogs').style.display = 'none';
        document.getElementById('gallery').style.display = 'none';

    };

    const toggleNavbar = () => {
        const navbar = document.getElementById('navbarNav');
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
        } else {
            navbar.classList.add('show');
        }
    };





    //handlesitedata
    const handlesitedata = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      const db = getFirestore(); // Get a reference to the Firestore database
        let errorMessage = document.getElementById('error');
        let success = document.getElementById('success');
      // Create an object with form data
      const formData = {
            
          siteName: document.getElementById('siteName').value,
          groomName: document.getElementById('groomname').value,
          brideName: document.getElementById('bridename').value,
          coupleStory: document.getElementById('couplestory').value,
          locationDetails: document.getElementById('locationdetails').value,
          date: document.getElementById('date').value,
          instagramLink: document.getElementById('instagramLink').value,
          whatsappNumber: document.getElementById('whatsappNumber').value,
          email: document.getElementById('email').value,
          groomImage: document.getElementById('groomImage').value,
          brideImage: document.getElementById('brideImage').value,
          weddingLocation: document.getElementById('weddinglocation').value,
          bannerImage: document.getElementById('bannerImage').value
      };
  
      try {
          // Add the form data to the "formData" collection in Firestore
          const docRef = await addDoc(collection(db, "formData"), formData);
          console.log("Document written with ID: ", docRef.id);
          success.style.display = 'block';
          e.target.reset();
      } catch (error) {
        errorMessage.style.display = 'block';
        console.error("Error adding document: ", error);

      }
  };
  



// handlesitedata
const handleBlogupload = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const db = getFirestore(); // Get a reference to the Firestore database
    let errorMessage = document.getElementById('error');
    let success = document.getElementById('success');
  
    // Create an object with only the desired data
    const blogData = {
      blogTitle: document.getElementById('blogTitle').value, // Assuming siteName represents the blog title
      blogImage: document.getElementById('blogImage').value,
      blogContent: document.getElementById('blogContent').value,
    };
  

  
    try {
      // Add the form data to the "formData" collection in Firestore
      const docRef = await addDoc(collection(db, "blogData"), blogData);
      console.log("Document written with ID: ", docRef.id);
      success.style.display = 'block';
      e.target.reset();
    } catch (error) {
      errorMessage.style.display = 'block';
      console.error("Error adding document: ", error);
    }
  };
// handlesitedata
const handleGalleryupload = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const db = getFirestore(); // Get a reference to the Firestore database
    let errorMessage = document.getElementById('error');
    let success = document.getElementById('success');
  
    // Create an object with only the desired data
    const Gallery = {
      image: document.getElementById('galleryImages').value, // Assuming siteName represents the blog title
    };
  

  
    try {
      // Add the form data to the "formData" collection in Firestore
      const docRef = await addDoc(collection(db, "Gallery"), Gallery);
      console.log("Document written with ID: ", docRef.id);
      success.style.display = 'block';
      e.target.reset();
    } catch (error) {
      errorMessage.style.display = 'block';
      console.error("Error adding document: ", error);
    }
  };



    return (
        <>
            <head>
                <title>Admin Page</title>
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                />
            </head>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Admin Panel</a>
                    <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={showEditSite}>Edit Site</button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={showGallery}>Gallery</button>
                            </li>

                            <li className="nav-item">
                                <button className="nav-link btn btn-link" onClick={showBlogs}>Blogs</button>
                            </li>

                            <li className="nav-item">
                            <Link to="/" className="no-decoration  btn btn-link" style={{color: ""}}>HOME</Link> <br></br>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container content" id="edit-site" style={{ display: "none" }}>
                <h2>Edit Site</h2>
                <div className="row">
                    <div className="col-md-6">
                                <div className="alert alert-success mt-3" role="alert" id="success" style={{display:"none"}}>
                              <p>Data saved</p>
                              </div>
                              <div className="alert alert-success mt-3" role="alert" style={{backgroundColor: "red",display:"none"}} id="error" >
                              <p style={{color:"white"}}>Something went wrong</p>
                              </div>
                        <form onSubmit={handlesitedata}>
                            <div className="form-group">
                                <label htmlFor="siteName">Site Name:</label>
                                <input type="text" id="siteName" className="form-control" required name="siteName" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="groomname">Groom Name:</label>
                                <input type="text" id="groomname" className="form-control" required name="groomname"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bridename">Bride Name:</label>
                                <input type="text" id="bridename" className="form-control" required name="bridename"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="couplestory">Couple Story:</label>
                                <textarea name="couplestory" id="couplestory" className="form-control" ></textarea>
                               
                            </div>
                            <div className="form-group">
                                <label htmlFor="locationdetails">Location Details:</label>
                                <textarea name="locationdetails" id="locationdetails" className="form-control" ></textarea>
                               
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date:</label>
                                <input type="date" name="date" id="date" className="form-control" />
                               
                            </div>
                            <div className="form-group">
                                <label htmlFor="instagramLink">Instagram Link:</label>
                                <input type="text" id="instagramLink" className="form-control" required name="instagramLink"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="whatsappNumber">WhatsApp Number:</label>
                                <input type="text" id="whatsappNumber" className="form-control" required name="whatsappNumber"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" className="form-control" required name="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="groomImage">Groom's Image:</label>
                                <input type="url" id="groomImage" className="form-control"  required name="groomImage" placeholder="url..."/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="brideImage">Bride's Image:</label>
                                <input type="url" id="brideImage" className="form-control"  required name="brideImage " placeholder="url..."/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="weddinglocation">Wedding Location:</label>
                                <input type="url" id="weddinglocation" className="form-control"  required name="weddinglocation" placeholder="url..."/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="bannerImage">Banner Image:</label>
                                <input type="url" id="bannerImage" className="form-control"  required name="bannerImage" placeholder="url..."/>
                            </div>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </form>
                        
                    </div>
                </div>
            </div>

            <div className="container content" id="gallery" style={{ display: "none" }}>
                <h2>Add Images to Gallery</h2>
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={handleGalleryupload}>
                            <div className="form-group">
                                <label htmlFor="galleryImages">Select Images:</label>
                                <input type="url" id="galleryImages" className="form-control" placeholder="url..." required name="galleryImages"/>
                            </div>
                            <button type="submit" className="btn btn-primary">Add Images</button>
                        </form>
                    </div>
                </div>
                <div className="row">


      </div>
            </div>




            <div className="container content" id="blogs" style={{ display: "none" }}>
                <h2>Post a Blog</h2>
                <div className="row">
                    <div className="col-md-6">
                    <div className="alert alert-success mt-3" role="alert" id="success" style={{display:"none"}}>
                              <p>Data saved</p>
                              </div>
                              <div className="alert alert-success mt-3" role="alert" style={{backgroundColor: "red",display:"none"}} id="error" >
                              <p style={{color:"white"}}>Something went wrong</p>
                              </div>
                        <form onSubmit={handleBlogupload}>
                            <div className="form-group">
                                <label htmlFor="blogTitle">Blog Title:</label>
                                <input type="text" id="blogTitle" className="form-control" required name="blogTitle"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="blogImage">Blog Image:</label>
                                <input type="url" id="blogImage" className="form-control"required name="blogImage" placeholder="url..."/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="blogContent">Blog Content:</label>
                                <textarea id="blogContent" className="form-control" required name="blogContent"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Post Blog</button>
                        </form>
                    </div>
                </div>
            </div>


            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </>
    );
}

export default Admin;
