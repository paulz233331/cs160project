import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './home.css';
import video from '../../assets/video.mp4';

const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                {/* Background video */}
                <video src={video} muted loop autoPlay></video>

                {/* Text content */}
                <section>
                    <div className="text">
                        <h1>Find the Best Candidates for the job</h1>
                        <h3>A tool for resume screening, resume sorting, and talent management</h3>
                        <p>Lucent Applicant Tracking System is an application desgined to make the hiring process simpler for both applicants and employers.
                            Using Lucent ATS employers can save time, save money, improve candidate experince, and be provided with candidates that best fit their company needs.
                            Applicants benefit by saving time and effort throughout the application process with the resume parser and intuitive user interface. 
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home
