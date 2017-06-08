package edu.sjsu.cmpe275.model;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(JobPost.class)
public class JobPost_ {
		
	public static volatile SingularAttribute<JobPost, String> jobPostId;
	   	public static volatile SingularAttribute<JobPost, Company> company;
		public static volatile SingularAttribute<JobPost, String> title;
	    public static volatile SingularAttribute<JobPost, String> description;
	    public static volatile SingularAttribute<JobPost, String> responsibilities;
		public static volatile SingularAttribute<JobPost, String> officeLocation;
	    public static volatile SingularAttribute<JobPost, String> salary;
	    public static volatile SingularAttribute<JobPost, String> status;
	   
	    
}
