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
@Table(name="InterestedJobPost")
public class InterestedJobPost {

	@Id 
	@Column(name="INTERESTED_JOBPOST_ID")
	@GeneratedValue(generator="system-uuid") 
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String interestedJobPostId;
	
	@ManyToOne
	@JoinColumn(name = "JOB_SEEKER_ID")
	private JobSeeker jobSeeker;
	
	@ManyToOne
	@JoinColumn(name = "JOB_POST_ID")
	private JobPost jobPost;
	
	@Column(name = "STATUS")
	private boolean status;
	
	
	
	public InterestedJobPost(JobPost jobPost, JobSeeker jobSeeker,boolean status){
		this.jobPost = jobPost;
		this.jobSeeker = jobSeeker;
		this.status = status;
	}
	
	public InterestedJobPost(){
		
	}

	public String getInterestedJobPostId() {
		return interestedJobPostId;
	}

	public void setInterestedJobPostId(String interestedJobPostId) {
		this.interestedJobPostId = interestedJobPostId;
	}

	public JobSeeker getJobSeeker() {
		return jobSeeker;
	}

	public void setJobSeeker(JobSeeker jobSeeker) {
		this.jobSeeker = jobSeeker;
	}

	public JobPost getJobPost() {
		return jobPost;
	}

	public void setJobPost(JobPost jobPost) {
		this.jobPost = jobPost;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

		
}
