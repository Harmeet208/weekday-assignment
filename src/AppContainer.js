import React, { useState, useEffect } from 'react';
import './AppContainer.css';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Box,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import { fetchJobs } from './requestUtility';

const AppContainer = () => {
    const [jobs, setJobs] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
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
        .catch((error) => console.error(error));;
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
            (!minExperience || job.experience >= minExperience) &&
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
        <div>
            <div>
                <FormControl>
                    <InputLabel>Min Experience</InputLabel>
                    <Select
                        name="minExperience"
                        value={filters.minExperience}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="0">0 Years</MenuItem>
                        <MenuItem value="1">1 Year</MenuItem>
                        <MenuItem value="2">2 Years</MenuItem>
                        <MenuItem value="3">3 Years</MenuItem>
                        <MenuItem value="4">4 Years</MenuItem>
                        <MenuItem value="5">5 Years</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="companyName"
                    label="Company Name"
                    value={filters.companyName}
                    onChange={handleFilterChange}
                />
                <TextField
                    name="location"
                    label="Location"
                    value={filters.location}
                    onChange={handleFilterChange}
                />
                <FormControl>
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
                    name="techStack"
                    label="Tech Stack"
                    value={filters.techStack}
                    onChange={handleFilterChange}
                />
                <TextField
                    name="role"
                    label="Role"
                    value={filters.role}
                    onChange={handleFilterChange}
                />
                <TextField
                    name="minBasePay"
                    label="Min Base Pay"
                    value={filters.minBasePay}
                    onChange={handleFilterChange}
                />
            </div>
            <Grid container spacing={5}>
                {filteredJobs.map((job, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {job.role}
                                </Typography>
                                <div className='company-details'>
                                    <img className='company-details-logo' src={job.logoUrl} />
                                    <div className='role-details'>
                                        <h3>
                                            {job.companyName}
                                        </h3>
                                        <h4>
                                            {job.jobRole}
                                        </h4>
                                    </div>
                                </div>
                                <p className='cards-sub-text'>{job.location}</p>
                                <Typography
                                    variant="body2"
                                    title={job.jobDetailsFromCompany}
                                >
                                    {job.jobDetailsFromCompany}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Minimum Experience: {job.minExp ? `${job.minExp} Years` : "N/A"}
                                </Typography>
                                <Box>
                                    <Button startIcon={<BoltIcon id='bolt-icon' />} variant="contained" id='btn-primary'>
                                        Easy Apply
                                    </Button>
                                    <Button variant="contained" id='btn-secondary'>
                                        Unlock Referral Asks
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default AppContainer;