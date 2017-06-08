package edu.sjsu.cmpe275.controllers;

import java.util.ArrayList;
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

import edu.sjsu.cmpe275.Util;
import edu.sjsu.cmpe275.aspects.Secured;
import edu.sjsu.cmpe275.model.Application;
import edu.sjsu.cmpe275.model.Company;
import edu.sjsu.cmpe275.model.JobPost;
import edu.sjsu.cmpe275.services.CompanyService;
import edu.sjsu.cmpe275.services.JobPostService;

@CrossOrigin(origins = "*")
@RestController
public class CompanyController {
	
	@Autowired
	CompanyService companyService;
	
	@Autowired
	JobPostService jobPostService;
	
	
	@RequestMapping(value="/updateCompanyDetails",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> updateCompanyDetails(HttpServletRequest request, HttpServletResponse response) throws JSONException
	{
		
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		String email = jsonObject.getString("email");
		String name = jsonObject.getString("name");
		String website = jsonObject.getString("website");
		String imageURL = jsonObject.getString("imageURL");
		String address = jsonObject.getString("address");
		String description = jsonObject.getString("description");
		String password = jsonObject.getString("password");
		Company company = companyService.getCompanyByEmail(email);
		
		if(company != null){
			
			company.setAddress(address);
			company.setDescription(description);
			company.setEmail(email);
			company.setImageURL(imageURL);
			company.setName(name);
			company.setPassword(password);
			company.setWebsite(website);
				
			Boolean successFlag = companyService.updateCompanyDetails(company);
				
			if(successFlag)
			{
				JSONObject returnJsonObject = new JSONObject();
				returnJsonObject.put("Response", "Updated successfully");
				return new ResponseEntity(returnJsonObject.toString(),HttpStatus.OK);
			
			}
			else
			{
				JSONObject returnJsonObject = new JSONObject();
				returnJsonObject.put("Response", "Bad request");
				return new ResponseEntity(returnJsonObject.toString(),HttpStatus.BAD_REQUEST);
			}
		
		}
		else
		{
			JSONObject returnJsonObject = new JSONObject();
			returnJsonObject.put("Response", "Not found");
			return new ResponseEntity(returnJsonObject.toString(),HttpStatus.NOT_FOUND);
		}
		
	}
	
	
	@RequestMapping(value="/findAllCompanies",method = RequestMethod.GET)
	@Secured
	public ResponseEntity<?> findAllCompanies() throws JSONException
	{
		
		
		List<Company> companies = companyService.getAllCompanies();
		
		if(companies!=null && companies.size() != 0)
		{
			JSONObject jsonObject = new JSONObject();
			JSONArray jsonArray = new JSONArray(companies);
			jsonObject.put("Response", jsonArray);
			return new ResponseEntity(jsonObject.toString(),HttpStatus.OK);
		}
		
		else
		{
			JSONObject returnJsonObject = new JSONObject();
			returnJsonObject.put("Response", "Not found");
			return new ResponseEntity(returnJsonObject.toString(),HttpStatus.NOT_FOUND);
		}
	}
	
	
	@RequestMapping(value="/findCompanyById",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> findCompanyById(HttpServletRequest request, HttpServletResponse response) throws JSONException
	{
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		String companyId = jsonObject.getString("companyId");
		
		Company company = companyService.findCompanyById(companyId);
		
		if(company !=null)
		{
			JSONObject result = new JSONObject();
			JSONObject jsonObject1 = new JSONObject();
			
			jsonObject1.put("Name", company.getName());
			jsonObject1.put("Address", company.getAddress());
			jsonObject1.put("CompanyId", company.getCompanyId());
			jsonObject1.put("Email", company.getEmail());
			jsonObject1.put("Website", company.getWebsite());
			jsonObject1.put("Description", company.getDescription());
			jsonObject1.put("ImageURL", company.getImageURL());
			
			result.put("Response", jsonObject1);
			return new ResponseEntity(result.toString(),HttpStatus.OK);
		}
		
		else
		{
			JSONObject returnJsonObject = new JSONObject();
			returnJsonObject.put("Response", "Not found");
			return new ResponseEntity(returnJsonObject.toString(),HttpStatus.NOT_FOUND);
		}	
		
	}
	
	@RequestMapping(value="/addJobByCompany",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> addJobByCompany(HttpServletRequest request, HttpServletResponse response) throws JSONException
	{
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		HttpSession session=request.getSession(false); 
		String email = (String)session.getAttribute("email");
		Company company = companyService.getCompanyByEmail(email);
		
		//String companyId = jsonObject.getString("companyId");
		String title = jsonObject.getString("title");
		String description = jsonObject.getString("description");
		String office_location = jsonObject.getString("office_location");
		String responsibilities = jsonObject.getString("responsibilities");
		String salary = jsonObject.getString("salary");
		String status = "Open";
		
		JobPost jobPost = new JobPost(company, title, description, responsibilities, office_location, salary,status);
		
		boolean isJobAddingSuccessful = companyService.addNewJob(jobPost);
		
		
		if(!isJobAddingSuccessful){
			
			JSONObject returnJsonObject = new JSONObject();
			returnJsonObject.put("Response", "Something went wrong.");
			return new ResponseEntity(returnJsonObject.toString(),HttpStatus.BAD_REQUEST);
			
		}
		else
		{
			JSONObject returnJsonObject = new JSONObject();
			returnJsonObject.put("Response", "Job added.");
			return new ResponseEntity(returnJsonObject.toString(),HttpStatus.OK);
		}
		
	}
	
	@RequestMapping(value="/retrieveJobById",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> retrieveJobById(HttpServletRequest request, HttpServletResponse response) throws JSONException
	{
		
		JSONObject jsonObject1 = new JSONObject(Util.getDataString(request));
		
		String jobid = jsonObject1.getString("jobid");
		
		JobPost jobPost = companyService.getJobDetails(jobid);
		
		
		if(jobPost !=null)
		{
			JSONObject result = new JSONObject();
			JSONObject jsonObject = new JSONObject();
			
			jsonObject.put("job_post_id", jobPost.getJobPostId());
			
			jsonObject.put("company", new JSONObject(jobPost.getCompany()));
			jsonObject.put("description", jobPost.getDescription());
			jsonObject.put("office_location", jobPost.getOfficeLocation());
			jsonObject.put("responsibilities", jobPost.getResponsibilities());
			jsonObject.put("salary", jobPost.getSalary());
			jsonObject.put("title", jobPost.getTitle());
			
			result.put("Response", jsonObject);
			return new ResponseEntity(result.toString(),HttpStatus.OK);
		}
		
		else
		{
			JSONObject returnJsonObject = new JSONObject();
			returnJsonObject.put("Response", "Something went wrong.");
			return new ResponseEntity(returnJsonObject.toString(),HttpStatus.BAD_REQUEST);
		}	
	}
	
	
	@RequestMapping(value="/getCompanyDetails",method = RequestMethod.GET)
	@Secured
	public ResponseEntity<?> getCompanyDetails(HttpServletRequest request, HttpServletResponse response) throws JSONException
	{
		HttpSession session=request.getSession(false); 
		String email = (String)session.getAttribute("email");
		Company company = companyService.getCompanyByEmail(email);
		JSONObject returnData = new JSONObject();
		returnData.put("Response", new JSONObject(company));
		return new ResponseEntity(returnData.toString(),HttpStatus.OK);
	}
	
	
	//changed here
	@RequestMapping(value="/updateJobByCompany",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> updateJobByCompany(HttpServletRequest request, HttpServletResponse response) throws JSONException
	{
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		HttpSession session=request.getSession(false); 
		String email = (String)session.getAttribute("email");
		Company company = companyService.getCompanyByEmail(email);
		
		String jobId = jsonObject.getString("jobId");
		String title = jsonObject.getString("title");
		String description = jsonObject.getString("description");
		String office_location = jsonObject.getString("office_location");
		String responsibilities = jsonObject.getString("responsibilities");
		String salary = jsonObject.getString("salary");
		String status = jsonObject.getString("status");
		
		JobPost jobPost = companyService.getJobDetails(jobId);
		
		if(jobPost != null){
			
			jobPost.setCompany(company);
			jobPost.setDescription(description);
			jobPost.setOfficeLocation(office_location);
			jobPost.setResponsibilities(responsibilities);
			jobPost.setSalary(salary);
			jobPost.setTitle(title);
			if(status != null && !"".equalsIgnoreCase(status))
				jobPost.setStatus(status);
			
			Boolean successFlag = companyService.updateJobDetails(jobPost);
			
			if(successFlag)
			{
				
				//need to notify all the applicants
				List<Application> applicationList = jobPostService.getJobPostApplications(jobPost);
				
				List<String> emails = new ArrayList<>();
				
				for(int i = 0 ; i< applicationList.size() ; i++)
				{
					emails.add(applicationList.get(i).getJobSeekerId().getEmailId());
				}
				
				if(!emails.isEmpty()){
					String[] emailArray = emails.toArray(new String[0]);
					String textToSend = "Job description changed";
					String subject = "Job description changed";
					Util.sendBulkEmail(textToSend, emailArray, subject);
				}
			
				JSONObject returnJsonObject = new JSONObject();
				returnJsonObject.put("Response", "Updated successfully.");
				return new ResponseEntity(returnJsonObject.toString(),HttpStatus.OK);
			}
			else
			{
				JSONObject returnJsonObject = new JSONObject();
				returnJsonObject.put("Response", "Something went wrong.");
				return new ResponseEntity(returnJsonObject.toString(),HttpStatus.BAD_REQUEST);
			}
		}
		else
		{
			JSONObject returnJsonObject = new JSONObject();
			returnJsonObject.put("Response", "Not found.");
			return new ResponseEntity(returnJsonObject.toString(),HttpStatus.NOT_FOUND);
		}
		
	}
	
	@RequestMapping(value="/findJobsByCompany",method = RequestMethod.GET)
	@Secured
	public ResponseEntity<?> findAllJobsOfCompany(HttpServletRequest request, HttpServletResponse response) throws JSONException
	{
		HttpSession session=request.getSession(false); 
		String email = (String)session.getAttribute("email");
		Company company = companyService.getCompanyByEmail(email);
		
		List<JobPost> jobPosts = companyService.getJobsByCompany(company.getCompanyId());
		
		if(jobPosts.size() != 0)
		{
			JSONObject jsonObject1 = new JSONObject();
			JSONArray jsonArray = new JSONArray(jobPosts);
			jsonObject1.put("Response", jsonArray);
			return new ResponseEntity(jsonObject1.toString(),HttpStatus.OK);
		}
		
		else
		{
			JSONObject returnJsonObject = new JSONObject();
			returnJsonObject.put("Response", "Not found.");
			return new ResponseEntity(returnJsonObject.toString(),HttpStatus.NOT_FOUND);
		}
		
	}
	
	
	

}
