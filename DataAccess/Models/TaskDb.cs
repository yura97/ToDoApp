using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models
{
    internal class TaskDb
    {
        [Required]
        public int Id { get; set; }
        
        public string? TaskName { get; set; }
        
        [Required]
        public bool IsDone { get; set; }
        
        public List<ToDoDb> ToDos { get; set; } = new List<ToDoDb>();
        
        // [Required]
        // public int TaskGroupId { get; set; } 
        //
        // public TaskGroupDb TaskGroup { get; set; }
    }
}