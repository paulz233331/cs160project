import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './home.css';
import video from '../../assets/video.mp4';
import About from '../About';
import Pricing from '../Pricing';
import Contact from '../Contact';

const Home = () => {
    return (
        <div>
            <div style={{position: 'fixed'}} className="scrollnav">
            <Navbar employerNavBar={false} />
            <div className="scrollnavbar">
                <ul className="scrollnavbarlinks">
                    <li className="scrollnavbarlinksitem"><a className="scrollnavbarlinkslink" href="#about">About Us</a></li>
                    <li className="scrollnavbarlinksitem"><a className="scrollnavbarlinkslink" href="#pricing">Pricing</a></li>
                    <li className="scrollnavbarlinksitem"><a className="scrollnavbarlinkslink" href="#contact">Contact Us</a></li>
                </ul>
            </div>
            </div>
            <div className="home-container">
                {/* Background video */}
                <video src={video} muted loop autoPlay></video>

                {/* Text content */}
                <section>
                    <div className="text">
                       <br /><br/> <h1>Find the Best Candidates for the job</h1>
                        <h3>A tool for resume screening, resume sorting, and talent management</h3>
                        <p>Lucent Applicant Tracking System simplifies the hiring process for both applicants and employers.
                            Employers save time, save money, and find the best candidates.
                            Applicants apply using the resume parser and intuitive user interface.
                        </p>
                    </div>
                </section>
            </div>
            <div id="about"><About /></div>
            <div id="pricing"><Pricing /></div>
            <div id="contact"><Contact /></div>
            <div style={{display: 'flex',justifyContent: 'center', alignItems: 'center', height: '10vh', width: '100vw'}} className="footer"> &#169; 2021. All Rights Reserved. Lucent ATS</div>
        </div>
    )
}

export default Home
