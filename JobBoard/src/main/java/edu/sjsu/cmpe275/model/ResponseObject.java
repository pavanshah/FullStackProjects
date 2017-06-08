package edu.sjsu.cmpe275.model;

public class ResponseObject {
	
	private String data;
	private String error;
	
	public ResponseObject(String data, String error) {
		this.data = data;
		this.error = error;
	}
	
	public String getData() {
		return data;
	}
	public void setData(String data) {
		this.data = data;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
}
