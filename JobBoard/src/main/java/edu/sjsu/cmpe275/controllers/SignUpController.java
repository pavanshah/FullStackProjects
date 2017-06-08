package edu.sjsu.cmpe275.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.sjsu.cmpe275.Util;
import edu.sjsu.cmpe275.aspects.Secured;
import edu.sjsu.cmpe275.model.Company;
import edu.sjsu.cmpe275.model.Education;
import edu.sjsu.cmpe275.model.JobSeeker;
import edu.sjsu.cmpe275.services.CompanyService;
import edu.sjsu.cmpe275.services.EducationService;
import edu.sjsu.cmpe275.services.JobSeekerService;
import edu.sjsu.cmpe275.services.SignUpService;

@CrossOrigin(origins = "*")
@RestController
public class SignUpController {
	
	@Autowired
	SignUpService signUpService;
	
	@Autowired
	EducationService educationService;
	
	@Autowired
	JobSeekerService jobSeekerService;
	
	@Autowired
	CompanyService companyService;
	
	
	//========================================================
	// Login for both jobseeker and company
	//========================================================
	
	@RequestMapping(value="/login",method = RequestMethod.POST)
	public ResponseEntity<?> login(HttpServletRequest request, HttpServletResponse response) throws JSONException{
		
		JSONObject returnData = new JSONObject();
		
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		String emailId = jsonObject.getString("email");
		String password = jsonObject.getString("password");
		String usertype = jsonObject.getString("usertype"); // should be "jobseeker" or "company"
		
		boolean isValidUser = signUpService.checkLoginCredentials(emailId, password, usertype);
		
		if(isValidUser){
			HttpSession session=request.getSession(); 
			session.setAttribute("email",emailId);   
			session.setAttribute("usertype",usertype); 
			
			returnData.put("isValidUser", isValidUser);
			return new ResponseEntity(returnData.toString(),HttpStatus.OK);
		}else{
			returnData.put("isValidUser", isValidUser);
			return new ResponseEntity(returnData.toString(),HttpStatus.NOT_FOUND);
		}
		
	}
	
