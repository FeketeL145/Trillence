using Microsoft.AspNetCore.Mvc;
using Email_Test_API.Models;
using System.Diagnostics;

public class SpotifyDownloadController : ControllerBase
{
    [HttpPost]
    [Route("download")]
    public async Task<IActionResult> Download([FromBody] SpotifyDownloadRequest request)
    {
        try
        {
            // Use SpotDL command to download music
            var outputDirectory = @"C:\Users\TKrisztián\Desktop\Trillence\Downloaded Songs";
            var spotifyLink = request.SpotifyUrl;

            using (var process = new Process())
            {
                process.StartInfo.FileName = "cmd.exe";
                process.StartInfo.RedirectStandardInput = true;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.CreateNoWindow = true;

                process.Start();

                // Pass the SpotDL command to CMD
                using (StreamWriter sw = process.StandardInput)
                {
                    if (sw.BaseStream.CanWrite)
                    {
                        // Specify the SpotDL command with the output directory and Spotify link
                        string spotDlCommand = $"spotdl \"{spotifyLink}\"";
                        sw.WriteLine(spotDlCommand);
                    }
                }

                // Capture the CMD output
                string output = await process.StandardOutput.ReadToEndAsync();

                process.WaitForExit();

                // Log or process the output as needed
                Console.WriteLine($"CMD Output: {output}");

                return Ok(new { Message = "Download completed successfully" });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Internal Server Error" });
        }
    }
}