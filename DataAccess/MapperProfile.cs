using AutoMapper;
using DataAccess.Models;
using Domain.Models;

namespace DataAccess
{
    internal class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<TaskDb, Task>().ReverseMap();
            CreateMap<TaskGroupDb, TaskGroup>().ReverseMap();
            CreateMap<ToDoDb, ToDo>().ReverseMap();
        }
    }
}