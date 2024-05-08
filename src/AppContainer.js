import React, { useState, useEffect } from 'react';
import './AppContainer.css';
import {
    Grid,
    Container
} from '@mui/material';
import { fetchJobs } from './utilities/requestUtility';
import JobCard from './JobCard';
import JobFilters from './JobFilters';

const AppContainer = () => {
    const [jobs, setJobs] = useState([]);
    // eslint-disable-next-line
    const [totalCount, setTotalCount] = useState(0);
    // eslint-disable-next-line
    const [offset, setOffset] = useState(0);
    const [limit] = useState(947);
    const [filters, setFilters] = useState({
        minExperience: '',
        companyName: '',
        location: '',
        remote: '',
        techStack: '',
        role: '',
        minBasePay: '',
    });

    useEffect(() => {
        fetchJobs(limit, offset).then((result) => {
            setJobs((prevJobs) => [...prevJobs, ...result.jdList]);
            setTotalCount(result.totalCount);
        }) 
        .catch((error) => console.error(error));
    // eslint-disable-next-line
    }, [offset]);
    // Added event to check if user has reached end of the page
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            setOffset(offset + limit);
        }
    };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredJobs = jobs.filter((job) => {
        const {
            minExperience,
            companyName,
            location,
            role,
            minBasePay,
        } = filters;
        return (
            (!minExperience || job.minExp >= minExperience) &&
            (!companyName ||
                job.companyName.toLowerCase().includes(companyName.toLowerCase())) &&
            (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
            (!role || job.jobRole.toLowerCase().includes(role.toLowerCase())) &&
            (!minBasePay || job.minJdSalary >= minBasePay)
        );
    });

    return (
        <Container maxWidth="xl">
            <JobFilters filters={filters} handleFilterChange={handleFilterChange} />
            {/* grid to show code */}
            <Grid container spacing={16}>
                {filteredJobs.map((job, index) => (
                    <JobCard job={job} index={index} key={index} />
                ))}
            </Grid>
        </Container>
    );
};

export default AppContainer;