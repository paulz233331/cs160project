import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import './home.css';
import video from '../../assets/video.mp4';

const Home = () => {
    return (
        <div>
            <Navbar employerNavBar={false} />
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
        </div>
    )
}

export default Home
