package edu.sjsu.cmpe275.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name="Application")
public class Application {

	@Id 
	@Column(name="APPLICATION_ID")
	@GeneratedValue(generator="system-uuid") 
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String applicationId;
	
	@ManyToOne
	@JoinColumn(name = "JOB_SEEKER_ID")
	private JobSeeker jobSeekerId;
	
	@ManyToOne
	@JoinColumn(name = "JOB_POST_ID")
	private JobPost jobPostId;
	
	@Column(name = "STATUS")
	private String status;
	
	@Column(name = "OFFER")
	private String offer;
	
	@Column(name = "RESUME")
	private String resume;
	
	
	public Application(JobPost jobPost, JobSeeker jobSeeker, String resume, String status){
		this.jobPostId = jobPost;
		this.jobSeekerId = jobSeeker;
		this.resume = resume;
		this.status = status;
	}
	
	public Application(){
		
	}

	public String getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(String applicationId) {
		this.applicationId = applicationId;
	}

	public JobSeeker getJobSeekerId() {
		return jobSeekerId;
	}

	public void setJobSeekerId(JobSeeker jobSeekerId) {
		this.jobSeekerId = jobSeekerId;
	}

	public JobPost getJobPostId() {
		return jobPostId;
	}

	public void setJobPostId(JobPost jobPostId) {
		this.jobPostId = jobPostId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getOffer() {
		return offer;
	}

	public void setOffer(String offer) {
		this.offer = offer;
	}

	public String getResume() {
		return resume;
	}

	public void setResume(String resume) {
		this.resume = resume;
	}
	
	
	
}
