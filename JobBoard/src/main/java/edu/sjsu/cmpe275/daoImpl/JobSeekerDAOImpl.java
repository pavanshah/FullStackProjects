package edu.sjsu.cmpe275.daoImpl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import edu.sjsu.cmpe275.dao.EducationDAO;
import edu.sjsu.cmpe275.dao.JobSeekerDAO;
import edu.sjsu.cmpe275.model.Application;
import edu.sjsu.cmpe275.model.Education;
import edu.sjsu.cmpe275.model.InterestedJobPost;
import edu.sjsu.cmpe275.model.JobPost;
import edu.sjsu.cmpe275.model.JobSeeker;

@Repository
public class JobSeekerDAOImpl implements JobSeekerDAO{

	@PersistenceContext
	protected EntityManager em;
	
	@Autowired
	EducationDAO educationDAO;

	@Override
	@Transactional
	public JobSeeker updateJobSeekerProfile(JobSeeker jobSeeker) {
		// TODO Auto-generated method stub
		try {
			
			JobSeeker jobSeekerTemp = getJobSeekerProfile(jobSeeker.getEmailId());
			List<Education> educationList = educationDAO.getEducationByJobSeeker(jobSeeker);
			
			System.out.println("jobSeekerTemp.getEducation() : " + educationList);
			
			for(Education education: educationList){
				System.out.println("education.getDegree() : " + education.getDegree());
				educationDAO.deleteEducation(education);
			}
			
			for(Education education: jobSeeker.getEducation()){
				educationDAO.saveEducation(education);
			}
			
			em.merge(jobSeeker);
			
			
			//JobSeeker j = new JobSeeker();
			return getJobSeekerProfile(jobSeeker.getEmailId());
		} catch (Exception e) {
			e.printStackTrace();
			return null;
			
		}
		
	}

	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public JobSeeker getJobSeekerProfile(String emailid) {
		// TODO Auto-generated method stub
		try {
			//JobSeeker jobSeeker = new JobSeeker();
			List<JobSeeker> jobSeekerList = new ArrayList<JobSeeker>();
			Query query2 = em.createQuery("Select m from JobSeeker m where m.emailId=:arg1");
			query2.setParameter("arg1", emailid);
			jobSeekerList = query2.getResultList();
			System.out.println(jobSeekerList);
			return jobSeekerList.get(0);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
			
		}
	}
	
	@Override
	@Transactional
	public boolean applyToJobPost(Application application){
		try{
			em.persist(application);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
	
	/*@Override
	Transactional*/
	/*public boolean signUpJobSeeker(JobSeeker jobSeeker) {
		try{
			em.persist(jobSeeker);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
*/

	@Override
	public boolean updateProfileJobSeeker(JobSeeker jobSeeker) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	@Transactional
	public String getIdByEmailID(String emailId) {
		
		String id = "";
		Query query = em.createQuery("Select j.id from JobSeeker j where j.emailId=:arg1");
		query.setParameter("arg1", emailId);
		try {
			id = (String) query.getSingleResult();
		} catch (NoResultException e) {
			e.printStackTrace();
		}
		return id;
	}

	@Override
	@Transactional
	public JobSeeker getJobSeekerByIdAndVerCode(String verificationCode, String jobSeekerId) {
		JobSeeker jobSeeker = null;
		Query query = em.createQuery("Select j from JobSeeker j where j.id=:arg1 and j.verificationCode=:arg2");
		query.setParameter("arg1", jobSeekerId);
		query.setParameter("arg2", verificationCode);
		
		try {
			jobSeeker = (JobSeeker) query.getSingleResult();
		} catch (NoResultException e) {
			e.printStackTrace();
		}
		return jobSeeker;
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<Application> getJobSeekerApplications(JobSeeker jobSeekerId){
		
		List<Application> returnObj = null;
		
		Query query = em.createQuery("Select j from Application j where j.jobSeekerId=:arg1");
		query.setParameter("arg1", jobSeekerId);
		
		try {
			returnObj = (List<Application>) query.getResultList();
		} catch (NoResultException e) {
			e.printStackTrace();
		}
		return returnObj;
		
	}
	
	@Override
	@Transactional
	public boolean markAsInterested(InterestedJobPost jobpost){
		try{
			em.merge(jobpost);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<InterestedJobPost> getJobSeekerInterestedList(JobSeeker jobSeeker) {
		List<InterestedJobPost> returnObj = null;
		
		Query query = em.createQuery("Select j from InterestedJobPost j where j.jobSeeker=:arg1");
		query.setParameter("arg1", jobSeeker);
		
		try {
			returnObj = (List<InterestedJobPost>) query.getResultList();
		} catch (NoResultException e) {
			e.printStackTrace();
		}
		return returnObj;
	}

	
}
