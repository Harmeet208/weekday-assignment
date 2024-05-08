import React, { useState, useEffect } from 'react';
import './AppContainer.css';
import {
    Grid,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Container
} from '@mui/material';
import { fetchJobs } from './utilities/requestUtility';
import JobCard from './JobCard';
import { experienceFilterList } from './utilities/ArrayList';

const AppContainer = () => {
    const [jobs, setJobs] = useState([]);
    // eslint-disable-next-line
    const [totalCount, setTotalCount] = useState(0);
    // eslint-disable-next-line
    const [offset, setOffset] = useState(0);
    const [limit] = useState(10);
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

    //   const handleScroll = (e) => {
    //     const bottom =
    //       e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    //     if (bottom && jobs.length < totalCount) {
    //       setOffset(offset + limit);
    //     }
    //   };

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredJobs = jobs.filter((job) => {
        const {
            minExperience,
            companyName,
            location,
            remote,
            techStack,
            role,
            minBasePay,
        } = filters;
        return (
            (!minExperience || job.minExperience >= minExperience) &&
            (!companyName ||
                job.companyName.toLowerCase().includes(companyName.toLowerCase())) &&
            (!location || job.location.toLowerCase().includes(location.toLowerCase())) &&
            (!remote || job.remote.toString() === remote) &&
            (!techStack ||
                job.techStack.toLowerCase().includes(techStack.toLowerCase())) &&
            (!role || job.role.toLowerCase().includes(role.toLowerCase())) &&
            (!minBasePay || job.minBasePay >= minBasePay)
        );
    });

    return (
        <Container maxWidth="xl">
            <div className='filter-div' style={{margin: "24px 0px"}}>
                <FormControl sx={{ minWidth: 170 }} size="small">
                    <InputLabel>Min Experience</InputLabel>
                    <Select
                        name="minExperience"
                        value={filters.minExperience}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        {experienceFilterList.map(el=><MenuItem value={`${el}`}>{el} Years</MenuItem>)}
                    </Select>
                </FormControl>
                <TextField
                    size="small"
                    name="companyName"
                    label="Company Name"
                    value={filters.companyName}
                    onChange={handleFilterChange}
                />
                <TextField
                    size="small"
                    name="location"
                    label="Location"
                    value={filters.location}
                    onChange={handleFilterChange}
                />
                <FormControl sx={{ minWidth: 170 }} size="small">
                    <InputLabel>Remote/On-site</InputLabel>
                    <Select
                        name="remote"
                        value={filters.remote}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="true">Remote</MenuItem>
                        <MenuItem value="false">On-site</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    size="small"
                    name="techStack"
                    label="Tech Stack"
                    value={filters.techStack}
                    onChange={handleFilterChange}
                />
                <TextField
                    size="small"
                    name="role"
                    label="Role"
                    value={filters.role}
                    onChange={handleFilterChange}
                />
                <TextField
                    size="small"
                    name="minBasePay"
                    label="Min Base Pay"
                    value={filters.minBasePay}
                    onChange={handleFilterChange}
                />
            </div>
            <Grid container spacing={16}>
                {filteredJobs.map((job, index) => (
                    <JobCard job={job} index={index} />
                ))}
            </Grid>
        </Container>
    );
};

export default AppContainer;