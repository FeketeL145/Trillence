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
                process.StartInfo.WorkingDirectory = myMusicPath;
                process.StartInfo.RedirectStandardInput = true;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.CreateNoWindow = true;

                process.Start();

                string output = await process.StandardOutput.ReadToEndAsync();

                process.WaitForExit();

                Console.WriteLine($"CMD Output: {output}");

                return Ok(new { Message = "Spotdl web closed." });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Internal Server Error:" + ex });
        }
    }
}