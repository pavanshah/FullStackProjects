package edu.sjsu.cmpe275.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe275.model.Application;
import edu.sjsu.cmpe275.model.JobPost;

@Service
@Transactional
public interface JobPostService {
	public List<Application> getJobPostApplications(JobPost jobPost);
	public List<JobPost> searchByText(String keyword);
	public List<JobPost> searchByFilter(List<String> companyList, List<String> locationList, Integer start, Integer end, String rangeType);
	public boolean updateApplication(Application application);
	public Application getApplicationDetails(String applicationId);
}
