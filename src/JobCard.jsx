import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Box
} from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

const JobCard = (props) => {
  const { job, index } = props;
  return (
    <Grid item xs={12} sm={6} md={4} key={index}>
        <Card className="job-card">
            <CardContent>
                <Typography variant="h6">
                    {job.role}
                </Typography>
                <div className='company-details'>
                    <img className='company-details-logo' src={job.logoUrl} alt={'company-logo'} />
                    <div className='role-details'>
                        <h3>
                            {job.companyName}
                        </h3>
                        <h4>
                            {job.jobRole}
                        </h4>
                        <p className='cards-sub-text'>{job.location}</p>
                    </div>
                </div>
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
                    <Button startIcon={<BoltIcon id='bolt-icon' />} variant="contained" id='btn-primary' className="btn">
                        Easy Apply
                    </Button>
                    <Button variant="contained" id='btn-secondary' className="btn">
                        Unlock Referral Asks
                    </Button>
                </Box>
            </CardContent>
        </Card>
    </Grid>
  )
}

export default JobCard
