package edu.sjsu.cmpe275.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.dao.JobSeekerDAO;
import edu.sjsu.cmpe275.model.Application;
import edu.sjsu.cmpe275.model.InterestedJobPost;
import edu.sjsu.cmpe275.model.JobPost;
import edu.sjsu.cmpe275.model.JobSeeker;
import edu.sjsu.cmpe275.services.JobSeekerService;

@Service
public class JobSeekerServiceImpl implements JobSeekerService {

	@Autowired
	JobSeekerDAO jobSeekerDAO;
	
	@Override
	public String getIdByEmailID(String emailId) {
		
		return jobSeekerDAO.getIdByEmailID(emailId);
	}

	@Override
	public JobSeeker getJobSeekerByIdAndVerCode(String verificationCode, String jobSeekerId) {
		return jobSeekerDAO.getJobSeekerByIdAndVerCode(verificationCode, jobSeekerId);
	}
	

	@Override
	public JobSeeker updateJobSeekerProfile(JobSeeker jobSeeker) {
		//return null;
		return jobSeekerDAO.updateJobSeekerProfile(jobSeeker);
	}

	@Override
	public boolean applyToJobPost(Application application){
		
		return jobSeekerDAO.applyToJobPost(application);
		
	}

	public JobSeeker getJobSeekerProfile(String emailid) {
		// TODO Auto-generated method stub
		return jobSeekerDAO.getJobSeekerProfile(emailid);
	}
	
	public List<Application> getJobSeekerApplications(JobSeeker jobSeekerId){
		
		return jobSeekerDAO.getJobSeekerApplications(jobSeekerId);
	}

	@Override
	public boolean markAsInterested(InterestedJobPost jobpost) {
		// TODO Auto-generated method stub
		return jobSeekerDAO.markAsInterested(jobpost);
	}

	@Override
	public List<InterestedJobPost> getJobSeekerInterestedList(JobSeeker jobSeekerId) {
		// TODO Auto-generated method stub
		return jobSeekerDAO.getJobSeekerInterestedList(jobSeekerId);
	}


}
