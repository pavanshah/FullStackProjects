package edu.sjsu.cmpe275.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="JobSeeker")
public class JobSeeker {
	
	/*job_seeker_id
	Email
	first_name
	last_name
	Picture
	Self_introduction
	Education_id
	Work_exp
	Skills
	Verification_code
	is_verified*/
	
	@Id 
	@Column(name="JOB_SEEKER_ID")
	@GeneratedValue(generator="system-uuid") 
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String jobSeekerId;
	
	@Column(name="FIRSTNAME", nullable = false)
	private String firstName;
	@Column(name="LASTNAME", nullable = false)
	private String lastName;
	@Column(name="EMAIL", unique = true, nullable = false)
	private String emailId;
	@Column(name="SELF_INTRODUCTION")
	private String selfIntroduction;
	@Column(name="PHONE", unique = true, nullable = false)
	private String phone; 
	@Column(name="SKILLS")
	private String skills;
	
	@OneToMany(mappedBy = "jobSeeker")
	private List<Education> education;

	@Column(name="WORKEXP")
	private String workExp;
	@Column(name="VERIFICATION_CODE")
	private String verificationCode;
	@Column(name="IS_VERIFIED")
	private String isVerified;
	@Column(name="PROFILE_IMAGE_PATH")
	private String profileImagePath;
	@JsonIgnore
	@Column(name="PASSWORD")
	private String password;
	
	
/*	@ManyToMany(cascade=CascadeType.ALL)
	@JoinTable(name = "Applications", joinColumns = { @JoinColumn(name = "JOB_SEEKER_ID") }, inverseJoinColumns = { @JoinColumn(name = "JOB_POST_ID")})
	private List<JobPost> jobPost;*/
	

	public JobSeeker(String firstName, String lastName, String emailId, String selfIntroduction, String phone,
			String skills, String workExp, String verificationCode, String isVerified, String password, String profileImagePath) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.selfIntroduction = selfIntroduction;
		this.phone = phone;
		this.skills = skills;
		this.workExp = workExp;
		this.verificationCode = verificationCode;
		this.isVerified = isVerified;
		this.password = password;
		this.profileImagePath = profileImagePath;
	}


	public JobSeeker(String jobSeekerId, String firstName, String lastName, String emailId, String selfIntroduction,
			String phone, String skills, ArrayList<Education> education, String workExp, String verificationCode,
			String isVerified, String profileImagePath, String password) {
		super();
		this.jobSeekerId = jobSeekerId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.selfIntroduction = selfIntroduction;
		this.phone = phone;
		this.skills = skills;
		//this.education = education;
		this.workExp = workExp;
		this.verificationCode = verificationCode;
		this.isVerified = isVerified;
		this.profileImagePath = profileImagePath;
		this.password = password;
	}


	public List<Education> getEducation() {
		return education;
	}


	public void setEducation(List<Education> education) {
		this.education = education;
	}
	
	public JobSeeker(){
		
	}
	
	public JobSeeker(String firstName, String lastName, String emailId, String selfIntroduction, String phone, String skills,
			String workExp) {
		super();
	//	this.jobSeekerId = jobSeekerId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.selfIntroduction = selfIntroduction;
		this.phone = phone;
		this.skills = skills;
		//this.education = education;
		this.workExp = workExp;
	//	this.verificationCode = verificationCode;
	//	this.isVerified = isVerified;
		//this.profileImagePath = profileImagePath;
		//this.password = password;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


/*	public List<JobPost> getJobPost() {
		return jobPost;
	}


	public void setJobPost(List<JobPost> jobPost) {
		this.jobPost = jobPost;
	}*/
	
	public String getJobSeekerId() {
		return jobSeekerId;
	}

	public void setJobSeekerId(String jobSeekerId) {
		this.jobSeekerId = jobSeekerId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getSelfIntroduction() {
		return selfIntroduction;
	}
	public void setSelfIntroduction(String selfIntroduction) {
		this.selfIntroduction = selfIntroduction;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getSkills() {
		return skills;
	}
	public void setSkills(String skills) {
		this.skills = skills;
	}
	/*public List<Education> getEducation() {
		return education;
	}
	public void setEducation(List<Education> education) {
		this.education = education;
	}*/
	public String getWorkExp() {
		return workExp;
	}
	public void setWorkExp(String workExp) {
		this.workExp = workExp;
	}
	public String getVerificationCode() {
		return verificationCode;
	}
	public void setVerificationCode(String verificationCode) {
		this.verificationCode = verificationCode;
	}
	public String isVerified() {
		return isVerified;
	}
	public void setVerified(String isVerified) {
		this.isVerified = isVerified;
	}
	public String getProfileImagePath() {
		return profileImagePath;
	}
	public void setProfileImagePath(String profileImagePath) {
		this.profileImagePath = profileImagePath;
	}
	
	
}
