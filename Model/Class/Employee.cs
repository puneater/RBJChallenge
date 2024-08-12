namespace RBJChallenge.Model.Class
{
    public class Employee
    {
        public Guid EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? HiredDate { get; set; }
        public List<Task> Tasks { get; set; } = new List<Task>();
    }
}
