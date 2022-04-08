using System.Collections.Generic;
using Domain.Models;

namespace Domain.Repositories
{
    public interface ITaskGroupRepository
    {
        int New(TaskGroup group); 
        TaskGroup? Get(int id); 
        IEnumerable<TaskGroup> GetAll();
        int Edit(TaskGroup group); 
        void Delete(int id);
    }
}