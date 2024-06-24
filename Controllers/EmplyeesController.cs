using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
