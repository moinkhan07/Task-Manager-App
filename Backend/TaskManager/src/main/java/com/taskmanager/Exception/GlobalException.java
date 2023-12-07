package com.taskmanager.Exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.taskmanager.Model.MyErrorDetails;

@ControllerAdvice
public class GlobalException {
	
	@ExceptionHandler(UserException.class)  
	public ResponseEntity<MyErrorDetails> userExceptionHandler(UserException userException,WebRequest req){
        
		MyErrorDetails myErr = new MyErrorDetails(LocalDateTime.now(), userException.getMessage(), req.getDescription(false));
		
		return new ResponseEntity<MyErrorDetails>(myErr,HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(TaskException.class)  
	public ResponseEntity<MyErrorDetails> taskExceptionHandler(TaskException taskException,WebRequest req){
        
		MyErrorDetails myErr = new MyErrorDetails(LocalDateTime.now(), taskException.getMessage(), req.getDescription(false));
		
		return new ResponseEntity<MyErrorDetails>(myErr,HttpStatus.BAD_REQUEST);
	}
}
