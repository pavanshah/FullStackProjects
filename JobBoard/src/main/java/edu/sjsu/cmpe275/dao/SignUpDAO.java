package edu.sjsu.cmpe275.dao;

import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.model.Company;
import edu.sjsu.cmpe275.model.JobSeeker;

@Repository
public interface SignUpDAO {
	public boolean signUpJobSeeker(JobSeeker jobSeeker);
	public boolean updateVerifyJobSeeker(String emailId, String verifyStatus);
	public boolean updateVerifyCompany(String emailId, String verifyStatus);
	public boolean checkLoginCredentialsCompany(String emailId, String password);
	public boolean checkLoginCredentialsJobSeeker(String emailId, String password);
	public boolean signUpCompany(Company company);
}
