using System.Collections.Generic;
using Domain.Models;

namespace Domain.Services
{
    public interface ITodoService
    {
        ToDo? Get(int id);
        IReadOnlyCollection<ToDo> GetAll();
        int New(ToDo entity);
        int Edit(ToDo entity);
        void Delete(int id);
    }
}