package edu.sjsu.cmpe275.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import edu.sjsu.cmpe275.model.JobPost;
import edu.sjsu.cmpe275.model.JobSeeker;
import edu.sjsu.cmpe275.services.JobPostService;

@CrossOrigin(origins = "*")
@RestController
public class JobPostController {
	
	@Autowired
	JobPostService jobPostService;

	@RequestMapping(value="/updateApplication",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> updateApplication(HttpServletRequest request, HttpServletResponse response) throws JSONException{
		
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		Application application = jobPostService.getApplicationDetails(jsonObject.getString("applicationId"));
		
		application.setStatus(jsonObject.getString("status"));
		
		jobPostService.updateApplication(application);
		
		String textToSend = "Your application's status has been changed for position " + application.getJobPostId().getTitle();
		String emailId = application.getJobSeekerId().getEmailId();
		Util.sendEmail(textToSend, emailId);
		
		JSONObject returnJsonObject = new JSONObject();
		returnJsonObject.put("Response", application);
		
		return new ResponseEntity(returnJsonObject.toString(),HttpStatus.OK);
	}
	
	@RequestMapping(value="/searchByText",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> searchByText(HttpServletRequest request, HttpServletResponse response) throws JSONException
	{
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		String keyword = jsonObject.getString("keyword");
		
		List<JobPost> jobPostList = null;
		/*if(keyword != null && !"".equalsIgnoreCase(keyword))*/
			jobPostList = jobPostService.searchByText(keyword);
		
		JSONObject returnJsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray(jobPostList);
		returnJsonObject.put("Response", jsonArray);
		
		return new ResponseEntity(returnJsonObject.toString(),HttpStatus.OK);
	}
	
	@RequestMapping(value="/searchByFilter",method = RequestMethod.POST)
	@Secured
	public ResponseEntity<?> searchByFilter(HttpServletRequest request, HttpServletResponse response) throws JSONException
	{
		JSONObject jsonObject = new JSONObject(Util.getDataString(request));
		
		JSONArray companyJsonArrayList = jsonObject.getJSONArray("companies");
		List<String> companyList = new ArrayList<String>();
		JSONArray locationJsonArrayList = jsonObject.getJSONArray("location");
		List<String> locationList = new ArrayList<String>();
		JSONObject range = jsonObject.getJSONObject("range");
		
		for(int i=0;i<companyJsonArrayList.length();i++)
			companyList.add(companyJsonArrayList.getString(i));
		
		for(int i=0;i<locationJsonArrayList.length();i++)
			locationList.add(locationJsonArrayList.getString(i));
		
		Integer start = 0;
		Integer end = 0;
		if(!"".equalsIgnoreCase(range.getString("start")))
			start = Integer.valueOf(range.getString("start"));
		
		if(!"".equalsIgnoreCase(range.getString("end")))
			end = Integer.valueOf(range.getString("end"));
		
		String rangeType = range.getString("type");
		
		List<JobPost> jobPostList = null;
		
		/*if((companyList == null || companyList.isEmpty()) && (locationList==null || locationList.isEmpty()) && (start==0 && end==0)){
			
		}
		else{*/
			jobPostList = jobPostService.searchByFilter(companyList, locationList, start, end, rangeType);
		/*}*/
		
		JSONObject returnJsonObject = new JSONObject();
		JSONArray jsonArray = new JSONArray(jobPostList);
		returnJsonObject.put("Response", jsonArray);
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create(); 
		JsonParser jp = new JsonParser();
		JsonElement je = jp.parse(returnJsonObject.toString());
		String prettyJsonString = gson.toJson(je);
		
		return new ResponseEntity(prettyJsonString,HttpStatus.OK);
	}
}
