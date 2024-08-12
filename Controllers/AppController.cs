using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RBJChallenge.Data;
using RBJChallenge.Model;
using RBJChallenge.Model.Class;
using System.Drawing;

namespace RBJChallenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDBContext dBContext;
        public EmployeesController(AppDBContext dBContext) {
            this.dBContext = dBContext;
        }
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            var employees = dBContext.Employees.ToList();
            return Ok(employees);
        }

        [HttpPost]
        public IActionResult AddEmployee(AddEmployeeDTO request)
        {
            var domainModelEmployee = new Employee
            {
                EmployeeId = Guid.NewGuid(),
                FirstName = request.FirstName,
                LastName = request.LastName,
                HiredDate = request.HiredDate
            };

            dBContext.Employees.Add(domainModelEmployee);
            dBContext.SaveChanges();
            return Ok(domainModelEmployee);
        }

        [HttpDelete]
        [Route("{EmployeeId:guid}")]
        public IActionResult DeleteEmployee(Guid EmployeeId) { 
            var employee = dBContext.Employees.Find(EmployeeId);
            if (employee != null) {
                dBContext.Employees.Remove(employee);
                dBContext.SaveChanges();
            }
            return Ok();
        }

        [HttpPut]
        [Route("{EmployeeId:guid}")]
        public IActionResult UpdateEmployee(Guid EmployeeId, UpdateEmployeeDTO request)
        {
            var employee = dBContext.Employees.Find(EmployeeId);
            if (employee == null)
            {
                return NotFound();
            }

            employee.FirstName = request.FirstName;
            employee.LastName = request.LastName;
            employee.HiredDate = request.HiredDate;

            dBContext.SaveChanges();
            return Ok(employee);
        }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDBContext dBContext;
        public TasksController(AppDBContext dBContext)
        {
            this.dBContext = dBContext;
        }
        [HttpGet]
        public IActionResult GetAllTasks()
        {
            var tasks = dBContext.Tasks.ToList();
            return Ok(tasks);
        }

        [HttpPost]
        public IActionResult AddTask(AddTaskDTO request)
        {
            var domainModelTask = new RBJChallenge.Model.Class.Task
            {
                TaskId = Guid.NewGuid(),
                TaskName = request.TaskName,
                StartDate = request.StartDate,
                DueDate = request.DueDate,
                Employee = request.Employee
            };

            dBContext.Tasks.Add(domainModelTask);
            dBContext.SaveChanges();
            return Ok(domainModelTask);
        }

        [HttpDelete]
        [Route("{TaskId:guid}")]
        public IActionResult DeleteTask(Guid TaskId)
        {
            var task = dBContext.Tasks.Find(TaskId);
            if (task != null)
            {
                dBContext.Tasks.Remove(task);
                dBContext.SaveChanges();
            }
            return Ok();
        }

        [HttpPut]
        [Route("{TaskId:guid}")]
        public IActionResult UpdateTask(Guid TaskId, UpdateTaskDTO request)
        {
            var task = dBContext.Tasks.Find(TaskId);
            if (task == null)
            {
                return NotFound();
            }

            task.TaskName = request.TaskName;
            task.StartDate = request.StartDate;
            task.DueDate = request.DueDate;
            task.Employee = request.Employee;

            dBContext.SaveChanges();
            return Ok(task);
        }
    }
}
