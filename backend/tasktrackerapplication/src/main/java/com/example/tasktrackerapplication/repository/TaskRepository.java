package com.example.tasktrackerapplication.repository;

import com.example.tasktrackerapplication.modal.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
}
