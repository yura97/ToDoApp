using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Models;
using Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace RestApi.Controllers
{
    [ApiController]
    [Route("/api/task")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskService;
        private readonly ILogger<TaskController> _logger;
        
        public TaskController(ITaskRepository taskService, ILogger<TaskController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }
        
        [HttpGet("{id}")]
        public ActionResult<Task> GetTask(int id)
        {
            return _taskService.Get(id) switch
            {
                null => NotFound(),
                var task => task
            };
        }
        
        [HttpGet]
        public ActionResult<IReadOnlyCollection<Task>> GetTasks()
        {
            return _taskService.GetAll().ToArray();
        }
        
        [HttpGet("tasks/task-group/{id}")]
        public ActionResult<IReadOnlyCollection<Task>> GetAllTasksForGroup(int id)
        {
            return _taskService.GetTasksForGroup_All(id).ToArray();
        }
        
        [HttpGet("tasks/task-group/{id}/active")]
        public ActionResult<IReadOnlyCollection<Task>> GetActiveTasksForGroup(int id)
        {
            return _taskService.GetTasksForGroup_Active(id).ToArray();
        }
        
        [HttpGet("tasks/task-group/{id}/completed")]
        public ActionResult<IReadOnlyCollection<Task>> GetCompletedTasksForGroup(int id)
        {
            return _taskService.GetTasksForGroup_Completed(id).ToArray();
        }

        [HttpPost]
        public IActionResult AddTask(Task task)
        {
            try
            {
                var newTaskId = _taskService.New(task);
                return Ok(newTaskId);
            }
            catch (Exception e)
            {
                _logger.LogError("Add Student: There is already exist Student with that id");
                throw new Exception("There is already exist Student with that id");
            }
        }
        
        [HttpPut("{id}")]
        public ActionResult<string> UpdateTask(int id, Task task)
        {
            try
            {
                var taskId = _taskService.Edit(task with { Id = id });
                // return Ok($"api/task/{taskId}");
                return Ok(taskId);
            }
            catch (Exception e)
            {
                _logger.LogError("Edit Student: There is no Student with that id");
                throw;
            }
        }
        
        [HttpDelete("{id}")]
        public ActionResult DeleteTask(int id)
        {
            try
            {
                _taskService.Delete(id);
                return Ok();
            }
            catch (ArgumentNullException e)
            {
                _logger.LogError("Delete Student: There is no Student with that id");
                throw new ArgumentNullException("There is no Student with that id");
            }
        }
    }
}