package com.taskmanager.Service;

import java.util.List;

import com.taskmanager.Exception.TaskException;
import com.taskmanager.Model.Task;

public interface TaskService {
	
	public Task addTask(Task task,Integer userId) throws TaskException;
	
	public Task updateTask(Integer taskId,String task) throws TaskException;
	
	public Task deleteTask(Integer userId, Integer taskId) throws TaskException;
	
	public Task updateTaskStatus(Integer taskId,String status) throws TaskException;
	
	public List<Task> getAllTasks(Integer userId) throws TaskException;

}
