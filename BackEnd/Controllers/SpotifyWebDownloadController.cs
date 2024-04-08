using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

public class SpotifyWebDownloadController : ControllerBase
{
    [HttpPost]
    [Route("downloadweb")]
    public async Task<IActionResult> Download()
    {
        try
        {
            string myMusicPath = Environment.GetFolderPath(Environment.SpecialFolder.MyMusic);

            using (var process = new Process())
            {
                process.StartInfo.FileName = "cmd.exe";
                process.StartInfo.Arguments = $"/c spotdl web";
                process.StartInfo.RedirectStandardInput = true;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.CreateNoWindow = true;

                process.Start();

                return Ok(new { Message = "Spotdl web started successfully." });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "There was an error:" + ex });
        }
    }
}