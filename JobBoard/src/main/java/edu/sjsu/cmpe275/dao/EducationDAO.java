package edu.sjsu.cmpe275.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.model.Education;
import edu.sjsu.cmpe275.model.JobSeeker;

@Repository
public interface EducationDAO {
	public boolean saveEducation(Education edcuation);
	public boolean deleteEducation(Education edcuation);
	public List<Education> getEducationByJobSeeker(JobSeeker jobSeeker);
}
