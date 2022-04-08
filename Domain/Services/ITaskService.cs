using System.Collections.Generic;
using Domain.Models;

namespace Domain.Services
{
    public interface ITaskService
    {
        Task? Get(int id);
        IReadOnlyCollection<Task> GetAll();
        int New(Task entity);
        int Edit(Task entity);
        void Delete(int id);
    }
}