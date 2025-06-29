package com.example.tasktrackerapplication.controller;

import com.example.tasktrackerapplication.modal.Task;
import com.example.tasktrackerapplication.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
@CrossOrigin(origins="http://localhost:3000/")
public class TaskController {

    private final TaskService taskService;
    private Integer id;

    public TaskController(TaskService taskService){
        this.taskService = taskService;
    }

    @GetMapping("/getAllTasks")
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @PostMapping("/createTask")
    public Task createTask(@RequestBody Task task){
        return taskService.saveTask(task);
    }

    @DeleteMapping("/deleteTask/{id}")
    public String deleteJob(@PathVariable Integer id){
        taskService.deleteJob(id);
        return "Task with ID " + id + " deleted successfully";
    }

    @PutMapping("/updateTask/{id}")
    public Task updateTask(@PathVariable Integer id, @RequestBody Task task){
        return taskService.updateTask(id, task);
    }
}
