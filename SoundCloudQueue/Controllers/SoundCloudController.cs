using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SoundCloudQueue.Controllers
{
    [Produces("application/json")]
    public class SoundCloudController : Controller
    {
        [Route("api/SoundCloud/getSong")]
        [HttpGet]
        public async Task<JsonResult> getSong()
        {
            string result = string.Empty;
            string url = "https://jsonplaceholder.typicode.com/todos/1";

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(url);
                HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    result = await response.Content.ReadAsStringAsync();
                }
            }

            return Json(Newtonsoft.Json.JsonConvert.DeserializeObject<dynamic>(result));
        }

        // POST: api/SoundCloud
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/SoundCloud/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
