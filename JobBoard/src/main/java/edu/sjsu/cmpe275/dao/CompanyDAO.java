package edu.sjsu.cmpe275.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.model.Company;


@Repository
public interface CompanyDAO {

	public List<Company> getAllCompanies();
	

	public Company findCompanyById(String companyId);

	public String getIdByEmailID(String emailId);
	public Company getCompanyByIdAndVerCode(String verificationCode, String companyId);
	
	public boolean updateCompanyDetails(Company company);
	public Company getCompanyByEmail(String email);

	
}
