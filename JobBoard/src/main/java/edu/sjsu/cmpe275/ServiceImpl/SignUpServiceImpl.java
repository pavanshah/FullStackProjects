package edu.sjsu.cmpe275.ServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.sjsu.cmpe275.dao.SignUpDAO;
import edu.sjsu.cmpe275.model.Company;
import edu.sjsu.cmpe275.model.JobSeeker;
import edu.sjsu.cmpe275.services.SignUpService;

@Service
public class SignUpServiceImpl implements SignUpService {
	
	@Autowired
	SignUpDAO signUpDAO;

	@Override
	public boolean signUpJobSeeker(JobSeeker jobSeeker) {
		
		return signUpDAO.signUpJobSeeker(jobSeeker);
	}
	
	@Override
	public boolean signUpCompany(Company company) {
		
		return signUpDAO.signUpCompany(company);
	}

	@Override
	public boolean updateVerifyJobSeeker(String emailId, String verifyStatus) {
		return signUpDAO.updateVerifyJobSeeker(emailId, verifyStatus);
	}
	
	@Override
	public boolean updateVerifyCompany(String emailId, String verifyStatus) {
		return signUpDAO.updateVerifyCompany(emailId, verifyStatus);
	}


	@Override
	public boolean checkLoginCredentials(String emailId, String password, String userType) {
		boolean isValidUser = false;
		
		if("jobseeker".equalsIgnoreCase(userType)){
			
			isValidUser = signUpDAO.checkLoginCredentialsJobSeeker(emailId, password);
			
		}else if("company".equalsIgnoreCase(userType)){
			isValidUser = signUpDAO.checkLoginCredentialsCompany(emailId, password);
		}else{
			isValidUser = false;
		}
		
		return isValidUser;
		
	}

}
