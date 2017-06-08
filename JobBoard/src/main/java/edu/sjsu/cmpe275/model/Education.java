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
@Table(name="Education")
public class Education {

/*	School
	Degree
	field_of_study	
		gpa*/
	
	@Id 
	@Column(name="EDUCATION_ID")
	@GeneratedValue(generator="system-uuid") 
	@GenericGenerator(name="system-uuid", strategy = "uuid")
	private String educationId;
	
	@ManyToOne
	@JoinColumn(name = "JOB_SEEKER_ID")
	//@Column(name = "JOB_SEEKER_ID")
	private JobSeeker jobSeeker;
	
	
	@Column(name="SCHOOL")
	private String school;
	
	@Column(name="DEGREE")
	private String degree;
	
	@Column(name="FIELD_OF_STUDY")
	private String fieldOfStudy;
	
	@Column(name="GPA")
	private String gpa;
	
	
	
	public Education() {
		super();
	}
	public Education(JobSeeker jobSeeker, String school, String degree, String fieldOfStudy, String gpa) {
		this.jobSeeker = jobSeeker;
		this.school = school;
		this.degree = degree;
		this.fieldOfStudy = fieldOfStudy;
		this.gpa = gpa;
	}
	public String getSchool() {
		return school;
	}
	public void setSchool(String school) {
		this.school = school;
	}
	public String getDegree() {
		return degree;
	}
	public void setDegree(String degree) {
		this.degree = degree;
	}
	public String getFieldOfStudy() {
		return fieldOfStudy;
	}
	public void setFieldOfStudy(String fieldOfStudy) {
		this.fieldOfStudy = fieldOfStudy;
	}
	public String getGpa() {
		return gpa;
	}
	public void setGpa(String gpa) {
		this.gpa = gpa;
	}
	
	
	
	
}
