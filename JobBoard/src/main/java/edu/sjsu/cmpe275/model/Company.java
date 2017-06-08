package edu.sjsu.cmpe275.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name="Company")
public class Company {
	
	
	/*Company_id
	Email
	Name
	Website
	Logo image url
	Address_of_headquarter
	Description
Verification_code
Is_verified*/
	
	@Id 
	@Column(name="COMPANY_ID")
	@GeneratedValue(generator="system-uuid") 
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String companyId;
	
	@Column(name="EMAIL", nullable = false)
	private String email;
	
	@Column(name="NAME")
	private String name;
	
	@Column(name="WEBSITE")
	private String website;
	
	@Column(name="IMAGE_URL")
	private String imageURL;
	
	@Column(name="ADDRESS")
	private String address;
	
	@Column(name="DESCRIPTION")
	private String description;
	
	@Column(name="VERIFICATION_CODE")
	private String verificationCode;
	
	@Column(name="IS_VERIFIED")
	private String isVerified;
	
	@JsonIgnore
	@Column(name="PASSWORD")
	private String password;
	
	
	public Company(String email, String name, String website, String imageURL, String address, String description,
			String verificationCode, String isVerified, String password) {
		super();
		this.email = email;
		this.name = name;
		this.website = website;
		this.imageURL = imageURL;
		this.address = address;
		this.description = description;
		this.verificationCode = verificationCode;
		this.isVerified = isVerified;
		this.password = password;
	}
	
	
	
	public Company(String companyId, String email, String name, String website, String imageURL, String address,
			String description, String verificationCode, String isVerified, String password) {
		super();
		this.companyId = companyId;
		this.email = email;
		this.name = name;
		this.website = website;
		this.imageURL = imageURL;
		this.address = address;
		this.description = description;
		this.verificationCode = verificationCode;
		this.isVerified = isVerified;
		this.password = password;
	}



	public Company() {
		super();
	}



	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getWebsite() {
		return website;
	}
	public void setWebsite(String website) {
		this.website = website;
	}
	public String getImageURL() {
		return imageURL;
	}
	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getVerificationCode() {
		return verificationCode;
	}
	public void setVerificationCode(String verificationCode) {
		this.verificationCode = verificationCode;
	}
	public String getIsVerified() {
		return isVerified;
	}
	public void setIsVerified(String isVerified) {
		this.isVerified = isVerified;
	}
	
	
}
