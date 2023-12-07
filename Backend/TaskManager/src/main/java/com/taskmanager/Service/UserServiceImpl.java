package com.taskmanager.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.DTO.UserDTO;
import com.taskmanager.Exception.UserException;
import com.taskmanager.Model.Users;
import com.taskmanager.Repository.UserRepo;

@Service
public class UserServiceImpl implements UserService{
	
	@Autowired
	private UserRepo userRepo;

	@Override
	public Users registerUsers(Users users) {
		return userRepo.save(users);
	}

	@Override
	public Users loginUsers(UserDTO userDTO)  throws UserException {
		Users existingUser = userRepo.findByUserEmail(userDTO.getUserEmail());
		if (existingUser != null) {
			if(existingUser.getUserPassword().equals(userDTO.getUserPassword())) {
				return existingUser;
			}
		}
		throw new UserException("Wrong Credential");
	}

	@Override
	public Users getUserByEmail(String email) {
		Users users = userRepo.findByUserEmail(email);
		return users;
	}

}
