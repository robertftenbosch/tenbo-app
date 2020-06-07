using System;

namespace Tenbo.Models
{
    public class TenboAction
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public DateTime Date { get; set; }
        public bool IsCompleted { get; set; }
    }
}