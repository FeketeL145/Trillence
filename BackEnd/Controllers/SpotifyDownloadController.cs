﻿using Microsoft.AspNetCore.Mvc;
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
            IConfigurationRoot config = new ConfigurationBuilder()
                   .SetBasePath(Directory.GetCurrentDirectory())
                   .AddJsonFile("appsettings.json")
                   .Build();

            string folderPath = Environment.GetFolderPath(Environment.SpecialFolder.MyMusic);

            string? spotifyLink = request.SpotifyUrl;

            using (Process process = new Process())
            {
                process.StartInfo.FileName = "cmd.exe";
                process.StartInfo.RedirectStandardInput = true;
                process.StartInfo.RedirectStandardOutput = true;
                process.StartInfo.UseShellExecute = false;
                process.StartInfo.CreateNoWindow = true;
                process.StartInfo.WorkingDirectory = folderPath;

                process.Start();

                using (StreamWriter sw = process.StandardInput)
                {
                    if (sw.BaseStream.CanWrite)
                    {
                        string spotDlCommand = $"spotdl \"{spotifyLink}\"";
                        sw.WriteLine(spotDlCommand);
                    }
                }

                string output = await process.StandardOutput.ReadToEndAsync();

                process.WaitForExit();

                Console.WriteLine($"CMD Output: {output}");

                return Ok(new { Message = "Download completed successfully" });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Error = "Internal Server Error:" + ex });
        }
    }
}