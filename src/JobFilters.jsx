import React from 'react';
import { experienceFilterList } from './utilities/ArrayList';
import {
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';

const JobFilters = (props) => {
  const {filters, handleFilterChange} = props;
  return (
    <div className='filter-div' style={{margin: "24px 0px"}}>
        <FormControl sx={{ minWidth: 170 }} size="small">
            <InputLabel>Min Experience</InputLabel>
            <Select
                name="minExperience"
                value={filters.minExperience}
                onChange={handleFilterChange}
            >
                {experienceFilterList.map((el, ind)=><MenuItem value={`${el}`} key={ind}>{el} Years</MenuItem>)}
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
  )
}

export default JobFilters
