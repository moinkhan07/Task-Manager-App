package com.taskmanager.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.taskmanager.DTO.UserDTO;
import com.taskmanager.Exception.TaskException;
import com.taskmanager.Exception.UserException;
import com.taskmanager.Model.Task;
import com.taskmanager.Model.Users;
import com.taskmanager.Service.TaskService;
import com.taskmanager.Service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class MainController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private TaskService taskService;
	
	@PostMapping("/users")
	public ResponseEntity<Users> saveUsersHandler(@RequestBody Users users){
		Users registeredUser= userService.registerUsers(users);		
		return new ResponseEntity<Users>(registeredUser,HttpStatus.ACCEPTED);
		
	}
	
	@PostMapping("/userlogin")
	public ResponseEntity<Users> loginUser(@RequestBody UserDTO users) throws UserException {
		Users result = userService.loginUsers(users);
		return new ResponseEntity<Users>(result,HttpStatus.OK);
		
	}
	
	@GetMapping("/users/{email}")
	public ResponseEntity<Users> getUserByEmailHandler(@PathVariable("email") String email){
		Users users = userService.getUserByEmail(email);
		return new ResponseEntity<Users>(users,HttpStatus.OK);
	} 
	
	@PostMapping("/tasks/{uId}")
	public ResponseEntity<Task> addTask(@RequestBody Task task,@PathVariable("uId") Integer userId) throws TaskException {
		Task addMovie = taskService.addTask(task, userId);
		return new ResponseEntity<>(addMovie,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/tasks/{tId}/{uId}")
	public ResponseEntity<Task> deleteTaskHandler(@PathVariable("tId") Integer taskId,@PathVariable("uId") Integer userId) throws TaskException{
		Task deletedTask = taskService.deleteTask(userId, taskId);
		return new ResponseEntity<>(deletedTask,HttpStatus.OK);
	}
	
	@GetMapping("/tasks/{uId}")
	public ResponseEntity<List<Task>> getAllTasksHandler(@PathVariable("uId") Integer userId) throws TaskException {
		List<Task> listOfTasks = taskService.getAllTasks(userId);
		return new ResponseEntity<List<Task>>(listOfTasks,HttpStatus.OK);
	}
	
	@PutMapping("/tasks/{tId}/{nTask}")
	public ResponseEntity<Task> updateTask(@PathVariable("tId") Integer taskId,@PathVariable("nTask") String newTask) throws TaskException {
		Task updatedTask = taskService.updateTask(taskId, newTask);
		return new ResponseEntity<>(updatedTask,HttpStatus.OK);
	}
	
	@PutMapping("/tasksStatus/{tId}/{nStatus}")
	public ResponseEntity<Task> updateTaskStatus(@PathVariable("tId") Integer taskId,@PathVariable("nStatus") String newStatus) throws TaskException {
		Task updatedTask = taskService.updateTaskStatus(taskId, newStatus);
		return new ResponseEntity<>(updatedTask,HttpStatus.OK);
	}

}
