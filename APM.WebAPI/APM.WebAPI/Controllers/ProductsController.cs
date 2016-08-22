using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.Http.OData;
using APM.WebAPI.Models;

namespace APM.WebAPI.Controllers
{
    [EnableCorsAttribute("http://localhost:58980", "*", "*")]
    public class ProductsController : ApiController
    {
        private readonly ProductRepository _productRepository = new ProductRepository();

        // GET: api/Products
        [Authorize]
        [EnableQuery]
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(_productRepository.Retrieve().AsQueryable());
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        // GET: api/Products/5
        [Authorize]
        [ResponseType(typeof(Product))]
        public IHttpActionResult Get(int id)
        {
            try
            {
                Product product;
                if (id > 0)
                {
                    product = _productRepository.Retrieve().FirstOrDefault(p => p.ProductId == id);
                    if (product == null)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    product = _productRepository.Create();
                }
                return Ok(product);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

        }

        // POST: api/Products
        [Authorize]
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostItem([FromBody]Product product)
        {
            try
            {
                if (product == null)
                {
                    return BadRequest("Product cannot be null!");
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var newProduct = _productRepository.Save(product);
                if (newProduct == null)
                {
                    return Conflict();
                }
                return Created(Request.RequestUri + newProduct.ProductId.ToString(), newProduct);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }

        }

        // PUT: api/Products/5
        [Authorize]
        [ResponseType(typeof(Product))]
        public IHttpActionResult Put(int id, [FromBody] Product product)
        {
             try
             {
                 if (product == null)
                 {
                     return BadRequest("Product cannot be null");
                 }
                 if (!ModelState.IsValid)
                 {
                     return BadRequest(ModelState);
                 }
                 var updatedProduct = _productRepository.Save(id, product);
                 if (updatedProduct == null)
                 {
                     return NotFound();
                 }
                 return Ok();
             }
             catch (Exception e)
             {
                 return InternalServerError(e);
             }
           /* var msg = new HttpResponseMessage(HttpStatusCode.Unauthorized) { ReasonPhrase = "Oops!!!" };
            throw new HttpResponseException(msg);*/
        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }
    }
}