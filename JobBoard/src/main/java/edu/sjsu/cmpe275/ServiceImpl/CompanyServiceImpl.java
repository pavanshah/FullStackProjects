package edu.sjsu.cmpe275.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.dao.CompanyDAO;
import edu.sjsu.cmpe275.dao.JobPostDAO;
import edu.sjsu.cmpe275.model.Company;
import edu.sjsu.cmpe275.model.JobPost;
import edu.sjsu.cmpe275.services.CompanyService;

@Service
public class CompanyServiceImpl implements CompanyService {


	@Autowired
	JobPostDAO jobPostDAO;
	
	@Autowired
	CompanyDAO companyDAO;
	
	@Override
	public boolean addNewJob(JobPost jobPost) {
		
		return jobPostDAO.addNewJob(jobPost);
	}

	@Override
	public JobPost getJobDetails(String jobid) {
		return jobPostDAO.getJobDetails(jobid);
		
	}


	@Override
	public boolean updateJobDetails(JobPost jobPost) {
		
		return jobPostDAO.updateJobDetails(jobPost);	
	
	}

	@Override
	public List<JobPost> getJobsByCompany(String CompanyId) {

		return jobPostDAO.getJobsByCompany(CompanyId);
	}

	@Override
	public List<Company> getAllCompanies() {
		
		return companyDAO.getAllCompanies();
	}

	@Override
	public Company findCompanyById(String companyId) {
		
		return companyDAO.findCompanyById(companyId);
		
	}

	
	@Override
	public String getIdByEmailID(String emailId) {
		
		return companyDAO.getIdByEmailID(emailId);
	}

	@Override
	public Company getCompanyByIdAndVerCode(String verificationCode, String companyId) {
		return companyDAO.getCompanyByIdAndVerCode(verificationCode, companyId);
	}

	@Override
	public boolean updateCompanyDetails(Company company) {
		return companyDAO.updateCompanyDetails(company);
	}

	@Override
	public Company getCompanyByEmail(String email) {
		return companyDAO.getCompanyByEmail(email);
	}

}
