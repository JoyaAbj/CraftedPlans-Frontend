import React, { useRef } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import '../Styles/contact.css';
import FAQ from './FAQ';
import emailjs from '@emailjs/browser';
import { Link } from 'react-router-dom';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
       form.current, 
       process.env.REACT_APP_EMAILJS_PUBLIC_KEY
       )
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  return (
    <div>
        <NavBar/>
        <div className='form-title-contact'>
        <h2 className="regular-title-contact">
          Send Us a 
        </h2>
        <h2 className="italic-title-contact">
          Message
        </h2>
        </div>
        <div className="form-container-contact">
         <div className="left-form-contact">
         <form ref={form} onSubmit={sendEmail}>
          <div className="name-phone-contact">
        <div className="full-name-contact">
          {/* Full Name */}
        <label  className='label-conatct' htmlFor="fullName">Full Name:</label>
        <input className='input-contact'
          type="text"
          id="fullName"
          name="fullName"
          // value= "fullName"
          required
        />
          </div>
          <div className="full-name-contact">
        {/* Phone Number */}
        <label className='label-conatct'  htmlFor="phoneNumber">Phone Number:</label>
        <input className='input-contact'
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          // value="phoneNumber"
          required
        />
        </div>
          </div>
          <div className="full-name-contact">
        {/* Email */}
        <label className='label-conatct'  htmlFor="email">Email:</label>
        <input className='input-contact1'
          type="email"
          id="email"
          name="email"
          // value="email"
          required
        />
        </div>

        <div className="full-name-contact">
        {/* Message */}
        <label className='label-conatct'  htmlFor="message">Message:</label>
        <textarea className='input-contact1'
          id="message"
          name="message"
          // value= "message"
          rows="4"
          cols="50"
          required
        ></textarea>
        </div>

        {/* Submit Button */}
        <button className='submit-btn-contact' type="submit">Submit</button>
      </form>
         </div>
         <div className="right-text-contact">
          <div className="title-right-side">
            <h3 className="craft-your">Craft Your</h3>
            <h3 className="plans">Plans</h3>
          </div>
          <p className="text-contact">
          Need assistance or have questions? Reach out to Crafted Plans —
           we're here to help you on your journey to organized and stylish planning. 
          </p>
          <div className="social-icons-contact">
            <Link to="https://www.instagram.com/buildwithjoya.aj/" target="_blank" rel="noopener noreferrer">
            <img src="/Images/insta-contact.png" alt="insta" className="icons-contact" />
            </Link>
            <Link to="https://www.instagram.com/buildwithjoya.aj/" target="_blank" rel="noopener noreferrer">
            <img src="/Images/facebook-contact.png" alt="insta" className="icons-contact" />
            </Link>
            <Link to="https://www.tiktok.com/@webdesign_andstuff" target="_blank" rel="noopener noreferrer">
            <img src="/Images/tiktok-contact.png" alt="insta" className="icons-contact" />
            </Link>
          </div>
         </div>
        </div>

        <div className="extra-info-contact">
          <div className="block-contact">
            <img src="/Images/phone.png" alt="phone" className="contact-icon" />
            <p className="info-contact">
            +961 71 123 456
            </p>
          </div>
          <div className="block-contact">
            <img src="/Images/mail.png" alt="mail" className="contact-icon" />
            <p className="info-contact">
            crafted.plans@gmail.com
            </p>
          </div>
          <div className="block-contact">
            <img src="/Images/location.png" alt="location" className="contact-icon" />
            <p className="info-contact">
            Beirut, Lebanon
            </p>
          </div>
        </div>
        <FAQ/>
        <Footer/>
    </div>
  )
}

export default Contact
