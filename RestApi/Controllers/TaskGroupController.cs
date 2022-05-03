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
    [Route("/api/task-group")]
    public class TaskGroupController : ControllerBase
    {
        private readonly ITaskGroupRepository _taskService;
        private readonly ILogger<TaskController> _logger;
        
        public TaskGroupController(ITaskGroupRepository taskService, ILogger<TaskController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }
        
        [HttpGet("{id}")]
        public ActionResult<TaskGroup> GetTaskGroup(int id)
        {
            return _taskService.Get(id) switch
            {
                null => NotFound(),
                var task => task
            };
        }
        
        [HttpGet]
        public ActionResult<IReadOnlyCollection<TaskGroup>> GetTaskGroups()
        {
            return _taskService.GetAll().ToArray();
        }

        [HttpPost]
        public IActionResult AddTaskGroup(TaskGroup task)
        {
            try
            {
                var newTaskId = _taskService.New(task);
                // return Ok($"api/task-group/{newTaskId}");
                return Ok(newTaskId);
            }
            catch (Exception e)
            {
                _logger.LogError("Add TaskGroup: There is already exist TaskGroup with that id");
                throw new Exception("There is already exist TaskGroup with that id");
            }
        }
        
        [HttpPut("{id}")]
        public ActionResult<string> UpdateTaskGroup(int id, TaskGroup task)
        {
            try
            {
                var taskId = _taskService.Edit(task with { Id = id });
                // return Ok($"api/task-group/{taskId}");
                return Ok(taskId);
            }
            catch (Exception e)
            {
                _logger.LogError("Edit TaskGroup: There is no TaskGroup with that id");
                throw;
            }
        }
        
        [HttpDelete("{id}")]
        public ActionResult DeleteTaskGroup(int id)
        {
            try
            {
                _taskService.Delete(id);
                return Ok();
            }
            catch (ArgumentNullException e)
            {
                _logger.LogError("Delete TaskGroup: There is no TaskGroup with that id");
                throw new ArgumentNullException("There is no TaskGroup with that id");
            }
        }
    }
}