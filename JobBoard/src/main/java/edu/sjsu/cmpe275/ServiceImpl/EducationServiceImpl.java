package edu.sjsu.cmpe275.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe275.dao.EducationDAO;
import edu.sjsu.cmpe275.model.Education;
import edu.sjsu.cmpe275.model.JobSeeker;
import edu.sjsu.cmpe275.services.EducationService;

@Service
@Transactional
public class EducationServiceImpl implements EducationService{
	
	@Autowired
	EducationDAO educationDAO;
	
	public boolean saveEducation(List<Education> edcuationList){
		
		for(Education education: edcuationList){
			
			if(!educationDAO.saveEducation(education)){
				return false;
			}
			
		}
		return true;
	}

	@Override
	public List<Education> getEducationByJobSeeker(JobSeeker jobSeeker) {
		return educationDAO.getEducationByJobSeeker(jobSeeker);
	}
}
