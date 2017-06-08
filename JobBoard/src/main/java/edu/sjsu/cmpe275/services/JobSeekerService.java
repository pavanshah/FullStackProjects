package edu.sjsu.cmpe275.services;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.model.Application;
import edu.sjsu.cmpe275.model.InterestedJobPost;
import edu.sjsu.cmpe275.model.JobPost;
import edu.sjsu.cmpe275.model.JobSeeker;


@Service
public interface JobSeekerService {
	public JobSeeker updateJobSeekerProfile(JobSeeker jobSeeker);

	public boolean applyToJobPost(Application application);

	public JobSeeker getJobSeekerProfile(String emailid);

	public String getIdByEmailID(String emailId);
	public JobSeeker getJobSeekerByIdAndVerCode(String verificationCode, String jobSeekerId);
	
	public List<Application> getJobSeekerApplications(JobSeeker jobSeekerId);

	public boolean markAsInterested(InterestedJobPost interestedJobPost);
	
	public List<InterestedJobPost> getJobSeekerInterestedList(JobSeeker jobSeekerId);  
}
