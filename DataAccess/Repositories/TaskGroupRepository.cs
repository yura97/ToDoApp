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
    internal class TaskGroupRepository : ITaskGroupRepository
    {
        private readonly TasksDbContext context;
        private readonly IMapper mapper;

        public TaskGroupRepository(TasksDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public IEnumerable<TaskGroup> GetAll()
        {
            var taskGroupsDb = context.TaskGroups.ToList();
            return mapper.Map<IReadOnlyCollection<TaskGroup>>(taskGroupsDb);
        }

        public TaskGroup? Get(int id)
        {
            var taskGroupDb = context.TaskGroups.FirstOrDefault(x => x.Id == id);
            return mapper.Map<TaskGroup?>(taskGroupDb);
        }

        public int New(TaskGroup taskGroup)
        {
            var taskGroupDb = mapper.Map<TaskGroupDb>(taskGroup);
            var result = context.TaskGroups.Add(taskGroupDb);
            context.SaveChanges();
            return result.Entity.Id;
        }

        public int Edit(TaskGroup taskGroup)
        {
            if (context.TaskGroups.Find(taskGroup.Id) is TaskGroupDb taskGroupInDb)
            {
                taskGroupInDb.TaskGroupName = taskGroup.TaskGroupName;
                context.Entry(taskGroupInDb).State = EntityState.Modified;
                context.SaveChanges();
                return taskGroup.Id;
            }
            else
            {
                throw new InvalidDataException("There is no task group with that id");
            }
        }

        public void Delete(int id)
        {
            var taskGroupToDelete = context.TaskGroups.Find(id);
            context.Entry(taskGroupToDelete).State = EntityState.Deleted;
            context.SaveChanges();
        }
    }
}