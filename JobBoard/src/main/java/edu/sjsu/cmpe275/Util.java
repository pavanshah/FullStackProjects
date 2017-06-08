package edu.sjsu.cmpe275;
import java.io.BufferedReader;
import java.net.URI;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;

import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

public class Util {
	
	public final static String BASE_URL = "http://ec2-54-153-93-47.us-west-1.compute.amazonaws.com:8080/";
	
	public static boolean sendEmail(String textToSend, String emailId){
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl(); 
	    mailSender.setHost("smtp.gmail.com");
	    mailSender.setPort(587);
	     
	    mailSender.setUsername("CMPE275JobBoard@gmail.com");
	    mailSender.setPassword("CMPE275@JobBoard");
	     
	    Properties props = mailSender.getJavaMailProperties();
	    props.put("mail.transport.protocol", "smtp");
	    props.put("mail.smtp.auth", "true");
	    props.put("mail.smtp.starttls.enable", "true");
	    props.put("mail.debug", "true");
		
	    
	    SimpleMailMessage message = new SimpleMailMessage(); 
		try{
			//should be message.setTo(emailId);
			message.setFrom("CMPE275JobBoard@gmail.com");
			message.setTo(emailId);
			message.setSubject("Confirmation email - JobBoard");  
			
			message.setText(textToSend); 
	        
	        mailSender.send(message);
	        System.out.println("sent");
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		return true;
	}
	
	
	public static boolean sendBulkEmail(String textToSend, String[] emailIds, String subject){
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl(); 
	    mailSender.setHost("smtp.gmail.com");
	    mailSender.setPort(587);
	     
	    mailSender.setUsername("CMPE275JobBoard@gmail.com");
	    mailSender.setPassword("CMPE275@JobBoard");
	     
	    Properties props = mailSender.getJavaMailProperties();
	    props.put("mail.transport.protocol", "smtp");
	    props.put("mail.smtp.auth", "true");
	    props.put("mail.smtp.starttls.enable", "true");
	    props.put("mail.debug", "true");
	    
	    System.out.println("fds "+emailIds[0]);
	    
	    SimpleMailMessage message = new SimpleMailMessage(); 
		try{
			//should be message.setTo(emailId);
			message.setFrom("CMPE275JobBoard@gmail.com");
			message.setTo(emailIds);
			message.setSubject(subject);  
			
			message.setText(textToSend); 
	        
	        mailSender.send(message);
	        System.out.println("sent");
			
		}catch(Exception ex){
			ex.printStackTrace();
		}
		
		return true;
	}
	
	
	public static <E> ResponseEntity<E> redirectTo(URI location){
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(location);
		return (ResponseEntity<E>) new ResponseEntity<Void>(headers, HttpStatus.MOVED_PERMANENTLY);
	}
	
	public static String getDataString(HttpServletRequest request){
		StringBuffer jb = new StringBuffer();
		JSONObject dataJson = new JSONObject();
		  String line = null;
		  try {
		    BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		      jb.append(line);
		    dataJson = new JSONObject(jb.toString());
		    
		  } catch (Exception e) { 
			  e.printStackTrace();
		  }
		  
		  return dataJson.get("data").toString();
	} 
	
}
