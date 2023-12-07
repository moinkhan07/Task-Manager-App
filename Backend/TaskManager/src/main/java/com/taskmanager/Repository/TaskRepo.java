package com.taskmanager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanager.Model.Task;

@Repository
public interface TaskRepo extends JpaRepository<Task, Integer>{
	

}
