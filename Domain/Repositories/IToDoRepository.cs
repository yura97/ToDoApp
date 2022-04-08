using System.Collections.Generic;
using Domain.Models;

namespace Domain.Repositories
{
    public interface IToDoRepository
    {
        int[] New(ToDo toDo); 
        ToDo? Get(int taskGroupId, int taskId); 
        IEnumerable<ToDo> GetAll();
        void Delete(int taskGroupId, int taskId);
    }
}