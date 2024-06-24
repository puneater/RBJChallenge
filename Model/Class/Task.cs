namespace RBJChallenge.Model.Class
{
    public class Task
    {
        public Guid TaskId { get; set; }
        public string TaskName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DueDate { get; set; }

    }
}
