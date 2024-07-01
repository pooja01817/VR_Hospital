import React, { useState } from 'react';

function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://127.0.0.1:8000/upload-image/', {
        method: 'POST',
        body: formData,
      });

      /*if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.error('Error uploading image:', response.statusText);
        alert('Error uploading image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('Error uploading image. Please try again.');
    }*/
    if (response.ok) {
        console.log('Image uploaded successfully');
  
        // Open Unreal Engine after a successful image upload
        //window.open('C:\\Nandini\\UnrealProjects\\Hospital\\Hospital.uproject');
        await fetch('http://localhost:8000/open_inreal', {
          method: 'POST',})
      } else {
        console.error('Error uploading image:', response.statusText);
        alert('Error uploading image. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image:', error.message);
      alert('Error uploading image. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid', borderRadius: '8px' }}>
      <h1>UPLOAD FILE</h1>
      <form encType="multipart/form-data" onSubmit={handleFileSubmit}>
        <label htmlFor="fileInput">Select a file:</label>
        <input type="file" id="fileInput" name="file" onChange={handleFileChange} required />
        <br />
        <br />
        <input type="submit" value="Submit" className="btn btn-default border w-100 bg-light rounde-0 text-decoration-none" />
      </form>
    </div>
  );
}

export default Home;
