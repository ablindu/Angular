using System;
using System.ComponentModel.DataAnnotations;

namespace APM.WebAPI.Models
{
    public class Product
    {
        public string Description { get; set; }
        public decimal Price { get; set; }

        [Required(ErrorMessage ="Product name is required")]
        [MinLength(6,ErrorMessage = "Product name must be at least 6 characters in length.")]
        public string ProductCode { get; set; }
        public int ProductId { get; set; }

        [Required(ErrorMessage = "Product name is required.", AllowEmptyStrings = false) ]
        [MaxLength(12, ErrorMessage = "Product name cannot exceed 12 characters in length.")]
        [MinLength(4, ErrorMessage = "Product name must be at least 4 characters in length.")]
        public string ProductName { get; set; }
        public DateTime ReleaseDate { get; set; }

    }
}