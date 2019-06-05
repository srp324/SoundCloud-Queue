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
        [Route("api/SoundCloud/Search")]
        [HttpGet]
        public async Task<JsonResult> Search(string query)
        {
            string result = string.Empty;
            //TODO: Handle client_id, limit, and offset parameters
            string url = "https://api-v2.soundcloud.com/search?q=" + query + "&client_id=GYvpZm3S6Z8m7IRExO0VgEi10Y8AoT64&limit=20&offset=0";

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
