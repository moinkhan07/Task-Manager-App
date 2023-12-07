package com.taskmanager.Service;

import com.taskmanager.DTO.UserDTO;
import com.taskmanager.Exception.UserException;
import com.taskmanager.Model.Users;

public interface UserService {
	
	public Users registerUsers(Users users);
	
	public Users loginUsers(UserDTO userDTO) throws UserException;
	
	public Users getUserByEmail(String email);

}
