package edu.sjsu.cmpe275.aspects;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import edu.sjsu.cmpe275.model.CustomException;

@Aspect
@Component
public class Aspects {
	
	Logger logger;
	
	@Around("@annotation(Secured)")
	public Object aroundAnyMethod(ProceedingJoinPoint proceedingJoinPoint){
		logger = Logger.getLogger(proceedingJoinPoint.getSignature().getClass());
		
		Object object = null;
		try{
			HttpServletRequest request1 = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
			
			HttpSession session=request1.getSession(false);  
			System.out.println("session " + session);
			
			if(session != null){
				
				String email = (String)session.getAttribute("email");
				
				System.out.println("email " + email);
				
				if(email != null && !"".equalsIgnoreCase(email)){
					object = proceedingJoinPoint.proceed();
				}else{
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("error", "Login required to perform this action.");
					
					return new ResponseEntity(jsonObject.toString(),HttpStatus.UNAUTHORIZED);
				}
			}else{
				JSONObject jsonObject = new JSONObject();
				jsonObject.put("error", "Login required to perform this action.");
				
				return new ResponseEntity(jsonObject.toString(),HttpStatus.UNAUTHORIZED);
			}
			
			
		}catch(CustomException ce){
			logger.error("Error with response code: " + ce.getCode() + " and message: " + ce.getMessage());
			
			//reroute to error handling controller
		}catch(Exception e){
			logger.error("Unexpected exception: " + e.getMessage());
			e.printStackTrace();
			
			//reroute to error handling controller
			
		}catch (Throwable e) {
			logger.error("Unexpected Throwable error: " + e.getMessage());
			e.printStackTrace();
			
			//reroute to error handling controller
		}
		return object;
	}
}
