package edu.sjsu.cmpe275.daoImpl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import edu.sjsu.cmpe275.dao.JobPostDAO;
import edu.sjsu.cmpe275.model.Application;
import edu.sjsu.cmpe275.model.Company;
import edu.sjsu.cmpe275.model.Company_;
import edu.sjsu.cmpe275.model.JobPost;
import edu.sjsu.cmpe275.model.JobPost_;

@Repository
public class JobPostDAOImpl implements JobPostDAO{

	@PersistenceContext
	protected EntityManager em;
	
	@Override
	@Transactional
	public boolean addNewJob(JobPost jobPost) {
		
		try{
			em.persist(jobPost);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		
	}

	@Override
	@Transactional
	public JobPost getJobDetails(String jobid) {
		
		try{
			JobPost jobPost = em.find(JobPost.class, jobid);
			System.out.println("jobPost1 "+jobPost.getTitle());
			return jobPost;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
		
		
	}

	@Override
	@Transactional
	public boolean updateJobDetails(JobPost jobPost) {
		
		try {
			System.out.println("inside "+jobPost.getTitle());
			em.merge(jobPost);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
	}

	@Override
	@Transactional
	public List<JobPost> getJobsByCompany(String CompanyId) {
		
		Query query = em.createQuery("SELECT p FROM JobPost p ORDER BY p.id");
		
		try {
			
			List<JobPost> resultList = new ArrayList<JobPost>();
			
			
			List<JobPost> jobPosts = query.getResultList();
			
			for(int i = 0 ; i < jobPosts.size() ; i++)
			{
				if(jobPosts.get(i).getCompany()!=null && jobPosts.get(i).getCompany().getCompanyId().equalsIgnoreCase(CompanyId))
				{
					resultList.add(jobPosts.get(i));
				}
			}
		
			return resultList;
		} 
		catch (Exception e) 
		{
			e.printStackTrace();
			return null;
		}
		
		
	}

	@Override
	public List<Application> getJobPostApplications(JobPost jobPost) {

		List<Application> returnObj = null;
		
		Query query = em.createQuery("Select j from Application j where j.jobPostId=:arg1");
		query.setParameter("arg1", jobPost);
		
		try {
			returnObj = (List<Application>) query.getResultList();
		} catch (NoResultException e) {
			e.printStackTrace();
		}
		return returnObj;
		
	}

	@Override
	public List<JobPost> searchByText(String keyword) {
		
		List<JobPost> jobPostList = null;
			
		final List<Predicate> andPredicates = new ArrayList<Predicate>();
		final List<Predicate> orPredicates = new ArrayList<Predicate>();
		
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<JobPost> cq = cb.createQuery(JobPost.class);
		Root<JobPost> root = cq.from(JobPost.class);
		cq.select(root);
		
		Join<JobPost,Company> joinRoot = root.join(JobPost_.company);
		String[] listOfWords = keyword.split(" ");
		
		if (keyword!=null && !"".equalsIgnoreCase(keyword)) {
			for(String keywordTemp: listOfWords){
				if (keywordTemp!=null && !"".equalsIgnoreCase(keywordTemp)) {
					keywordTemp = keywordTemp.trim();
			    	
			    	orPredicates.add(cb.like(root.get(JobPost_.description), "%" + keywordTemp + "%" ));
			    	orPredicates.add(cb.like(root.get(JobPost_.officeLocation), "%" + keywordTemp + "%" ));
			    	orPredicates.add(cb.equal(root.get(JobPost_.salary), keywordTemp ));
			    	orPredicates.add(cb.like(root.get(JobPost_.title), "%" + keywordTemp + "%" ));
			    	orPredicates.add(cb.equal(joinRoot.get(Company_.name), keywordTemp ));
			    	orPredicates.add(cb.like(root.get(JobPost_.responsibilities), "%" + keywordTemp + "%" ));
			    	
			    }
			}
		}
		
		andPredicates.add(cb.equal(root.get(JobPost_.status), "open" ));
		
		Predicate o = cb.and(andPredicates.toArray(new Predicate[andPredicates.size()]));
        Predicate p = cb.or(orPredicates.toArray(new Predicate[orPredicates.size()]));
        
        cq.distinct(true);
        cq.where(o, p);
        
        jobPostList = em.createQuery(cq).getResultList();
	    
		return jobPostList;
	}

	@Override
	public List<JobPost> searchByFilter(List<String> companyList, List<String> locationList, Integer start, Integer end,
			String rangeType) {
		List<JobPost> jobPostList = null;
		
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<JobPost> cq = cb.createQuery(JobPost.class);
		Root<JobPost> root = cq.from(JobPost.class);
		cq.select(root);
		
		Join<JobPost,Company> joinRoot = root.join(JobPost_.company);
		
		final List<Predicate> orPredicatesForCompany = new ArrayList<Predicate>();
		final List<Predicate> orPredicatesForLocation = new ArrayList<Predicate>();
		Predicate predicateForRange = null;
		final List<Predicate> andPredicates = new ArrayList<Predicate>();
		
		if(companyList != null && !companyList.isEmpty()){
			for(String companyName: companyList){
				orPredicatesForCompany.add(cb.equal(joinRoot.get(Company_.name), companyName ));
			}
		}
		
		if(locationList != null && !locationList.isEmpty()){
			for(String locationName: locationList){
				orPredicatesForLocation.add(cb.like(root.get(JobPost_.officeLocation), "%" + locationName + "%" ));
			}
		}
		
		if(rangeType != null && !"none".equalsIgnoreCase(rangeType)){
			if("Single_value".equalsIgnoreCase(rangeType)){
				predicateForRange = cb.equal(root.get(JobPost_.salary), start );
			}else if("Only_start".equalsIgnoreCase(rangeType)){
				predicateForRange = cb.ge(root.get(JobPost_.salary).as(Integer.class), start );
			}else if("Only_end".equalsIgnoreCase(rangeType)){
				predicateForRange = cb.le(root.get(JobPost_.salary).as(Integer.class), end );
			}else if("both".equalsIgnoreCase(rangeType)){
				predicateForRange = cb.between(root.get(JobPost_.salary).as(Integer.class), start, end );
			}
		}
		
		if(orPredicatesForCompany != null & !orPredicatesForCompany.isEmpty()){
			Predicate predicateForCompany = cb.or(orPredicatesForCompany.toArray(new Predicate[orPredicatesForCompany.size()]));
			andPredicates.add(predicateForCompany);
		}
		if(orPredicatesForLocation != null & !orPredicatesForLocation.isEmpty()){
			Predicate predicateForLocation = cb.or(orPredicatesForLocation.toArray(new Predicate[orPredicatesForLocation.size()]));
			andPredicates.add(predicateForLocation);
		}
		if(predicateForRange != null){
			andPredicates.add(predicateForRange);
		}
		
		andPredicates.add(cb.equal(root.get(JobPost_.status), "open" ));
		
		Predicate o = cb.and(andPredicates.toArray(new Predicate[andPredicates.size()]));
        
		cq.distinct(true);
        cq.where(o);
        
        jobPostList = em.createQuery(cq).getResultList();
	    
		return jobPostList;
	}

	@Override
	@Transactional
	public boolean updateApplication(Application application) {
		try {
			System.out.println("inside "+application.getApplicationId());
			em.merge(application);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Application getApplicationDetails(String applicationId) {
		Application returnObj = null;
		
		Query query = em.createQuery("Select a from Application a where a.applicationId=:arg1");
		query.setParameter("arg1", applicationId);
		
		try {
			returnObj = (Application) query.getSingleResult();
		} catch (NoResultException e) {
			e.printStackTrace();
		}
		return returnObj;
	}

	

}
