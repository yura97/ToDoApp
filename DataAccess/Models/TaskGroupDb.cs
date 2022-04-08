using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models
{
    internal class TaskGroupDb
    {
        [Required]
        public int Id { get; set; }
        
        public string? TaskGroupName { get; set; }

        public List<ToDoDb> ToDos { get; set; } = new List<ToDoDb>();
    }
}