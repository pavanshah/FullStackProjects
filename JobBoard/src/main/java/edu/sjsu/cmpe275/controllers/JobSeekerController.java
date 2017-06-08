package edu.sjsu.cmpe275.controllers;

import java.net.URI;
import java.util.List;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;
import com.google.gson.JsonParser;

import edu.sjsu.cmpe275.Util;
import edu.sjsu.cmpe275.aspects.Secured;
import edu.sjsu.cmpe275.model.Application;
import edu.sjsu.cmpe275.model.InterestedJobPost;
import edu.sjsu.cmpe275.model.JobPost;
import edu.sjsu.cmpe275.model.JobSeeker;
import edu.sjsu.cmpe275.services.CompanyService;
import edu.sjsu.cmpe275.services.EducationService;
import edu.sjsu.cmpe275.services.JobPostService;
import edu.sjsu.cmpe275.services.JobSeekerService;

@CrossOrigin(origins = "*")
@RestController
public class JobSeekerController {
	
	@Autowired
	JobSeekerService jobSeekerService;
	
	@Autowired
	CompanyService companyService;
	
	@Autowired
	JobPostService jobPostService;
	
	@Autowired
	EducationService educationService;
	
	@RequestMapping(value="/getJobSeekerDetails",method = RequestMethod.GET)
	@Secured
	public ResponseEntity<?> getJobSeekerDetails(HttpServletRequest request, HttpServletResponse response) throws JSONException{
		JSONObject returnData = new JSONObject();
		String email = "";
		HttpSession session=request.getSession(false);  
		
		if(session != null){
			email = (String)session.getAttribute("email");
		}
		JobSeeker jobseeker = jobSeekerService.getJobSeekerProfile(email);
		
		jobseeker.setEducation(educationService.getEducationByJobSeeker(jobseeker));
		
		returnData.put("Response", new JSONObject(jobseeker));
		return new ResponseEntity(returnData.toString(),HttpStatus.OK);
	}
	
