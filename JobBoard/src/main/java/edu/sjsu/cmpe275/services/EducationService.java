package edu.sjsu.cmpe275.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe275.model.Education;
import edu.sjsu.cmpe275.model.JobSeeker;

@Service
@Transactional
public interface EducationService {
	public boolean saveEducation(List<Education> edcuationList);
	public List<Education> getEducationByJobSeeker(JobSeeker jobSeeker);
}
