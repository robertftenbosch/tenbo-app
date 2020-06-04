using System;
using System.Collections.Generic;

namespace Tenbo.Models
{
    public class Goal
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Motivation { get; set; }
        public string Purpose { get; set; }
        public DateTime StartDate { get; set; }
        public List<Objective> Objectives { get; set; }
    }
}