	@RequestMapping(value="/updateJobSeekerProfile",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> updateJobSeekerProfile(HttpServletRequest request, HttpServletResponse response) throws JSONException{
		URI location;
		
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		String emailId = jsonObject.getString("email");
		String firstName = jsonObject.getString("firstName");
		String lastName = jsonObject.getString("lastName");
		String selfIntroduction = jsonObject.getString("selfIntroduction");
		String phone = jsonObject.getString("phone");
		String skills = jsonObject.getString("skills");
		
		String workExp = jsonObject.getString("workExp");
		
		System.out.println(emailId);
		JobSeeker jobseeker = jobSeekerService.getJobSeekerProfile(emailId);
		System.out.println(jobseeker.getFirstName());
		jobseeker.setFirstName(firstName);
		jobseeker.setLastName(lastName);
		jobseeker.setPhone(phone);
		jobseeker.setSelfIntroduction(selfIntroduction);
		jobseeker.setSkills(skills);
		
		JobSeeker updatedSeeker = 
				jobSeekerService.updateJobSeekerProfile(jobseeker);
		System.out.println(updatedSeeker.getEmailId());
		JSONObject returnData = new JSONObject();
		
		returnData.put("email", updatedSeeker.getEmailId());
		returnData.put("firstName", updatedSeeker.getFirstName());
		returnData.put("lastName", updatedSeeker.getLastName());
		returnData.put("selfIntroduction", updatedSeeker.getSelfIntroduction());
		returnData.put("phone", updatedSeeker.getPhone());
		returnData.put("skills", updatedSeeker.getSkills());
		returnData.put("workExp", updatedSeeker.getWorkExp());
		return new ResponseEntity(returnData.toString(),HttpStatus.OK);

	}
	
	
	@RequestMapping(value="/fetchJobPostApplications",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> fetchJobPostApplications(HttpServletRequest request, HttpServletResponse response) throws JSONException{
	
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		HttpSession session=request.getSession(false);
		String jobPostId = jsonObject.getString("jobPostId");
		
		JobPost jobPost = companyService.getJobDetails(jobPostId);
		
		List<Application> applicationList = jobPostService.getJobPostApplications(jobPost);
		
		JSONArray resultArray = new JSONArray();
		resultArray.put(applicationList);
		
		JSONObject returnObj = new JSONObject();
		returnObj.put("result", applicationList);
		System.out.println("applicationList" + applicationList);
		return new ResponseEntity(returnObj.toString(),HttpStatus.OK);
		
	}
	
	
	@RequestMapping(value="/fetchJobSeekerApplications",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> fetchJobSeekerApplications(HttpServletRequest request, HttpServletResponse response) throws JSONException{
	
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		HttpSession session=request.getSession(false);
		String jobSeekerEmailId;
		if(session!=null)
		{
			jobSeekerEmailId = (String)session.getAttribute("email");
		}
		else
		{
			JSONObject returnObj = new JSONObject();
			returnObj.put("result", "Log in first!");
			return new ResponseEntity(returnObj.toString(),HttpStatus.BAD_REQUEST);
		}
		JobSeeker jobSeeker = jobSeekerService.getJobSeekerProfile(jobSeekerEmailId);
		//JobPost jobPost = companyService.getJobDetails(jobPostId);
		
		List<Application> applicationList = jobSeekerService.getJobSeekerApplications(jobSeeker);
		
		JSONArray resultArray = new JSONArray(applicationList);
		
		JSONObject returnObj = new JSONObject();
		returnObj.put("result", resultArray);
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create(); 
		JsonParser jp = new JsonParser();
		JsonElement je = jp.parse(returnObj.toString());
		String prettyJsonString = gson.toJson(je);
		
		return new ResponseEntity(prettyJsonString,HttpStatus.OK);
		
	}
	
	
	
	@RequestMapping(value="/applyToJobPost",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> applyToJobPost(HttpServletRequest request, HttpServletResponse response) throws JSONException{
		
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		String jobPostId = jsonObject.getString("jobPostId");
		HttpSession session=request.getSession(false);
		String jobSeekerEmailId;
		if(session!=null)
		{
			jobSeekerEmailId = (String)session.getAttribute("email");
		}
		else
		{
			JSONObject returnObj = new JSONObject();
			returnObj.put("result", "Log in first!");
			return new ResponseEntity(returnObj.toString(),HttpStatus.BAD_REQUEST);
		}
		
		//String jobSeekerEmailId = (String)session.getAttribute("email");
		//String jobSeekerEmailId = "xyz2@zbc.com";
		System.out.println("session email::::::"+jobSeekerEmailId);
		String resumeOrProfile = jsonObject.getString("applyWithResumeOrProfile");
		String resume;
		if(resumeOrProfile.equals("Resume"))
			resume = jsonObject.getString("resume");
		else
			resume = null;		
		
		JobSeeker jobSeeker = jobSeekerService.getJobSeekerProfile(jobSeekerEmailId);
		JobPost jobPost = companyService.getJobDetails(jobPostId);
		
		List<Application> applicationList = jobSeekerService.getJobSeekerApplications(jobSeeker);
		
		
		int pendingCounter=0;
		int flag=0;
		for(int i=0; i<applicationList.size();i++)
		{
			if(applicationList.get(i).getStatus().equals("PENDING"))
				pendingCounter++;
			if(applicationList.get(i).getJobPostId().getJobPostId().equals(jobPost.getJobPostId()) && (applicationList.get(i).getStatus().equalsIgnoreCase("Pending") || applicationList.get(i).getStatus().equalsIgnoreCase("Offered")))
				flag=1;
		}
		
		if(flag==1)
		{
			JSONObject returnObj = new JSONObject();
			returnObj.put("result", "You already applied for this Job Post!");
			return new ResponseEntity(returnObj.toString(),HttpStatus.BAD_REQUEST);
		}
		
		if(pendingCounter>=5)
		{
			JSONObject returnObj = new JSONObject();
			returnObj.put("result", "You cannot apply in more then 5 JobPosts in a Pending State");
			return new ResponseEntity(returnObj.toString(),HttpStatus.BAD_REQUEST);
		}
		
		
		Application newApplication = new Application(jobPost, jobSeeker, resume, "PENDING");
		
		if(jobSeekerService.applyToJobPost(newApplication))
		{
			String textToSend = "You successfully applied for position "+jobPost.getTitle()+"\n Good luck!";
			String emailId = jobSeeker.getEmailId();
			Util.sendEmail(textToSend, emailId);
			
			JSONObject returnObj = new JSONObject();
			returnObj.put("result", "Application Submitted!");
			return new ResponseEntity(returnObj.toString(),HttpStatus.OK);
		}
		else
		{
			JSONObject returnObj = new JSONObject();
			returnObj.put("result", "Error in Applying for the desired Job Post!");
			return new ResponseEntity(returnObj.toString(),HttpStatus.BAD_REQUEST);
		}
		
		
	}
	
	@RequestMapping(value="/markAsInterested",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> markAsInterested(HttpServletRequest request, HttpServletResponse response) throws JSONException{
		
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		String jobPostId = jsonObject.getString("jobPostId");
		HttpSession session=request.getSession(false);
		String jobSeekerEmailId;
		if(session!=null)
		{
			jobSeekerEmailId = (String)session.getAttribute("email");
		}
		else
		{
			JSONObject returnObj = new JSONObject();
			returnObj.put("result", "Log in first!");
			return new ResponseEntity(returnObj.toString(),HttpStatus.BAD_REQUEST);
		}
		
		//String jobSeekerEmailId = (String)session.getAttribute("email");
		//jobSeekerEmailId = "parvezsaeedpatel@gmail.com";
		System.out.println("session email::::::"+jobSeekerEmailId);
		
		JobSeeker jobSeeker = jobSeekerService.getJobSeekerProfile(jobSeekerEmailId);
		JobPost jobPost = companyService.getJobDetails(jobPostId);
		
		List<InterestedJobPost> interestedList = jobSeekerService.getJobSeekerInterestedList(jobSeeker);
		boolean exists = false;
		InterestedJobPost interestedJobPost = null;
		if(interestedList!=null && !interestedList.isEmpty()){
			//check if it is in the interested list, if yes check if status.true;
			for (InterestedJobPost tempInterestedJobPost : interestedList) {
				if(tempInterestedJobPost.getJobPost().getJobPostId().equals(jobPost.getJobPostId())){
					exists = true;
					interestedJobPost = tempInterestedJobPost;
					break;
				}
			}
		}
		if(!exists){
			interestedJobPost = new InterestedJobPost(jobPost, jobSeeker, true);
		}
		//toggle the interested status
		interestedJobPost.setStatus(!interestedJobPost.getStatus());
		
		if(jobSeekerService.markAsInterested(interestedJobPost))
		{
			
			/*String textToSend = "You have marked job post "+jobPost.getTitle()+"as interested. \n Good luck!";
			String emailId = jobSeeker.getEmailId();
			Util.sendEmail(textToSend, emailId);*/
			
			JSONObject returnObj = new JSONObject();
			returnObj.put("result", "Marked as interested");
			returnObj.put("isInterested", interestedJobPost.getStatus());
			return new ResponseEntity(returnObj.toString(),HttpStatus.OK);
		}
		else
		{
			JSONObject returnObj = new JSONObject();
			returnObj.put("result", "Error in marking the desired Job Post as interested!");
			return new ResponseEntity(returnObj.toString(),HttpStatus.BAD_REQUEST);
		}
		
		
	}

	@RequestMapping(value="/fetchJobSeekerInterestedList",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> fetchJobSeekerInterestedList(HttpServletRequest request, HttpServletResponse response) throws JSONException{
		
		
		HttpSession session=request.getSession(false);
		String jobSeekerEmailId;
		if(session!=null)
		{
			jobSeekerEmailId = (String)session.getAttribute("email");
		}
		else
		{
			JSONObject returnObj = new JSONObject();
			returnObj.put("result", "Log in first!");
			return new ResponseEntity(returnObj.toString(),HttpStatus.BAD_REQUEST);
		}
		//jobSeekerEmailId = "parvezsaeedpatel@gmail.com";
		JobSeeker jobSeeker = jobSeekerService.getJobSeekerProfile(jobSeekerEmailId);
		//JobPost jobPost = companyService.getJobDetails("4028e3815c181fef015c183bcfc90000");
		
		List<InterestedJobPost> interestedList = jobSeekerService.getJobSeekerInterestedList(jobSeeker);
		//System.out.println(interestedList.contains(jobPost));
		JSONArray resultArray = new JSONArray(interestedList);
		
		JSONObject returnObj = new JSONObject();
		returnObj.put("result", resultArray);
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create(); 
		JsonParser jp = new JsonParser();
		JsonElement je = jp.parse(returnObj.toString());
		String prettyJsonString = gson.toJson(je);
		
		return new ResponseEntity(prettyJsonString,HttpStatus.OK);
		
		
	}
	
	
}
