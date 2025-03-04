import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import Techmaghi from '../assets/techmaghi.png';
import Watermark from '../assets/watermark.png';
import Footer1 from '../assets/footer.png';
import amritha from '../assets/amrutha.jpg';
import Footer from './Footer';
import Header from './Header';


const LetterPadForm = () => {
  const [studentName, setStudentName] = useState('Amal Joseph');
  const [date, setDate] = useState('14 Feb 2025');
  const [signature, setSignature] = useState(null);

  const handleSignatureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSignature(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('letter-pad-container');
    const fileName = `${studentName.replace(/\s+/g, '_').toUpperCase()}_MOU.pdf`; // Ensure correct filename format
  
    const opt = {
      margin: [0, 0, 0, 0],
      filename: fileName, // Assign filename dynamically
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
  
    html2pdf()
      .from(element)
      .set(opt)
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        while (pdf.internal.getNumberOfPages() > 2) {
          pdf.deletePage(pdf.internal.getNumberOfPages());
        }
        pdf.save(fileName); // Ensure file is saved with correct name
      });
  };
  
  

  return (
    <>
      <Header />
      <div className="container mx-auto p-4 font-plus-jakarta">
        {/* Inputs & Download Button */}
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            className="border p-2 rounded w-1/3"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter Student Name"
          />
          <input
            type="text"
            className="border p-2 rounded w-1/3"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Enter Date"
          />
                    <input type="file" accept="image/*" onChange={handleSignatureUpload} className="border p-2 rounded w-1/3" />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded text-md hover:bg-blue-600"
            onClick={handleDownloadPDF}
          >
            Download as PDF
          </button>
        </div>

        {/* Wrapper for Multi-page PDF */}
        <div id="letter-pad-container" className="mx-auto shadow-lg rounded bg-white">
          
          {/* ===== PAGE 1 ===== */}
          <div className="relative p-8 border max-w-[210mm] h-[297mm] overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex justify-center items-center z-0">
              <img src={Watermark} alt="Watermark" className="w-[60%] h-auto opacity-100" />
            </div>

            {/* Header Logo */}
            <img src={Techmaghi} alt="Top Left" className="absolute top-12 left-12 w-96 h-28 z-10" />
            <p className="absolute top-24 right-12 font-semibold text-xl z-10">www.techmaghi.com</p>

            {/* Title */}
            <h1 className="absolute top-[18%] text-[24px] font-bold text-center w-full z-10">
            MEMORANDUM OF UNDERSTANDING
          </h1>
          <h2 className='font-thin text-black absolute top-[20%] text-center mt-6 text-[18px] w-full z-10'>
            FOR ENROLLMENT IN GEM NETWORK PROGRAM
          </h2>
          <p className='font-normal text-black absolute top-[24%] text-center mt-6 text-[18px] tracking-wider px-7 z-10'>
            This Memorandum of Understanding is made and entered into on {date}, by and between:
          </p>

          <h2 className='font-bold text-black absolute top-[29%] text-center mt-8 text-[20px] w-full z-10'>
            Techmaghi LLP
          </h2>
          <p className='font-normal text-black absolute top-[35%] text-center px-9 text-[18px] z-10'>
            (hereinafter referred to as "First party"), a company incorporated under the laws of
            India, having its principal place of business at Startup Village, Kinfra Hi-Tech Park, Kalamassery, Kochi, Pin: 683503,
          </p>

          <p className='text-black absolute top-[43%] text-center text-[20px] w-[97%] z-10'>
            and
          </p>

          <p className='font-bold text-black absolute top-[46%] text-center w-[97%] text-[18px] z-10'>
            {studentName}
          </p>

          <p className='font-normal text-black absolute top-[48%] text-center text-[16px] w-full z-10'>
            (hereinafter referred to as the "Student")
          </p>

          <h2 className='font-bold text-black absolute top-[52%] text-left px-9 text-[18px] z-10'>Purpose</h2>
          <p className='font-normal text-black absolute top-[55%] text-justify px-9 text-[16px] z-10'>
            This MOU sets forth the terms and conditions under which the Student shall enroll in
            Techmaghi's GEM Network Program (hereinafter referred to as the "Program") for
            the purpose of receiving placement opportunities, and if successfully placed,
            grants first party permission to use certain personal details for marketing purposes.
          </p>

          <h2 className='font-bold text-black absolute top-[65%] text-left px-9 text-[18px] z-10'>Terms and Conditions</h2>
          <p className='font-normal text-black absolute top-[69%] text-justify px-9 text-[16px] z-10'>
            1. <span className='font-bold'> Enrollment in GEM Network Program:</span> The Student agrees to enroll in the Program
            to access job opportunities provided by first party through its network of partner companies.
          </p>
          <p className='font-normal text-black absolute top-[74%] text-justify px-9 text-[16px] z-10'>
            2. <span className='font-bold'>Job Placement:</span>  If the Student is successfully placed through the Program, the Student agrees to allow first party to use their name,photo, and placement details (such as
              job title and employer name)for promotional and marketing activities.
          </p>
          <p className='font-normal text-black absolute top-[81%] text-justify px-9 text-[16px] z-10'>
            3. <span className='font-bold'>Financial Arrangement:</span>  Upon securing employment through the First Party, Student is
obligated to pay a service fee equivalent to 5 percent of their annual CTC for the
placement facilitated by First Party.
          </p>

            {/* Footer Image */}
            <img src={Footer1} alt="Right Bottom" className="absolute bottom-0 right-0 w-80 h-80 z-0" />
            <div className="absolute bottom-12 ml-14 text-[8pt] leading-tight text-gray-400" style={{ zIndex: 1 }}>
            <p>Techmaghi, Integrated Startup Complex, Kinfra Hi-Tech Park,</p>
            <p>HMT Colony, Kalamassery, Kochi, Kerala 683503</p>
            <p>info@techmaghi.com</p>
            <p>+91 8921238815  <span className='ml-3'>+91 7736720926</span></p>        
          </div>
          <div className="absolute bottom-10 ml-10 w-[1px] h-[52px] bg-blue-500" style={{ zIndex: 1 }} />
          </div>

          {/* ===== PAGE 2 ===== */}
          <div className="relative p-8 border max-w-[210mm] h-[297mm] overflow-hidden">
            {/* Watermark */}
            <div className="absolute inset-0 flex justify-center items-center z-0">
              <img src={Watermark} alt="Watermark" className="w-[60%] h-auto opacity-100" />
            </div>
            <img src={Techmaghi} alt="Top Left" className="absolute top-12 left-12 w-96 h-28 z-10" />
            <p className="absolute top-24 right-12 font-semibold text-xl z-10">www.techmaghi.com</p>
            {/* Page Title */}

            {/* More Content */}
            <p className="font-normal absolute top-[13%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              4. <span className="font-bold">Confidentiality:</span> Both parties agree that all personal and professional information shared
during the Program shall remain confidential unless the Student provides explicit consent
forits use, as stated in Clause2.
            </p>
            <p className="font-normal absolute top-[20%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              5. <span className="font-bold">Non-Exclusive Participation:</span> The Student’s participation in the GEM Network Program
              does not restrict them from pursuing other job opportunities independently.
            </p>
            <p className="font-normal absolute top-[25%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              6. <span className="font-bold">Termination of Agreement:</span> Either party may terminate this agreement by providing
written notice to the other party. Termination shall not affect any prior consent given by the
Student for the use of placement details if the Student has been successfully placed
beforethe termination date.
            </p>
            <p className="font-normal absolute top-[34%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              7. <span className="font-bold">No Guarantee of Placement:</span> While first party will make every effort to connect the
Student with relevant job opportunities, it is expressly understood that there is no
guarantee of job placement through the Program.
            </p>
            <p className="font-normal absolute top-[41%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              8. <span className="font-bold">Governing Law:</span> This MOU shall be governed by and construed in accordance with the
              lawsofIndia.
            </p>
            <p className="font-normal absolute top-[46%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              9. <span className="font-bold">Acceptance and Execution:</span> By signing below, both parties acknowledge that they have
              read, understood, and agree to the terms and conditions set forth in this MOU
            </p>

            {/* Signatures */}
            <p className="font-normal absolute top-[52%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              <strong>For Techmaghi</strong></p>
              <p className="font-normal absolute top-[55%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              Name: Amritha Ajithkumar</p>
              <p className="font-normal absolute top-[58%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              Designation: Program Manager</p>
              <p className="font-normal absolute top-[61%] text-black text-justify px-9 text-[16px] z-10 mt-4 flex items-center gap-1">
              Signature:<img src={amritha} alt="Signature" className="h-10 w-24" /></p>
              <p className="font-normal absolute top-[65%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              Date: {date}</p>
              <br />
              <p className="font-normal absolute top-[69%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              <strong>For Student</strong></p>
              <p className="font-normal absolute top-[72%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              Name: {studentName}</p>
              <p className="font-normal absolute top-[75%] text-black text-justify px-9 text-[16px] z-10 mt-4 flex items-center gap-1">
  Signature: 
  {signature && <img src={signature} alt="Signature" className="h-10 w-24" />}
</p>

              <p className="font-normal absolute top-[79%] text-black text-justify px-9 text-[16px] z-10 mt-4">
              Date: {date}</p>

            {/* Footer Image */}
            <img src={Footer1} alt="Right Bottom" className="absolute bottom-0 right-0 w-80 h-80 z-0" />
          <div className="absolute bottom-12 ml-14 text-[8pt] leading-tight text-gray-400" style={{ zIndex: 1 }}>
            <p>Techmaghi, Integrated Startup Complex, Kinfra Hi-Tech Park,</p>
            <p>HMT Colony, Kalamassery, Kochi, Kerala 683503</p>
            <p>info@techmaghi.com</p>
            <p>+91 8921238815  <span className='ml-3'>+91 7736720926</span></p>        
          </div>
          <div className="absolute bottom-10 ml-10 w-[1px] h-[52px] bg-blue-500" style={{ zIndex: 1 }} />
       
        
        </div>
          </div>

        
      </div>
      <Footer />
    </>
  );
};

export default LetterPadForm;
