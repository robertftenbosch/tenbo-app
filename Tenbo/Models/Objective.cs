using System;

namespace Tenbo.Models
{
    public class Objective
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EtaFinishDate { get; set; }
        public bool IsAchieve { get; set; }
    }
}