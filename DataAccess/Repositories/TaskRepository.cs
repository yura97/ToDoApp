using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using DataAccess.Models;
using Domain.Models;
using Domain.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Repositories
{
    internal class TaskRepository : ITaskRepository
    {
        private readonly TasksDbContext context;
        private readonly IMapper mapper;

        public TaskRepository(TasksDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public IEnumerable<Task> GetAll()
        {
            var tasksDb = context.Tasks.ToList();
            return mapper.Map<IReadOnlyCollection<Task>>(tasksDb);
        }
        
        public IEnumerable<Task> GetTasksForGroup_All(int id)
        {
            var idsTasks = context.ToDos.ToList().Where(ids => ids.TaskGroupId == id).ToList();
            var tasksDb = context.Tasks.ToList();

            var result = tasksDb.Where(a => idsTasks.Any(b => b.TaskId == a.Id)).ToList();

            return mapper.Map<IReadOnlyCollection<Task>>(result);
        }
        
        public IEnumerable<Task> GetTasksForGroup_Active(int id)
        {
            var idsTasks = context.ToDos.ToList().Where(ids => ids.TaskGroupId == id).ToList();
            var tasksDb = context.Tasks.ToList();

            var result = tasksDb.Where(a => idsTasks.Any(b => b.TaskId == a.Id))
                .Where(f => f.IsDone == false)
                .ToList();

            return mapper.Map<IReadOnlyCollection<Task>>(result);
        }
        
        public IEnumerable<Task> GetTasksForGroup_Completed(int id)
        {
            var idsTasks = context.ToDos.ToList().Where(ids => ids.TaskGroupId == id).ToList();
            var tasksDb = context.Tasks.ToList();

            var result = tasksDb.Where(a => idsTasks.Any(b => b.TaskId == a.Id))
                .Where(f => f.IsDone )
                .ToList();

            return mapper.Map<IReadOnlyCollection<Task>>(result);
        }

        public Task? Get(int id)
        {
            var taskDb = context.Tasks.FirstOrDefault(x => x.Id == id);
            return mapper.Map<Task?>(taskDb);
        }

        public int New(Task task)
        {
            var taskDb = mapper.Map<TaskDb>(task);
            var result = context.Tasks.Add(taskDb);
            context.SaveChanges();
            return result.Entity.Id;
        }

        public int Edit(Task task)
        {
            if (context.Tasks.Find(task.Id) is TaskDb taskInDb)
            {
                taskInDb.TaskName = task.TaskName;
                taskInDb.IsDone = task.IsDone;
                context.Entry(taskInDb).State = EntityState.Modified;
                context.SaveChanges();
                return task.Id;
            }
            else
            {
                throw new InvalidDataException("There is no task with that id");
            }
        }

        public void Delete(int id)
        {
            var taskToDelete = context.Tasks.Find(id);
            context.Entry(taskToDelete).State = EntityState.Deleted;
            context.SaveChanges();
        }
    }
}