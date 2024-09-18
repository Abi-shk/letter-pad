import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import Techmaghi from '../assets/techmaghi.png'; // Static image for the top-left corner
import Watermark from '../assets/watermark.png';
import Footer1 from '../assets/footer.png'; // New PNG image
import Footer from './Footer';
import Header from './Header';

const LetterPadForm = () => {
  const [heading, setHeading] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [seal, setSeal] = useState(null);
  const [signature, setSignature] = useState(null);
  const [designation, setDesignation] = useState('');
  const [name1, setName1] = useState(''); // Name above date and content
  const [name2, setName2] = useState(''); // Name below signature and designation

  const handleSealUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSeal(URL.createObjectURL(file));
    }
  };

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSignature(URL.createObjectURL(file));
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('letter-pad');
    const opt = {
      margin: [0, 0, 0, 0], // Remove margins
      filename: 'letter-pad.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'mm', format: [210, 298], orientation: 'portrait' }, // A4 size
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <>
    <Header/>
    <div className="container mx-auto p-4 relative z-10 font-plus-jakarta">
      {/* Input Form */}
      <div className="flex flex-col space-y-4 max-w-[50%] mx-auto  bg-white p-6 rounded shadow-lg mb-4">
        <input
          className="border p-4 rounded text-xs"
          type="text"
          placeholder="Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
        />
          <input
            className="border p-4 rounded text-xs"
            type="text"
            placeholder="To"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
        <input
          className="border p-4 rounded text-xs"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          className="border p-4 rounded text-xs"
          placeholder="Content (Separate paragraphs by pressing enter)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="border p-4 rounded text-xs"
          type="text"
          placeholder="Signed By"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
        />
        <input
          className="border p-4 rounded text-xs"
          type="text"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />
        <div className="flex flex-col space-y-2">
          <label htmlFor="seal">Upload the seal Below:</label>
          <input
            className="border p-4 rounded text-xs"
            type="file"
            accept="image/*"
            onChange={handleSealUpload}
          />
          <label htmlFor="sign">Upload your Signature Below</label>
          <input
            className="border p-4 rounded text-xs"
            type="file"
            accept="image/*"
            onChange={handleSignatureUpload}
          />
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-4 rounded text-md hover:bg-blue-600"
          onClick={handleDownloadPDF}
        >
          Download as PDF
        </button>
      </div>

      {/* Preview Section */}
      <div
        id="letter-pad"
        className="p-8 border mx-auto max-w-[210mm] h-[297mm] shadow-lg rounded relative"
        style={{ position: 'relative' }}
      >
        {/* Watermark */}
        <img
          src={Watermark}
          alt="Watermark"
          className="absolute inset-0 m-auto w-[60%] h-auto"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
          }}
        />

        {/* Container Div for All Content */}
        <div className="relative flex flex-col items-center justify-between h-full">
          {/* Static Image for Top-Left Corner */}
          <img
            src={Techmaghi}
            alt="Top Left"
            className="absolute top-12 left-12 w-96 h-28"
            style={{ zIndex: 1 }}
          />
          <p className="absolute top-24 right-12 font-semibold text-xl" style={{ zIndex: 1 }}>
            www.techmaghi.com
          </p>

          {/* Overlay text and form inputs */}
          {heading && (
            <h1 className="absolute top-[18%] left-1/2 transform -translate-x-1/2 text-[16px] font-bold text-center" style={{ zIndex: 2 }}>
              {heading}
            </h1>
          )}
          {(name1 || date) && (
            <div className="absolute top-[28%] text-start left-24 text-[12pt]" style={{ zIndex: 2 }}>
              {name1 && <p>Name: {name1}</p>}
              {date && <p className="mt-2">Date: {date}</p>}
            </div>
          )}

          {/* Content with multiple paragraphs */}
          {content && (
            <div
              id="content-container"
              className="absolute top-[35%] left-24 right-24 text-justify text-[12pt] leading-relaxed"
              style={{ zIndex: 2 }}
            >
              {content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Seal and Signature placed immediately below content */}
          <div className="absolute bottom-24 left-12 right-12 flex justify-between" style={{ zIndex: 2 }}>
            {seal && (
              <div>
                <img src={seal} alt="Seal" className="w-32 h-32 ml-36" />
              </div>
            )}
            <div className="text-center pb-48 pr-16">
              {signature && <img src={signature} alt="Signature" className="w-32 h-16 mb-2 ml-8" />}
              {name2 && <p className="text-[12pt] mt-1">{name2}</p>}
              {designation && <p className="text-[12pt] mt-1">{designation}</p>}
            </div>
          </div>
        </div>

        {/* New PNG Image in the Rightmost Bottom */}
        <img
          src={Footer1}
          alt="Right Bottom"
          className="absolute bottom-0 right-0 w-80 h-80"
          style={{ transform: 'translateX(0%) translateY(0%)', zIndex: 1 }}
        />
        
        {/* Techmaghi Info Section */}
        <div className="absolute bottom-12 ml-24 text-[8pt] leading-tight text-gray-400" style={{ zIndex: 1 }}>
          <p>Techmaghi, Integrated Startup Complex, Kinfra Hi-Tech Park,</p>
          <p>HMT Colony, Kalamassery, Kochi, Kerala 683503</p>
          <p>info@techmaghi.com</p>
          <p>+91 8921238815  <span className='ml-3'>+91 7736720926</span></p>        
        </div>

        {/* Vertical Line Separator */}
        <div className="absolute bottom-12 ml-20 w-[1px] h-[50px] bg-blue-400" style={{ zIndex: 1 }} />
      </div>
    </div>
      <Footer/>
    </>
  );
};

export default LetterPadForm;
