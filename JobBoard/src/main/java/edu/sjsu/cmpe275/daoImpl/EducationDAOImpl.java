package edu.sjsu.cmpe275.daoImpl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe275.dao.EducationDAO;
import edu.sjsu.cmpe275.model.Education;
import edu.sjsu.cmpe275.model.JobSeeker;

@Repository
public class EducationDAOImpl implements EducationDAO {
	@PersistenceContext
	protected EntityManager em;
	//
	@Override
	@Transactional
	public List<Education> getEducationByJobSeeker(JobSeeker jobSeeker){
		try{
			List<Education> educationList = new ArrayList<Education>();
			Query query2 = em.createQuery("Select e from Education e where e.jobSeeker=:arg1");
			query2.setParameter("arg1", jobSeeker);
			educationList = query2.getResultList();
			
			return educationList;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	@Transactional
	public boolean saveEducation(Education edcuation){
		try{
			em.persist(edcuation);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	@Transactional
	public boolean deleteEducation(Education edcuation){
		try{
			em.remove(edcuation);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
	}
}
