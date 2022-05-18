using System.Collections.Generic;
using Domain.Models;

namespace Domain.Repositories
{
    public interface ITaskRepository
    {
        int New(Task task); 
        Task? Get(int id); 
        IEnumerable<Task> GetAll();
        IEnumerable<Task> GetTasksForGroup_All(int id);
        IEnumerable<Task> GetTasksForGroup_Active(int id);
        IEnumerable<Task> GetTasksForGroup_Completed(int id);
        int Edit(Task task); 
        void Delete(int id);
    }
}