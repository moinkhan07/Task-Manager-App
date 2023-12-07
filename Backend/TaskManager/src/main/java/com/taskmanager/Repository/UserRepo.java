package com.taskmanager.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskmanager.Model.Users;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer>{
	
	public Users findByUserEmail(String email);

}
