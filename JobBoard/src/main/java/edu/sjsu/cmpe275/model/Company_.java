package edu.sjsu.cmpe275.model;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(Company.class)
public class Company_ {
		
	public static volatile SingularAttribute<Company, String> companyId;
	   	public static volatile SingularAttribute<Company, String> email;
		public static volatile SingularAttribute<Company, String> name;
	    public static volatile SingularAttribute<Company, String> website;
	    public static volatile SingularAttribute<Company, String> imageURL;
		public static volatile SingularAttribute<Company, String> address;
	    public static volatile SingularAttribute<Company, String> description;
	    public static volatile SingularAttribute<Company, String> verificationCode;
	    public static volatile SingularAttribute<Company, String> isVerified;
	    public static volatile SingularAttribute<Company, String> password;
}
