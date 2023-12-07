package com.taskmanager.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.Exception.TaskException;
import com.taskmanager.Model.Task;
import com.taskmanager.Model.Users;
import com.taskmanager.Repository.TaskRepo;
import com.taskmanager.Repository.UserRepo;

@Service
public class TaskServiceImpl implements TaskService{
	
	@Autowired
	private TaskRepo taskRepo;
	
	@Autowired
	private UserRepo userRepo;

	@Override
	public Task addTask(Task task,Integer userId) throws TaskException{
		Optional<Users> optional =  userRepo.findById(userId);
		if (optional.isEmpty()) {
		 	throw new TaskException("No user found to store task!");
		}
		Users existingUsers = optional.get();
		task.setStatus("Pending");
		task.setDate(LocalDate.now());
		existingUsers.getTasks().add(task);
		userRepo.save(existingUsers);
		return task;
	}

	@Override
	public Task updateTask(Integer taskId, String task) throws TaskException{
		Optional<Task> optTask = taskRepo.findById(taskId);
		if (optTask.isEmpty()) {
			throw new TaskException("Not there any task with the taskid");
		}
		Task existingTask = optTask.get();
		existingTask.setTask(task);
		taskRepo.save(existingTask);
		return existingTask;
	}

	@Override
	public Task deleteTask(Integer userId,Integer taskId) throws TaskException{
		Optional<Users> optional =  userRepo.findById(userId);
		Users existingUsers = optional.get();
		List<Task> listOTasks = existingUsers.getTasks();
		listOTasks.removeIf(task -> task.getTaskId().equals(taskId));
		userRepo.save(existingUsers);
		Optional<Task> optTask = taskRepo.findById(taskId);
		Task existingTask = optTask.get();
		taskRepo.delete(existingTask);
		return existingTask;
	}

	@Override
	public Task updateTaskStatus(Integer taskId, String status) throws TaskException {
		Optional<Task> optTask = taskRepo.findById(taskId);
		if (optTask.isEmpty()) {
			throw new TaskException("Not there any task with the taskid");
		}
		Task existingTask = optTask.get();
		existingTask.setStatus(status);
		taskRepo.save(existingTask);
		return existingTask;
	}

	@Override
	public List<Task> getAllTasks(Integer userId) throws TaskException {
		Optional<Users> optional =  userRepo.findById(userId);
		Users existingUsers = optional.get();
		List<Task> listOTasks = existingUsers.getTasks();
		return listOTasks;
	}

}
