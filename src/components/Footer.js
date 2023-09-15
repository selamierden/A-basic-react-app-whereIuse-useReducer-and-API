import React from 'react'
import { Envelope, Telephone, GeoAltFill, Github, Linkedin , Twitter , Instagram } from 'react-bootstrap-icons'

function Footer() {
  return (
    <div>
        <footer className="text-white pt-4 pb-2" style={{ backgroundColor: 'black' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>About Us</h3>
            <p>Developed by Selami Erden with contributions from Coingecko API.</p>
            <div className='d-flex'>
                <a href='https://github.com/selamierden' target='_blank' rel='noreferrer'><Github size={24}/></a>
                <a className='ms-2' href='https://www.linkedin.com/in/selami-erden-a54154226/' target='_blank' rel='noreferrer'><Linkedin size={24}/></a>
                <a className='ms-2' href='https://twitter.com' target='_blank' rel='noreferrer'><Twitter size={24}/></a>
                <a className='ms-2' href='https://www.instagram.com/selamierdn/' target='_blank' rel='noreferrer'><Instagram size={24}/></a>
            </div>
          </div>
          <div className="col-md-3">
            <h3>Quick Links</h3>
            <ul className="list-unstyled">
              <li><a href="/">Home</a></li>
              <li><a href="/">About Us</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Contact Us</h3>
            <ul className="list-unstyled">
              <li><GeoAltFill/> Antalya, Manavgat</li>
              <li><Telephone/> (123) 456-7890</li>
              <li> <Envelope/> info@betterınvestment.com</li>
            </ul>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <p>&copy; 2023 BetterInvestment. All rights reserved.</p>
          </div>
          <div className="col-md-6">
            <ul className="list-inline text-md-right">
              <li className="list-inline-item"><a href="/">Terms of Use</a></li>
              <li className="list-inline-item"><a href="//">Privacy Policy</a></li>
              <li className="list-inline-item"><a href="/">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer