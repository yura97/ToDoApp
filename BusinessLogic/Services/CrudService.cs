// using System;
// using System.Collections.Generic;
// using System.Linq;
// using Domain.Models;
// using Domain.Repositories;
// using Domain.Services;
//
// namespace BusinessLogic.Services
// {
//     internal class CrudService<T> : ICrudService<T> where T : IBaseEntity
//     {
//         private readonly ICrudRepository<T> _repository;
//         
//         public CrudService(ICrudRepository<T> repository)
//         {
//             _repository = repository;
//         }
//
//         public void Delete(int id)
//         {
//             _repository.Delete(id);
//         }
//
//         public int Edit(T entity)
//         {
//             _repository.Edit(entity);
//             return entity.Id;
//         }
//
//         public T? Get(int id)
//         {
//             return _repository.Get(id);
//         }
//
//         public IReadOnlyCollection<T> GetAll()
//         {
//             return _repository.GetAll().ToArray();
//         }
//
//         public int New(T entity)
//         {
//             return _repository.New(entity);
//         }
//     }
// }