import React, { useState, useEffect } from 'react';
import './recruiterpage.css';



const RecruiterPage = () => {
    // Dummy data
    const initialJobs = [
        { id: 1, title: 'Software Engineer', description: 'We are looking for a skilled software engineer to join our team.' },
        { id: 2, title: 'Product Manager', description: 'Join us as a product manager and lead innovative projects.' },
        { id: 3, title: 'UI/UX Designer', description: 'We need a creative UI/UX designer to enhance our user experience.' },
    ];

    const [jobs, setJobs] = useState(initialJobs); // State to store jobs
    const [newJob, setNewJob] = useState({ title: '', description: '' }); // State for new job form
    const [editingJob, setEditingJob] = useState(null); // State for editing job
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    // Slider data
    const slides = [
        {
            image: '14.jpg',
        },
        {
            image: '10.jpg',
        },
        {
            image: '8.jpg',
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0); // State for current slide

    // Automatic slide transition
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 2000); // Change slide every 2 seconds

        return () => clearInterval(interval);
    }, []);

    // Add a new job
    const addJob = () => {
        if (!newJob.title || !newJob.description) return;

        const job = {
            id: jobs.length + 1, // Generate a new ID
            title: newJob.title,
            description: newJob.description,
        };

        setJobs([...jobs, job]);
        setNewJob({ title: '', description: '' }); // Clear form
    };

    // Edit a job
    const editJob = (id, updatedJob) => {
        setJobs(jobs.map((job) => (job.id === id ? updatedJob : job)));
        setEditingJob(null); // Exit edit mode
    };

    // Delete a job
    const deleteJob = (id) => {
        setJobs(jobs.filter((job) => job.id !== id));
    };

    // Filter jobs based on search term
    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Navbar */}
            <div className="navbar">
                <h1>Recruiter Portal</h1>
                <h1>Welcome</h1>
            </div>

            {/* Slider */}
            <div className="slider">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    >
                        <div className="slide-content">
                            <h1>{slide.title}</h1>
                            <p>{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Job Form */}
            <div className="job-form">
                <h2>{editingJob ? 'Edit Job' : 'Post a New Job'}</h2>
                <input
                    type="text"
                    placeholder="Job Title"
                    value={editingJob ? editingJob.title : newJob.title}
                    onChange={(e) =>
                        editingJob
                            ? setEditingJob({ ...editingJob, title: e.target.value })
                            : setNewJob({ ...newJob, title: e.target.value })
                    }
                />
                <textarea
                    placeholder="Job Description"
                    value={editingJob ? editingJob.description : newJob.description}
                    onChange={(e) =>
                        editingJob
                            ? setEditingJob({ ...editingJob, description: e.target.value })
                            : setNewJob({ ...newJob, description: e.target.value })
                    }
                />
                <button
                    onClick={() =>
                        editingJob ? editJob(editingJob.id, editingJob) : addJob()
                    }
                >
                    {editingJob ? 'Save Changes' : 'Add Job'}
                </button>
                {editingJob && (
                    <button onClick={() => setEditingJob(null)}>Cancel</button>
                )}
            </div>

            {/* Job Listings */}
            <div className="job-listings">
                {filteredJobs.map((job) => (
                    <div className="job-card" key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <button onClick={() => setEditingJob(job)}  style={{ backgroundColor: '#155dfc' }}>Edit</button>
                        <button onClick={() => deleteJob(job.id)} style={{ backgroundColor: 'red' }}>Delete</button>
                    </div>
                ))}
            </div>

                 {/* Join Our Team Section */}
                 <div className="join-team-section">
                <h2>Join Our Innovative Team</h2>
                <p>We're hiring creative minds to build the future. Explore our open positions and apply today!</p>
                <button>View Openings</button>
            </div>

            <h1>Current Openings</h1>
            
            <div className="jobs-section">
  <div className="job-card">
    <img src="job1.jpg" alt="Software Engineer" className="job-image" />
    <div className="job-details">
      <h3>Software Engineer</h3>
      <p>We are looking for a skilled software engineer to join our team.</p>
    </div>
  </div>

  <div className="job-card">
    <img src="job2.jpg" alt="Data Scientist" className="job-image" />
    <div className="job-details">
      <h3>Data Scientist</h3>
      <p>Join our team to work on exciting data-driven projects.</p>
    </div>
  </div>

  <div className="job-card">
    <img src="job3.jpg" alt="UI/UX Designer" className="job-image" />
    <div className="job-details">
      <h3>UI/UX Designer</h3>
      <p>We are looking for a creative UI/UX designer to join our team.</p>
    </div>
  </div>
</div>

            <div className="join-team-section">
                <h2>Ready To Join Us</h2>
                <p>Don't wait! Apply now and take the first step towards an exciting career.</p>
                {/* <button>Apply Now</button> */}
                <button className="animated-button">Apply Now</button>
            </div>

            {/* Footer */}
            <div className="footer">
                <p>&copy; 2023 Recruiter Portal. All rights reserved.</p>
            </div>
        </div>
    );
};

export default RecruiterPage;