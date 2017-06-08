package edu.sjsu.cmpe275.services;

import java.util.List;

import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.model.Company;
import edu.sjsu.cmpe275.model.JobPost;

@Service
public interface CompanyService {

	public boolean addNewJob(JobPost jobPost);

	public JobPost getJobDetails(String jobid);

	public String getIdByEmailID(String emailId);
	public Company getCompanyByIdAndVerCode(String verificationCode, String companyId);

	
	public boolean updateJobDetails(JobPost jobPost);
	
	public List<JobPost> getJobsByCompany(String CompanyId);
	
	public List<Company> getAllCompanies();

	public Company getCompanyByEmail(String email);
	public Company findCompanyById(String companyId);
	
	public boolean updateCompanyDetails(Company company);

}
