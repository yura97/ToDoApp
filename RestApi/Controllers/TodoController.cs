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
    [Route("/api/todo")]
    public class TodoController : ControllerBase
    {
        private readonly IToDoRepository _todoRepository;
        private readonly ILogger<TodoController> _logger;
        
        public TodoController(IToDoRepository todoRepository, ILogger<TodoController> logger)
        {
            _todoRepository = todoRepository;
            _logger = logger;
        }
        
        [HttpGet]
        public ActionResult<IReadOnlyCollection<ToDo>> GetTasks()
        {
            return _todoRepository.GetAll().ToArray();
        }

        [HttpPost]
        public IActionResult AddTodo(ToDo toDo)
        {
            try
            {
                var newIds = _todoRepository.New(toDo);
                return Ok($"api/todo/{newIds}");
            }
            catch (Exception e)
            {
                _logger.LogError("Add Student: There is already exist Student with that id");
                throw;
            }
        }
    }
}