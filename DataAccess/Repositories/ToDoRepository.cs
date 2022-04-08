using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DataAccess.Models;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    internal class ToDoRepository : IToDoRepository
    {
        private readonly TasksDbContext context;
        private readonly IMapper mapper;

        public ToDoRepository(TasksDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public IEnumerable<ToDo> GetAll()
        {
            var toDosDb = context.ToDos.ToList();
            return mapper.Map<IReadOnlyCollection<ToDo>>(toDosDb);
        }

        public ToDo? Get(int taskGroupId, int taskId)
        {
            var toDoDb = context.ToDos.FirstOrDefault(x => 
                x.TaskGroupId == taskGroupId &&
                x.TaskId == taskId );
            return mapper.Map<ToDo?>(toDoDb);
        }

        public int[] New(ToDo toDo)
        {
            var toDoDb = mapper.Map<ToDoDb>(toDo);
            var result = context.ToDos.Add(toDoDb);
            context.SaveChanges();
            return new[] { result.Entity.TaskGroupId, result.Entity.TaskId };
        }

        public void Delete(int taskGroupId, int taskId)
        {
            var toDelete = context.ToDos.Find(taskGroupId, taskId);
            context.Entry(toDelete).State = EntityState.Deleted;
            context.SaveChanges();
        }
    }
}