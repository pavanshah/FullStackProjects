package edu.sjsu.cmpe275.services;

import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.model.Company;
import edu.sjsu.cmpe275.model.JobSeeker;

@Service
public interface SignUpService {
	public boolean signUpJobSeeker(JobSeeker jobseeker);
	public boolean updateVerifyJobSeeker(String emailId, String verifyStatus);
	public boolean updateVerifyCompany(String emailId, String verifyStatus);
	public boolean checkLoginCredentials(String emailId, String password, String userType);
	public boolean signUpCompany(Company company);
}