	//========================================================
	// Logout
	//========================================================
	@RequestMapping(value="/logout",method = RequestMethod.GET)
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) throws JSONException{
		
		HttpSession session=request.getSession(false);  
		
		if(session != null){
			session.invalidate();
			
		}
		JSONObject returnJsonObject = new JSONObject();
		returnJsonObject.put("Response", "Logged out successfully.");
		return new ResponseEntity(returnJsonObject.toString(),HttpStatus.OK);
	}
	
	
	//========================================================
	// get user's email id - for testing purpose of session
	//========================================================
	@RequestMapping(value="/giveUserName",method = RequestMethod.GET)
	public ResponseEntity<?> giveUserName(HttpServletRequest request, HttpServletResponse response) throws JSONException{
		
		JSONObject returnData = new JSONObject();
		String email = "";
		HttpSession session=request.getSession(false);  
		
		if(session != null){
			email = (String)session.getAttribute("email");
		}
		
		returnData.put("user", email);
		return new ResponseEntity(returnData.toString(),HttpStatus.OK);
		
	}
	
	//========================================================
		// Update job seeker
		//========================================================
		
		@RequestMapping(value="/updateJobSeeker",method = RequestMethod.POST)
		public ResponseEntity<?> updateJobSeeker(HttpServletRequest request, HttpServletResponse response) throws JSONException{
		
			JSONObject jsonObject = new JSONObject(Util.getDataString(request));
			
			String emailId = jsonObject.getString("email");
			String password = jsonObject.getString("password");
			String firstName = jsonObject.getString("firstName");
			String lastName = jsonObject.getString("lastName");
			String selfIntroduction = jsonObject.getString("selfIntroduction");
			String phone = jsonObject.getString("phone");
			String skills = jsonObject.getString("skills");
			String workExp = jsonObject.getString("workExp");
			String profileImagePath = jsonObject.getString("profileImagePath");
			
			JobSeeker jobseeker = jobSeekerService.getJobSeekerProfile(emailId);
			
			jobseeker.setPassword(password);
			jobseeker.setFirstName(firstName);
			jobseeker.setLastName(lastName);
			jobseeker.setSelfIntroduction(selfIntroduction);
			jobseeker.setPhone(phone);
			jobseeker.setSkills(skills);
			jobseeker.setWorkExp(workExp);
			jobseeker.setProfileImagePath(profileImagePath);
			
			JSONArray jsonArrayEducation = jsonObject.getJSONArray("education");
			List<Education> educationList = new ArrayList<Education>();
			
			for(int i=0 ; i< jsonArrayEducation.length(); i++){
				JSONObject educationJsonObject = jsonArrayEducation.getJSONObject(i);
				Education education = new Education( jobseeker, educationJsonObject.getString("school"), educationJsonObject.getString("degree") , educationJsonObject.getString("fieldOfStudy") , educationJsonObject.getString("gpa"));
				educationList.add(education);
			}
			
			jobseeker.setEducation(educationList);
			
			if(jobSeekerService.updateJobSeekerProfile(jobseeker) != null){
				JSONObject returnJsonObject = new JSONObject();
				returnJsonObject.put("Response", "User updated successfully.");
				return new ResponseEntity(returnJsonObject.toString(),HttpStatus.OK);
			}else{
				JSONObject returnJsonObject = new JSONObject();
				returnJsonObject.put("Response", "Something went wrong please try again.");
				return new ResponseEntity(returnJsonObject.toString(),HttpStatus.BAD_REQUEST);
			}
			
		}
	
	//========================================================
	// Sign up and verification for job seeker
	//========================================================
	@CrossOrigin(origins = "*")
	@RequestMapping(value="/signUpJobSeeker",method = RequestMethod.POST)
	public ResponseEntity<?> signUpJobSeeker(HttpServletRequest request, HttpServletResponse response) throws JSONException{
	
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		String emailId = jsonObject.getString("email");
		String firstName = jsonObject.getString("firstName");
		String lastName = jsonObject.getString("lastName");
		String selfIntroduction = jsonObject.getString("selfIntroduction");
		String phone = jsonObject.getString("phone");
		String skills = jsonObject.getString("skills");
		
		String workExp = jsonObject.getString("workExp");
		String password = jsonObject.getString("password");
		Random random = new Random();
		
		String verificationCode = (new Integer(100000000 + random.nextInt(900000000))).toString();
		String isVerified = "false";
		
		String profileImagePath = jsonObject.getString("profileImagePath");
		
		JobSeeker jobseeker = new JobSeeker(firstName, lastName, emailId, selfIntroduction, phone,
				skills, workExp, verificationCode, isVerified, password, profileImagePath);
		
		boolean isSignUpSuccessful = signUpService.signUpJobSeeker(jobseeker);
		
		if(!isSignUpSuccessful){
			
			return new ResponseEntity(new JSONObject().toString(),HttpStatus.BAD_REQUEST);
			
		}else{
			/*ObjectMapper mapper = new ObjectMapper();
			String Json =  mapper.writeValueAsString(object);*/
			

			JSONArray jsonArrayEducation = jsonObject.getJSONArray("education");
			List<Education> educationList = new ArrayList<Education>();
			
			for(int i=0 ; i< jsonArrayEducation.length(); i++){
				JSONObject educationJsonObject = jsonArrayEducation.getJSONObject(i);
				Education education = new Education( jobseeker, educationJsonObject.getString("school"), educationJsonObject.getString("degree") , educationJsonObject.getString("fieldOfStudy") , educationJsonObject.getString("gpa"));
				educationList.add(education);
			}
			
			educationService.saveEducation(educationList);
			
			String id = jobSeekerService.getIdByEmailID(emailId);
			
			String textToSend = "Dear user please follow the below given: \n" + Util.BASE_URL;
			textToSend = textToSend + "verifyJobSeeker/" + verificationCode ;
			textToSend = textToSend + "/" + id;
			
			Util.sendEmail(textToSend, emailId);
			
			JSONObject returnData = new JSONObject();
			returnData.put("verificationCode", verificationCode);
			
			return new ResponseEntity(returnData.toString(),HttpStatus.OK);
		}
		
		
	}
	
	@RequestMapping(value="/verifyJobSeeker/{verificationCode}/{jobSeekerId}",method = RequestMethod.GET)
	public ResponseEntity<?> verifyJobSeeker(@PathVariable(value="verificationCode") String verificationCode, @PathVariable(value="jobSeekerId") String jobSeekerId,HttpServletRequest request, HttpServletResponse response) throws JSONException{
		
		JobSeeker jobSeeker = jobSeekerService.getJobSeekerByIdAndVerCode(verificationCode, jobSeekerId);
		
		if(jobSeeker == null){
			return new ResponseEntity(new JSONObject().toString(),HttpStatus.BAD_REQUEST);
		}
		
		boolean isVerifySuccessful = signUpService.updateVerifyJobSeeker(jobSeeker.getEmailId(), "true");
		JSONObject returnData = new JSONObject();
		returnData.put("isVerifySuccessful", isVerifySuccessful);
		
		if(isVerifySuccessful){
			String textToSend = "Dear user, your account has been confirmed.";
			Util.sendEmail(textToSend, jobSeeker.getEmailId());
			return new ResponseEntity("Your email has been confirmed",HttpStatus.OK);
			
		}else{
			return new ResponseEntity(returnData.toString(),HttpStatus.BAD_REQUEST);
		}
	}
	
	
	//========================================================
	// Sign up and verification for company
	//========================================================
	
	@RequestMapping(value="/signUpCompany",method = RequestMethod.POST)
	public ResponseEntity<?> signUpCompany(HttpServletRequest request, HttpServletResponse response) throws JSONException{
	
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		String email = jsonObject.getString("email");
		String name = jsonObject.getString("name");
		String website = jsonObject.getString("website");
		String imageURL = jsonObject.getString("imageURL");
		String address = jsonObject.getString("address");
		String description = jsonObject.getString("description");
		String password = jsonObject.getString("password");
		
		Random random = new Random();
		
		String verificationCode = (new Integer(100000000 + random.nextInt(900000000))).toString();
		String isVerified = "false";
		
		//String profileImagePath = request.getParameter("profileImagePath");
		
		Company company = new Company(email, name, website, imageURL, address, description,
			 verificationCode, isVerified, password);
		
		boolean isSignUpSuccessful = signUpService.signUpCompany(company);
		
		if(!isSignUpSuccessful){
			
			return new ResponseEntity(new JSONObject().toString(),HttpStatus.BAD_REQUEST);
			
		}else{
			/*ObjectMapper mapper = new ObjectMapper();
			String Json =  mapper.writeValueAsString(object);*/
			
			String id = companyService.getIdByEmailID(email);
			
			String textToSend = "Dear user please follow the below given: \n" + Util.BASE_URL;
			textToSend = textToSend + "verifyCompany/" + verificationCode ;
			textToSend = textToSend + "/" + id;
			
			Util.sendEmail(textToSend, email);
			
			JSONObject returnData = new JSONObject();
			returnData.put("verificationCode", verificationCode);
			
			return new ResponseEntity(returnData.toString(),HttpStatus.OK);
		}
		
		
	}
	
	@RequestMapping(value="/verifyCompany/{verificationCode}/{companyId}",method = RequestMethod.GET)
	public ResponseEntity<?> verifyCompany(@PathVariable(value="verificationCode") String verificationCode, @PathVariable(value="companyId") String companyId,HttpServletRequest request, HttpServletResponse response) throws JSONException{
		
		Company company = companyService.getCompanyByIdAndVerCode(verificationCode, companyId);
		
		if(company == null){
			return new ResponseEntity(new JSONObject().toString(),HttpStatus.BAD_REQUEST);
		}
		
		boolean isVerifySuccessful = signUpService.updateVerifyCompany(company.getEmail(), "true");
		JSONObject returnData = new JSONObject();
		returnData.put("isVerifySuccessful", isVerifySuccessful);
		
		if(isVerifySuccessful){
			String textToSend = "Dear user, your account has been confirmed.";
			Util.sendEmail(textToSend, company.getEmail());
			return new ResponseEntity("Your email has been confirmed",HttpStatus.OK);
			
		}else{
			return new ResponseEntity(returnData.toString(),HttpStatus.BAD_REQUEST);
		}
	}
	//========================================================
	
}
