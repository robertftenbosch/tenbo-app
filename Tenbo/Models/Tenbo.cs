using System;
using System.Collections.Generic;

namespace Tenbo.Models
{
    public class TenboTag
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Uri Url { get; set; }
        public List<TenboTag> TenboTags { get; set; }
    }

    public class Tag
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}