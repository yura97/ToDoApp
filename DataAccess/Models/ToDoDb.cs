using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models
{
    internal class ToDoDb
    {
        [Required]
        public int TaskGroupId { get; set; }
        
        [Required]
        public int TaskId { get; set; }
        
        public List<TaskDb> Tasks { get; set; } = new List<TaskDb>();
        public List<TaskGroupDb> TaskGroups { get; set; } = new List<TaskGroupDb>();
    }
}