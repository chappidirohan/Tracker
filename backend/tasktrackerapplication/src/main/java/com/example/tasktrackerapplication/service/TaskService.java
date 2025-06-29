package com.example.tasktrackerapplication.service;

import com.example.tasktrackerapplication.modal.Task;
import com.example.tasktrackerapplication.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    public void deleteJob(Integer id) {
        taskRepository.deleteById(id);
    }

    public Task updateTask(Integer id, Task task) {
        return taskRepository.save(task);
    }
}
