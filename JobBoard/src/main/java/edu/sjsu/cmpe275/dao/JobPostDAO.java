package edu.sjsu.cmpe275.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.model.Application;
import edu.sjsu.cmpe275.model.JobPost;

@Repository
public interface JobPostDAO {

	public boolean addNewJob(JobPost jobPost);
	
	public JobPost getJobDetails(String jobid);
	
	public boolean updateJobDetails(JobPost jobPost);

	public List<JobPost> getJobsByCompany(String CompanyId);
	
	public List<Application> getJobPostApplications(JobPost jobPost);
	
	public boolean updateApplication(Application application);
	
	public Application getApplicationDetails(String applicationId);
	
	public List<JobPost> searchByText(String keyword);
	
	public List<JobPost> searchByFilter(List<String> companyList, List<String> locationList, Integer start, Integer end, String rangeType);
}
